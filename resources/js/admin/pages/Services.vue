<script setup>
import { ref, reactive, computed } from 'vue'
import DataTable from '../components/DataTable.vue'
import Modal from '../components/Modal.vue'
import { useToast } from '../composables/useToast'

const toast = useToast()

// Seed data — shaped like the public site's data/services.js.
// Swap this for an API fetch (GET /api/admin/services) when the backend is ready.
const services = ref([
  { id: 1, icon: '⚙', title: 'Pipeline Fabrication', short: 'Custom piping & spool fabrication', order: 1, status: 'live' },
  { id: 2, icon: '🔧', title: 'Industrial Maintenance', short: 'Preventive & breakdown maintenance', order: 2, status: 'live' },
  { id: 3, icon: '🏗', title: 'Structural Steel Works', short: 'Beams, frames & platforms', order: 3, status: 'live' },
  { id: 4, icon: '🛢', title: 'Storage Tank Erection', short: 'On-site tank build & repair', order: 4, status: 'draft' },
  { id: 5, icon: '⚡', title: 'Electrical Installation', short: 'Panels, wiring & controls', order: 5, status: 'live' },
  { id: 6, icon: '🧰', title: 'Machine Alignment', short: 'Laser shaft & coupling alignment', order: 6, status: 'off' },
])

const columns = [
  { key: 'icon',  label: '', width: '48px' },
  { key: 'title', label: 'Service' },
  { key: 'order', label: 'Order', mono: true, width: '80px' },
  { key: 'status', label: 'Status', width: '120px' },
]

const search = ref('')
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return services.value
  return services.value.filter(
    (s) => s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)
  )
})

// ---- add / edit form ----
const showForm = ref(false)
const editingId = ref(null)
const blank = () => ({ icon: '⚙', title: '', short: '', order: services.value.length + 1, status: 'live' })
const form = reactive(blank())
const errors = reactive({ title: '', short: '' })
const saving = ref(false)

const isEditing = computed(() => editingId.value !== null)

function openCreate() {
  editingId.value = null
  Object.assign(form, blank())
  errors.title = errors.short = ''
  showForm.value = true
}
function openEdit(row) {
  editingId.value = row.id
  Object.assign(form, { ...row })
  errors.title = errors.short = ''
  showForm.value = true
}
function validate() {
  errors.title = form.title.trim() ? '' : 'Title is required.'
  errors.short = form.short.trim() ? '' : 'Short description is required.'
  return !errors.title && !errors.short
}
async function save() {
  if (!validate()) return
  saving.value = true
  await new Promise((r) => setTimeout(r, 400)) // simulate request
  if (isEditing.value) {
    const i = services.value.findIndex((s) => s.id === editingId.value)
    if (i > -1) services.value[i] = { ...form, id: editingId.value }
    toast.success('Service updated')
  } else {
    const id = Math.max(0, ...services.value.map((s) => s.id)) + 1
    services.value.push({ ...form, id })
    toast.success('Service added')
  }
  saving.value = false
  showForm.value = false
}
function remove(row) {
  if (!confirm(`Delete “${row.title}”?`)) return
  services.value = services.value.filter((s) => s.id !== row.id)
  toast.success('Service deleted')
}

const statusLabel = { live: 'Live', draft: 'Draft', off: 'Hidden' }
const statusClass = { live: 'pill-live', draft: 'pill-draft', off: 'pill-off' }
</script>

<template>
  <div>
    <div class="sn-page-head">
      <div>
        <h1>Services</h1>
        <p>These appear in the “Services” section and nav dropdown on the public site.</p>
      </div>
      <button class="sn-btn sn-btn-primary" @click="openCreate">＋ Add service</button>
    </div>

    <DataTable :columns="columns" :rows="filtered" :per-page="6" empty-icon="⚙"
               empty-text="Add your first service to show it on the site.">
      <template #toolbar>
        <div class="sn-toolbar">
          <div class="sn-search" style="width:280px">
            <span class="ic">⌕</span>
            <input v-model="search" type="search" placeholder="Search services…" />
          </div>
          <div class="grow"></div>
          <span style="font-size:12.5px;color:var(--sn-muted)">{{ filtered.length }} of {{ services.length }}</span>
        </div>
      </template>

      <template #cell-icon="{ row }">
        <span class="sn-ico-cell">{{ row.icon }}</span>
      </template>

      <template #cell-title="{ row }">
        <div class="sn-cell-title">{{ row.title }}</div>
        <div class="sn-cell-sub">{{ row.short }}</div>
      </template>

      <template #cell-status="{ row }">
        <span class="sn-pill" :class="statusClass[row.status]">{{ statusLabel[row.status] }}</span>
      </template>

      <template #actions="{ row }">
        <button class="sn-rowbtn" aria-label="Edit" @click="openEdit(row)">✎</button>
        <button class="sn-rowbtn danger" aria-label="Delete" style="margin-left:6px" @click="remove(row)">🗑</button>
      </template>
    </DataTable>

    <!-- add / edit modal form -->
    <Modal
      v-if="showForm"
      :title="isEditing ? 'Edit service' : 'Add service'"
      :subtitle="isEditing ? 'Update the details for this service.' : 'Create a new service for the public site.'"
      @close="showForm = false"
    >
      <form @submit.prevent="save" novalidate>
        <div class="sn-grid-2">
          <div class="sn-field">
            <label>Icon</label>
            <input v-model="form.icon" class="sn-input" maxlength="4" placeholder="⚙" />
            <div class="hint">Any emoji or symbol shown on the card.</div>
          </div>
          <div class="sn-field">
            <label>Display order</label>
            <input v-model.number="form.order" type="number" min="1" class="sn-input" />
          </div>
        </div>

        <div class="sn-field">
          <label>Title</label>
          <input v-model="form.title" class="sn-input" :class="{ err: errors.title }" placeholder="e.g. Pipeline Fabrication" />
          <div v-if="errors.title" class="msg-err">{{ errors.title }}</div>
        </div>

        <div class="sn-field">
          <label>Short description</label>
          <textarea v-model="form.short" class="sn-textarea" :class="{ err: errors.short }"
                    placeholder="One line shown under the title"></textarea>
          <div v-if="errors.short" class="msg-err">{{ errors.short }}</div>
        </div>

        <div class="sn-field" style="margin-bottom:0">
          <label>Status</label>
          <select v-model="form.status" class="sn-select">
            <option value="live">Live — visible on site</option>
            <option value="draft">Draft — saved, not shown</option>
            <option value="off">Hidden — temporarily off</option>
          </select>
        </div>
      </form>

      <template #footer>
        <button class="sn-btn sn-btn-ghost" @click="showForm = false">Cancel</button>
        <button class="sn-btn sn-btn-primary" :disabled="saving" @click="save">
          <span v-if="saving" class="sn-spin"></span>
          <span>{{ saving ? 'Saving…' : (isEditing ? 'Save changes' : 'Add service') }}</span>
        </button>
      </template>
    </Modal>
  </div>
</template>
