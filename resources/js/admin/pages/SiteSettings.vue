<script setup>
import { reactive, ref, onMounted } from 'vue'
import { api } from '../services/api'
import { useToast } from '../composables/useToast'

const toast = useToast()

const form = reactive({
  site_name: '', phone: '', email: '', whatsapp: '', address: '',
  working_hours: '', map_embed: '',
  facebook: '', instagram: '', linkedin: '', youtube: '', footer_about: '',
})
const errors = reactive({})
const loading = ref(true)
const saving = ref(false)

// logo
const currentLogo = ref('')          // existing path from DB
const logoFile = ref(null)           // newly picked File
const logoPreview = ref('')          // object URL for preview
const logoInput = ref(null)

async function load() {
  loading.value = true
  try {
    const s = await api.settings.get()
    Object.keys(form).forEach((k) => { form[k] = s[k] ?? '' })
    currentLogo.value = s.logo || ''
  } catch (e) {
    toast.error(e.message || 'Could not load settings')
  } finally {
    loading.value = false
  }
}
onMounted(load)

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

    const res = await api.settings.update(fd)
    if (res.settings?.logo) currentLogo.value = res.settings.logo
    clearLogo()
    toast.success('Settings saved')
  } catch (e) {
    if (e.errors) Object.assign(errors, Object.fromEntries(
      Object.entries(e.errors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ))
    toast.error(e.message || 'Save failed')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="sn-page-head">
      <div>
        <h1>Site Settings</h1>
        <p>These values power the public site — logo, contact details, map and social links.</p>
      </div>
      <button class="sn-btn sn-btn-primary" :disabled="saving || loading" @click="save">
        <span v-if="saving" class="sn-spin"></span>
        <span>{{ saving ? 'Saving…' : 'Save changes' }}</span>
      </button>
    </div>

    <div v-if="loading" class="sn-card" style="padding:48px;text-align:center;color:var(--sn-muted)">
      <span class="sn-spin" style="border-color:rgba(23,99,201,.3);border-top-color:var(--sn-blue);display:inline-block"></span>
      <div style="margin-top:10px">Loading settings…</div>
    </div>

    <div v-else style="display:grid;gap:20px">
      <!-- Branding -->
      <div class="sn-card" style="padding:22px">
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
            <div class="sn-field" style="margin-bottom:0">
              <label>Site name</label>
              <input v-model="form.site_name" class="sn-input" placeholder="SN Engineering Works" />
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="sn-card" style="padding:22px">
        <h3 class="sn-set-h">Contact details</h3>
        <div class="sn-grid-2">
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
      <div class="sn-card" style="padding:22px">
        <h3 class="sn-set-h">Map</h3>
        <div class="sn-field" style="margin-bottom:0">
          <label>Google Maps embed URL</label>
          <textarea v-model="form.map_embed" class="sn-textarea" style="min-height:70px"
                    placeholder="https://www.google.com/maps/embed?pb=..."></textarea>
          <div class="hint">Google Maps → Share → Embed a map → copy the <b>src</b> URL from the iframe.</div>
        </div>
      </div>

      <!-- Social -->
      <div class="sn-card" style="padding:22px">
        <h3 class="sn-set-h">Social links</h3>
        <div class="sn-grid-2">
          <div class="sn-field"><label>Facebook</label><input v-model="form.facebook" class="sn-input" placeholder="https://facebook.com/..." /></div>
          <div class="sn-field"><label>Instagram</label><input v-model="form.instagram" class="sn-input" placeholder="https://instagram.com/..." /></div>
          <div class="sn-field"><label>LinkedIn</label><input v-model="form.linkedin" class="sn-input" placeholder="https://linkedin.com/..." /></div>
          <div class="sn-field" style="margin-bottom:0"><label>YouTube</label><input v-model="form.youtube" class="sn-input" placeholder="https://youtube.com/..." /></div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sn-card" style="padding:22px">
        <h3 class="sn-set-h">Footer</h3>
        <div class="sn-field" style="margin-bottom:0">
          <label>Short about text</label>
          <textarea v-model="form.footer_about" class="sn-textarea" placeholder="One or two lines shown in the footer"></textarea>
        </div>
      </div>

      <div style="display:flex;justify-content:flex-end">
        <button class="sn-btn sn-btn-primary" :disabled="saving" @click="save">
          <span v-if="saving" class="sn-spin"></span>
          <span>{{ saving ? 'Saving…' : 'Save changes' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sn-set-h { font-family: var(--sn-display); font-size: 15px; margin: 0 0 16px; color: var(--sn-text); }
.sn-logo-box {
  width: 150px; height: 100px; flex: none; border: 1px dashed var(--sn-border);
  border-radius: 10px; display: grid; place-items: center; overflow: hidden;
  background: var(--sn-surface-2); color: var(--sn-faint); font-size: 12.5px;
}
.sn-logo-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
</style>
