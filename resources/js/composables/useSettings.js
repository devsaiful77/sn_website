// resources/js/composables/useSettings.js
// Loads site settings (logo, phone, email, address, map, socials...) from the
// backend once and shares them reactively across the public site.
//
// Usage in any component:
//   import { useSettings } from '../composables/useSettings'
//   import { asset } from '../services/config'
//   const { settings, load } = useSettings()
//   onMounted(load)
//   // template: {{ settings.phone }}, <img :src="asset(settings.logo)">
//
// Tip: call load() once early (e.g. in App.vue onMounted) so every component
// that reads `settings` gets the values.

import { reactive } from 'vue'
import { API_BASE_URL } from '../services/config'

const settings = reactive({})            // filled after load()
const meta = reactive({ loaded: false, loading: false })
let promise = null

export function useSettings() {
  async function load(force = false) {
    if ((meta.loaded || meta.loading) && !force) return promise
    meta.loading = true
    promise = fetch(`${API_BASE_URL}/api/settings`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => { Object.assign(settings, data || {}); meta.loaded = true })
      .catch(() => { /* keep defaults / empty on failure */ })
      .finally(() => { meta.loading = false })
    return promise
  }

  return { settings, meta, load }
}

export default useSettings
