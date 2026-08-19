// resources/js/admin/services/api.js
// Thin fetch wrapper for the admin panel.
// While the Laravel backend is not ready, MOCK_MODE serves everything locally.
// Real auth is now wired up (Sanctum) — keep this false.
// Flip back to true only if you want to demo the panel without the backend.

const MOCK_MODE = false
const BASE_URL = '/api/admin'
const TOKEN_KEY = 'sn_admin_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

// ---- real HTTP call (used when MOCK_MODE = false) ----
async function http(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { Accept: 'application/json' }
  if (body) headers['Content-Type'] = 'application/json'
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed')
    err.status = res.status
    err.errors = data.errors || {}
    throw err
  }
  return data
}

// ---- mock layer ----
const DEMO_USER = {
  email: 'admin@snengineeringworks.com',
  password: 'admin123',
  name: 'S. N. Admin',
  role: 'Administrator',
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function mockLogin({ email, password }) {
  await wait(600)
  if (email.trim().toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
    const err = new Error('Invalid email or password.')
    err.status = 401
    throw err
  }
  return {
    token: 'mock.' + btoa(email + ':' + Date.now()),
    user: { name: DEMO_USER.name, email: DEMO_USER.email, role: DEMO_USER.role },
  }
}

// ---- public API ----
export const api = {
  async login(credentials) {
    if (MOCK_MODE) return mockLogin(credentials)
    // Laravel Sanctum-style: POST /api/admin/login -> { token, user }
    return http('/login', { method: 'POST', body: credentials, auth: false })
  },

  async logout() {
    if (MOCK_MODE) return wait(150)
    return http('/logout', { method: 'POST' })
  },

  async me() {
    if (MOCK_MODE) {
      return { name: DEMO_USER.name, email: DEMO_USER.email, role: DEMO_USER.role }
    }
    return http('/me')
  },
}

export default api
