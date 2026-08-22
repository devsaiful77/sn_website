<script setup>
import { ref, computed, onMounted } from 'vue'
import DataTable from '../components/DataTable.vue'
import Modal from '../components/Modal.vue'
import { api } from '../services/api'
import { useToast } from '../composables/useToast'

const toast = useToast()

const messages = ref([])
const loading = ref(true)
const loadError = ref('')

const columns = [
  { key: 'name', label: 'From' },
  { key: 'subject', label: 'Subject' },
  { key: 'created_at', label: 'Received', width: '150px' },
]

const stats = computed(() => [
  { icon: '✉', cls: 'b-blue',  num: messages.value.length,                    lbl: 'Total messages' },
  { icon: '●', cls: 'b-amber', num: messages.value.filter(m => !m.is_read).length, lbl: 'Unread' },
  { icon: '⚙', cls: 'b-green', num: 8,                                        lbl: 'Active services' },
  { icon: '▣', cls: 'b-ink',   num: 124,                                      lbl: 'Projects listed' },
])

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    messages.value = await api.messages.list()
  } catch (e) {
    loadError.value = e.message || 'Could not load messages.'
  } finally {
    loading.value = false
  }
}
onMounted(load)

// view full message
const viewing = ref(null)
function openView(row) { viewing.value = row }

// delete
const deletingId = ref(null)
async function remove(row) {
  if (!confirm(`Delete the message from ${row.name}?`)) return
  deletingId.value = row.id
  try {
    await api.messages.remove(row.id)
    messages.value = messages.value.filter(m => m.id !== row.id)
    if (viewing.value?.id === row.id) viewing.value = null
    toast.success('Message deleted')
  } catch (e) {
    toast.error(e.message || 'Delete failed')
  } finally {
    deletingId.value = null
  }
}

function fmtDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) + ', ' +
         d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
function initials(name) {
  return (name || '?').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
}
</script>

<template>
  <div>
    <div class="sn-page-head">
      <div>
        <h1>Dashboard</h1>
        <p>Contact messages submitted from the website.</p>
      </div>
      <button class="sn-btn sn-btn-ghost" @click="load">↻ Refresh</button>
    </div>

    <div class="sn-stat-grid">
      <div v-for="s in stats" :key="s.lbl" class="sn-card sn-stat">
        <div class="badge" :class="s.cls">{{ s.icon }}</div>
        <div>
          <div class="num">{{ s.num }}</div>
          <div class="lbl">{{ s.lbl }}</div>
        </div>
      </div>
    </div>

    <!-- loading -->
    <div v-if="loading" class="sn-card" style="padding:48px;text-align:center;color:var(--sn-muted)">
      <span class="sn-spin" style="border-color:rgba(23,99,201,.3);border-top-color:var(--sn-blue);display:inline-block"></span>
      <div style="margin-top:10px">Loading messages…</div>
    </div>

    <!-- error -->
    <div v-else-if="loadError" class="sn-card" style="padding:32px;text-align:center">
      <div style="color:var(--sn-danger);font-weight:600;margin-bottom:6px">{{ loadError }}</div>
      <button class="sn-btn sn-btn-ghost" @click="load">Try again</button>
    </div>

    <!-- table -->
    <DataTable v-else :columns="columns" :rows="messages" :per-page="8"
               empty-icon="✉" empty-text="No contact messages yet.">
      <template #toolbar>
        <div class="sn-toolbar">
          <b style="font-family:var(--sn-display);font-size:15px">Contact Messages</b>
          <div class="grow"></div>
          <span style="font-size:12.5px;color:var(--sn-muted)">{{ messages.length }} total</span>
        </div>
      </template>

      <template #cell-name="{ row }">
        <div style="display:flex;align-items:center;gap:11px">
          <div class="sn-avatar" style="width:34px;height:34px;font-size:12px">{{ initials(row.name) }}</div>
          <div>
            <div class="sn-cell-title">
              {{ row.name }}
              <span v-if="!row.is_read" class="sn-pill pill-draft" style="margin-left:6px">New</span>
            </div>
            <div class="sn-cell-sub">{{ row.email }}</div>
          </div>
        </div>
      </template>

      <template #cell-subject="{ row }">
        <div class="sn-cell-title" style="font-weight:500">{{ row.subject || '—' }}</div>
        <div class="sn-cell-sub" style="max-width:340px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ row.message }}</div>
      </template>

      <template #cell-created_at="{ row }">
        <span class="mono">{{ fmtDate(row.created_at) }}</span>
      </template>

      <template #actions="{ row }">
        <button class="sn-rowbtn" aria-label="View" @click="openView(row)">👁</button>
        <button class="sn-rowbtn danger" aria-label="Delete" style="margin-left:6px"
                :disabled="deletingId === row.id" @click="remove(row)">🗑</button>
      </template>
    </DataTable>

    <!-- view message modal -->
    <Modal v-if="viewing" :title="viewing.subject || 'Message'"
           :subtitle="`From ${viewing.name} · ${viewing.email}`" @close="viewing = null">
      <div style="font-size:13px;color:var(--sn-muted);margin-bottom:14px">
        <span v-if="viewing.phone">☎ {{ viewing.phone }} · </span>{{ fmtDate(viewing.created_at) }}
      </div>
      <div style="font-size:14px;line-height:1.7;color:var(--sn-text);white-space:pre-wrap">{{ viewing.message }}</div>

      <template #footer>
        <a :href="`mailto:${viewing.email}?subject=RE: ${encodeURIComponent(viewing.subject || 'Your enquiry')}`"
           class="sn-btn sn-btn-ghost">Reply by email</a>
        <button class="sn-btn sn-btn-danger" @click="remove(viewing)">Delete</button>
      </template>
    </Modal>
  </div>
</template>
