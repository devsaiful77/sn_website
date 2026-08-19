// resources/js/admin/composables/useAuth.js
// Single reactive auth store shared across the admin panel.
import { reactive, computed, readonly } from 'vue'
import { api, getToken, setToken, clearToken } from '../services/api'

const USER_KEY = 'sn_admin_user'

const state = reactive({
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  token: getToken(),
  loading: false,
})

function persistUser(user) {
  state.user = user
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(USER_KEY)
}

export function useAuth() {
  const isAuthenticated = computed(() => !!state.token)

  async function login(credentials) {
    state.loading = true
    try {
      const { token, user } = await api.login(credentials)
      setToken(token)
      state.token = token
      persistUser(user)
      return user
    } finally {
      state.loading = false
    }
  }

  async function logout() {
    try { await api.logout() } catch (_) { /* ignore network errors on logout */ }
    clearToken()
    persistUser(null)
    state.token = null
  }

  // Verify token on app boot; drop session if invalid.
  async function refresh() {
    if (!state.token) return
    try {
      const user = await api.me()
      persistUser(user)
    } catch (e) {
      if (e.status === 401) await logout()
    }
  }

  return {
    user: readonly(computed(() => state.user)),
    loading: computed(() => state.loading),
    isAuthenticated,
    login,
    logout,
    refresh,
  }
}

export default useAuth
