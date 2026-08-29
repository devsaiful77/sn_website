<script setup>
import { reactive, ref, onMounted } from 'vue'
import { api } from '../services/api'
import { useToast } from '../composables/useToast'

const toast = useToast()

const EMPTY_FORM = () => ({
  company_name: '', company_slogan: '', about_company: '',
  support_number: '', phone: '', email: '', whatsapp: '', address: '',
  working_hours: '', map_embed: '',
  facebook: '', instagram: '', linkedin: '', youtube: '', footer_about: '',
})

const profiles = ref([])
const loading = ref(true)
const saving = ref(false)
const deletingId = ref(null)
const activatingId = ref(null)

const showForm = ref(false)
const editingId = ref(null)          // null => creating a new profile
const form = reactive(EMPTY_FORM())
const errors = reactive({})

// logo
const currentLogo = ref('')
const logoFile = ref(null)
const logoPreview = ref('')
const logoInput = ref(null)

async function loadList() {
  loading.value = true
  try {
    profiles.value = await api.companyProfiles.list()
  } catch (e) {
    toast.error(e.message || 'Could not load company profiles')
  } finally {
    loading.value = false
  }
}
onMounted(loadList)

function resetForm() {
  Object.assign(form, EMPTY_FORM())
  Object.keys(errors).forEach((k) => delete errors[k])
  currentLogo.value = ''
  clearLogo()
}

function openCreate() {
  editingId.value = null
  resetForm()
  showForm.value = true
}

function openEdit(profile) {
  editingId.value = profile.id
  Object.keys(EMPTY_FORM()).forEach((k) => { form[k] = profile[k] ?? '' })
  currentLogo.value = profile.logo || ''
  clearLogo()
  Object.keys(errors).forEach((k) => delete errors[k])
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingId.value = null
  resetForm()
}

function pickLogo(e) {
  const f = e.target.files?.[0]
  if (!f) return
  logoFile.value = f
  logoPreview.value = URL.createObjectURL(f)
}
function clearLogo() {
  logoFile.value = null
  logoPreview.value = ''
  if (logoInput.value) logoInput.value.value = ''
}

async function save() {
  Object.keys(errors).forEach((k) => delete errors[k])
  saving.value = true
  try {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''))
    if (logoFile.value) fd.append('logo', logoFile.value)

    if (editingId.value) {
      await api.companyProfiles.update(editingId.value, fd)
      toast.success('Profile updated')
    } else {
      await api.companyProfiles.create(fd)
      toast.success('Profile created')
    }

    closeForm()
    await loadList()
  } catch (e) {
    if (e.errors) Object.assign(errors, Object.fromEntries(
      Object.entries(e.errors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ))
    toast.error(e.message || 'Save failed')
  } finally {
    saving.value = false
  }
}

async function activate(profile) {
  if (profile.is_active) return
  activatingId.value = profile.id
  try {
    await api.companyProfiles.activate(profile.id)
    toast.success(`"${profile.company_name}" is now active`)
    await loadList()
  } catch (e) {
    toast.error(e.message || 'Could not activate profile')
  } finally {
    activatingId.value = null
  }
}

