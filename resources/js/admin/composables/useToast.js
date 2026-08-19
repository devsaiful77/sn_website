// resources/js/admin/composables/useToast.js
import { reactive } from 'vue'

const state = reactive({ items: [] })
let id = 0

export function useToast() {
  function push(message, type = 'ok', ms = 2600) {
    const t = { id: ++id, message, type }
    state.items.push(t)
    setTimeout(() => remove(t.id), ms)
  }
  function remove(tid) {
    const i = state.items.findIndex((x) => x.id === tid)
    if (i > -1) state.items.splice(i, 1)
  }
  return {
    toasts: state.items,
    success: (m) => push(m, 'ok'),
    error: (m) => push(m, 'err'),
    remove,
  }
}

export default useToast
