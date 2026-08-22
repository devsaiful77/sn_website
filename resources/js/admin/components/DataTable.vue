<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  // [{ key, label, mono?, width? }]
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  perPage: { type: Number, default: 8 },
  emptyText: { type: String, default: 'No records yet.' },
  emptyIcon: { type: String, default: '▤' },
})

const page = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / props.perPage)))

watch(() => props.rows.length, () => { if (page.value > totalPages.value) page.value = totalPages.value })

const paged = computed(() => {
  const start = (page.value - 1) * props.perPage
  return props.rows.slice(start, start + props.perPage)
})
const rangeFrom = computed(() => (props.rows.length ? (page.value - 1) * props.perPage + 1 : 0))
const rangeTo = computed(() => Math.min(page.value * props.perPage, props.rows.length))
</script>

<template>
  <div class="sn-card">
    <slot name="toolbar" />

    <div class="sn-table-wrap">
      <table class="sn-table">
        <thead>
          <tr>
            <th v-for="c in columns" :key="c.key" :style="c.width ? `width:${c.width}` : ''">{{ c.label }}</th>
            <th v-if="$slots.actions" style="text-align:right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in paged" :key="row.id ?? i">
            <td v-for="c in columns" :key="c.key" :class="{ mono: c.mono }">
              <slot :name="`cell-${c.key}`" :row="row" :value="row[c.key]">
                {{ row[c.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" style="text-align:right;white-space:nowrap">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!rows.length" class="sn-empty">
      <div class="big">{{ emptyIcon }}</div>
      <b>Nothing here yet</b>
      <div>{{ emptyText }}</div>
    </div>

    <div v-else class="sn-pager">
      <div class="info">Showing {{ rangeFrom }}–{{ rangeTo }} of {{ rows.length }}</div>
      <div class="pages">
        <button class="sn-pg" :disabled="page === 1" @click="page--">‹</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="sn-pg"
          :class="{ active: p === page }"
          @click="page = p"
        >{{ p }}</button>
        <button class="sn-pg" :disabled="page === totalPages" @click="page++">›</button>
      </div>
    </div>
  </div>
</template>
