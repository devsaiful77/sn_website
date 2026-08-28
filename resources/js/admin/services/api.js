// resources/js/admin/services/api.js
// Thin fetch wrapper for the admin panel.
// While the Laravel backend is not ready, MOCK_MODE serves everything locally.
// Real auth is now wired up (Sanctum) — keep this false.
// Flip back to true only if you want to demo the panel without the backend.

import { API_BASE_URL } from '../../services/config'

const MOCK_MODE = false
const BASE_URL = `${API_BASE_URL}/api/admin`   // e.g. /api/admin
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
    // Stale/expired/invalid token on a protected call -> force re-login.
    if (res.status === 401 && auth) {
      clearToken()
      localStorage.removeItem('sn_admin_user')
      if (!location.pathname.endsWith('/admin/login')) {
        location.href = '/admin/login'
      }
    }
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

// Sample data used only while MOCK_MODE = true.
const MOCK_MESSAGES = [
  { id: 1, name: 'Rafiq Hasan', email: 'rafiq@example.com', phone: '+880 1712-000000', service: 'Industrial Piping', message: 'We need a quote for fabricating carbon-steel piping for a new boiler line. Please advise lead time and pricing.', is_read: false, created_at: '2026-08-20T09:12:00Z' },
  { id: 2, name: 'Karim Iqbal', email: 'karim@example.com', phone: '', service: 'Structural Fabrication', message: 'Can your team visit our factory in Tongi next week to assess a structural steel platform installation?', is_read: false, created_at: '2026-08-19T14:40:00Z' },
  { id: 3, name: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '+880 1913-111111', service: 'Maintenance & Repair', message: 'Interested in an annual preventive maintenance contract for our compressors and pumps.', is_read: true, created_at: '2026-08-18T11:05:00Z' },
]

const MOCK_SETTINGS = {
  site_name: 'SN Engineering Works',
  logo: '/Contents/images/logo.png',
  phone: '+880 1911-234567',
  email: 'info@snengineeringworks.com',
  whatsapp: '8801911234567',
  address: 'J-86, Kabir Shopping Tower, Joydebpur, Gazipur',
  working_hours: 'Sat–Thu, 9am–7pm',
  map_embed: '',
  facebook: '', instagram: '', linkedin: '', youtube: '',
  footer_about: 'A trusted name in mechanical fabrication, industrial piping and maintenance services.',
}

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

  // ---- contact messages (dashboard) ----
  messages: {
    async list() {
      if (MOCK_MODE) {
        await wait(300)
        return MOCK_MESSAGES
      }
      return http('/messages')
    },
    async remove(id) {
      if (MOCK_MODE) {
        await wait(200)
        const i = MOCK_MESSAGES.findIndex((m) => m.id === id)
        if (i > -1) MOCK_MESSAGES.splice(i, 1)
        return { message: 'deleted' }
      }
      return http(`/messages/${id}`, { method: 'DELETE' })
    },
  },

  // ---- site settings ----
  settings: {
    async get() {
      if (MOCK_MODE) {
        await wait(200)
        return { ...MOCK_SETTINGS }
      }
      return http('/settings')
    },
    // formData: a FormData instance (text fields + optional `logo` file)
    async update(formData) {
      if (MOCK_MODE) {
        await wait(300)
        for (const [k, v] of formData.entries()) {
          if (k !== 'logo') MOCK_SETTINGS[k] = v
        }
        return { message: 'saved', settings: { ...MOCK_SETTINGS } }
      }
      // multipart: DON'T set Content-Type (browser adds the boundary)
      const res = await fetch(`${BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const err = new Error(data.message || 'Save failed')
        err.status = res.status
        err.errors = data.errors || {}
        throw err
      }
      return data
    },
  },
}

export default api
