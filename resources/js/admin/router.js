// resources/js/admin/router.js
// Admin routes + navigation guard.
// Either merge these routes into your existing main router,
// or mount this as a separate router. See INTEGRATION.md.

import AdminLayout from './layouts/AdminLayout.vue'
import { getToken } from './services/api'

// Lazy-loaded pages
const Login        = () => import('./pages/Login.vue')
const Dashboard    = () => import('./pages/Dashboard.vue')
const Services     = () => import('./pages/Services.vue')
const NotFound     = () => import('./pages/NotFound.vue')

export const adminRoutes = [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '',          name: 'admin.dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
      { path: 'services',  name: 'admin.services',  component: Services,  meta: { title: 'Services' } },
      // Placeholders — build these next, same pattern as Services.vue:
      // { path: 'projects',     component: () => import('./pages/Projects.vue'),     meta: { title: 'Projects' } },
      // { path: 'gallery',      component: () => import('./pages/Gallery.vue'),      meta: { title: 'Gallery' } },
      // { path: 'testimonials', component: () => import('./pages/Testimonials.vue'), meta: { title: 'Testimonials' } },
      // { path: 'messages',     component: () => import('./pages/Messages.vue'),     meta: { title: 'Enquiries' } },
      // { path: 'site',         component: () => import('./pages/SiteContent.vue'),  meta: { title: 'Site Content' } },
      // { path: 'users',        component: () => import('./pages/Users.vue'),        meta: { title: 'Admin Users' } },

      // Catch-all for any unknown /admin/* path — renders inside the layout.
      { path: ':pathMatch(.*)*', name: 'admin.notfound', component: NotFound, meta: { title: 'Not Found' } },
    ],
  },
]

// Attach this guard to your router instance: router.beforeEach(adminGuard)
export function adminGuard(to) {
  const authed = !!getToken()

  if (to.meta.requiresAuth && !authed) {
    return { name: 'admin.login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && authed) {
    return { name: 'admin.dashboard' }
  }
  return true
}