async function remove(profile) {
  if (!confirm(`Delete "${profile.company_name}"? This cannot be undone.`)) return
  deletingId.value = profile.id
  try {
    await api.companyProfiles.remove(profile.id)
    toast.success('Profile deleted')
    if (editingId.value === profile.id) closeForm()
    await loadList()
  } catch (e) {
    toast.error(e.message || 'Delete failed')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div>
    <div class="sn-page-head">
      <div>
        <h1>Company Profiles</h1>
        <p>Manage every company profile. Exactly one is active on the public site at a time.</p>
      </div>
      <button class="sn-btn sn-btn-primary" @click="openCreate">+ Add profile</button>
    </div>

    <div v-if="loading" class="sn-card" style="padding:48px;text-align:center;color:var(--sn-muted)">
      <span class="sn-spin" style="border-color:rgba(23,99,201,.3);border-top-color:var(--sn-blue);display:inline-block"></span>
      <div style="margin-top:10px">Loading profiles…</div>
    </div>

    <div v-else-if="!profiles.length" class="sn-card" style="padding:48px;text-align:center;color:var(--sn-muted)">
      No company profiles yet. Click "Add profile" to create the first one.
    </div>

    <div v-else style="display:grid;gap:14px;margin-bottom:20px">
      <div v-for="p in profiles" :key="p.id" class="sn-card sn-profile-row">
        <div class="sn-logo-box">
          <img v-if="p.logo" :src="p.logo" alt="Logo" />
          <span v-else>No logo</span>
        </div>

        <div style="flex:1;min-width:180px">
          <div style="display:flex;align-items:center;gap:8px">
            <strong>{{ p.company_name }}</strong>
            <span v-if="p.is_active" class="sn-badge-active">Active</span>
          </div>
          <div v-if="p.company_slogan" style="color:var(--sn-muted);font-size:13px">{{ p.company_slogan }}</div>
          <div style="color:var(--sn-faint);font-size:12.5px;margin-top:4px">
            {{ p.phone || p.support_number || p.email || '—' }}
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button
            class="sn-btn sn-btn-ghost"
            :disabled="p.is_active || activatingId === p.id"
            @click="activate(p)"
          >
            {{ activatingId === p.id ? 'Activating…' : (p.is_active ? 'Active' : 'Set active') }}
          </button>
          <button class="sn-btn sn-btn-ghost" @click="openEdit(p)">Edit</button>
          <button
            class="sn-btn sn-btn-ghost"
            :disabled="deletingId === p.id"
            @click="remove(p)"
          >
            {{ deletingId === p.id ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create / edit form -->
    <div v-if="showForm" class="sn-card" style="padding:22px">
      <div class="sn-page-head" style="margin-bottom:14px">
        <h3 class="sn-set-h" style="margin:0">{{ editingId ? 'Edit profile' : 'New profile' }}</h3>
        <div style="display:flex;gap:10px">
          <button class="sn-btn sn-btn-ghost" :disabled="saving" @click="closeForm">Cancel</button>
          <button class="sn-btn sn-btn-primary" :disabled="saving" @click="save">
            <span v-if="saving" class="sn-spin"></span>
            <span>{{ saving ? 'Saving…' : 'Save' }}</span>
          </button>
        </div>
      </div>

      <div style="display:grid;gap:20px">
        <!-- Branding -->
        <div>
          <h3 class="sn-set-h">Branding</h3>
          <div style="display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap">
            <div class="sn-logo-box">
              <img v-if="logoPreview || currentLogo" :src="logoPreview || currentLogo" alt="Logo" />
              <span v-else>No logo</span>
            </div>
            <div style="flex:1;min-width:220px">
              <div class="sn-field">
                <label>Logo</label>
                <input ref="logoInput" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" class="sn-input" @change="pickLogo" />
                <div class="hint">PNG, JPG, SVG or WEBP · up to 2 MB.</div>
                <div v-if="logoFile" style="margin-top:8px">
                  <button class="sn-btn sn-btn-ghost" style="padding:6px 12px" @click="clearLogo">Remove selected</button>
                </div>
              </div>
              <div class="sn-grid-2">
                <div class="sn-field">
                  <label>Company name</label>
                  <input v-model="form.company_name" class="sn-input" :class="{ err: errors.company_name }" placeholder="SN Engineering Works" />
                  <div v-if="errors.company_name" class="msg-err">{{ errors.company_name }}</div>
                </div>
                <div class="sn-field" style="margin-bottom:0">
                  <label>Slogan</label>
                  <input v-model="form.company_slogan" class="sn-input" placeholder="Short tagline" />
                </div>
              </div>
              <div class="sn-field" style="margin-bottom:0">
                <label>About the company</label>
                <textarea v-model="form.about_company" class="sn-textarea" placeholder="A short paragraph about the company"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="sn-set-h">Contact details</h3>
          <div class="sn-grid-2">
            <div class="sn-field">
              <label>Support number</label>
              <input v-model="form.support_number" class="sn-input" placeholder="+880 1XXX-XXXXXX" />
            </div>
            <div class="sn-field">
              <label>Phone</label>
              <input v-model="form.phone" class="sn-input" :class="{ err: errors.phone }" placeholder="+880 1XXX-XXXXXX" />
              <div v-if="errors.phone" class="msg-err">{{ errors.phone }}</div>
            </div>
            <div class="sn-field">
              <label>Email</label>
              <input v-model="form.email" type="email" class="sn-input" :class="{ err: errors.email }" placeholder="info@example.com" />
              <div v-if="errors.email" class="msg-err">{{ errors.email }}</div>
            </div>
            <div class="sn-field">
              <label>WhatsApp number</label>
              <input v-model="form.whatsapp" class="sn-input" placeholder="8801XXXXXXXXX" />
              <div class="hint">Digits only (used in the wa.me link).</div>
            </div>
            <div class="sn-field">
              <label>Working hours</label>
              <input v-model="form.working_hours" class="sn-input" placeholder="Sat–Thu, 9am–7pm" />
            </div>
            <div class="sn-field" style="grid-column:1 / -1;margin-bottom:0">
              <label>Address</label>
              <textarea v-model="form.address" class="sn-textarea" style="min-height:64px" placeholder="Street, city, country"></textarea>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div>
          <h3 class="sn-set-h">Map</h3>
          <div class="sn-field" style="margin-bottom:0">
            <label>Google Maps embed URL</label>
            <textarea v-model="form.map_embed" class="sn-textarea" style="min-height:70px"
                      placeholder="https://www.google.com/maps/embed?pb=..."></textarea>
            <div class="hint">Google Maps → Share → Embed a map → copy the <b>src</b> URL from the iframe.</div>
          </div>
        </div>

        <!-- Social -->
        <div>
          <h3 class="sn-set-h">Social links</h3>
          <div class="sn-grid-2">
            <div class="sn-field"><label>Facebook</label><input v-model="form.facebook" class="sn-input" placeholder="https://facebook.com/..." /></div>
            <div class="sn-field"><label>Instagram</label><input v-model="form.instagram" class="sn-input" placeholder="https://instagram.com/..." /></div>
            <div class="sn-field"><label>LinkedIn</label><input v-model="form.linkedin" class="sn-input" placeholder="https://linkedin.com/..." /></div>
            <div class="sn-field" style="margin-bottom:0"><label>YouTube</label><input v-model="form.youtube" class="sn-input" placeholder="https://youtube.com/..." /></div>
          </div>
        </div>

        <!-- Footer -->
        <div>
          <h3 class="sn-set-h">Footer</h3>
          <div class="sn-field" style="margin-bottom:0">
            <label>Short about text</label>
            <textarea v-model="form.footer_about" class="sn-textarea" placeholder="One or two lines shown in the footer"></textarea>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:10px">
          <button class="sn-btn sn-btn-ghost" :disabled="saving" @click="closeForm">Cancel</button>
          <button class="sn-btn sn-btn-primary" :disabled="saving" @click="save">
            <span v-if="saving" class="sn-spin"></span>
            <span>{{ saving ? 'Saving…' : 'Save' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sn-set-h { font-family: var(--sn-display); font-size: 15px; margin: 0 0 16px; color: var(--sn-text); }
.sn-logo-box {
  width: 110px; height: 76px; flex: none; border: 1px dashed var(--sn-border);
  border-radius: 10px; display: grid; place-items: center; overflow: hidden;
  background: var(--sn-surface-2); color: var(--sn-faint); font-size: 12px;
}
.sn-logo-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
.sn-profile-row {
  padding: 14px 18px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
.sn-badge-active {
  font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  background: rgba(23,99,201,.12); color: var(--sn-blue);
}
.sn-btn-danger { color: #d0342c; }
</style>
