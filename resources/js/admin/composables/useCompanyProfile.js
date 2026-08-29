// resources/js/composables/useCompanyProfile.js
// Loads the currently ACTIVE company profile (logo, phone, email, address,
// map, socials, slogan, about text...) from the backend once and shares it
// reactively across the public site. Replaces the old useSettings.js.
//
// Usage in any component:
//   import { useCompanyProfile } from '../composables/useCompanyProfile'
//   import { asset } from '../services/config'
//   const { profile, load } = useCompanyProfile()
//   onMounted(load)
//   // template: {{ profile.company_name }}, <img :src="asset(profile.logo)">
//
// Tip: call load() once early (e.g. in App.vue onMounted) so every component
// that reads `profile` gets the values.

import { reactive } from 'vue'
import { API_BASE_URL } from '../services/config'

const profile = reactive({})             // filled after load()
const meta = reactive({ loaded: false, loading: false })
let promise = null

export function useCompanyProfile() {
  async function load(force = false) {
    if ((meta.loaded || meta.loading) && !force) return promise
    meta.loading = true
    promise = fetch(`${API_BASE_URL}/api/company-profile`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => { Object.assign(profile, data || {}); meta.loaded = true })
      .catch(() => { /* keep defaults / empty on failure */ })
      .finally(() => { meta.loading = false })
    return promise
  }

  return { profile, meta, load }
}

export default useCompanyProfile
