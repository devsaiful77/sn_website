import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/about-us', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue') },
  { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue') },
  { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryView.vue') },
  { path: '/why-choose-us', name: 'why', component: () => import('../views/WhyChooseView.vue') },
  { path: '/contact-us', name: 'contact', component: () => import('../views/ContactView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 120 }
    }
    return { top: 0 }
  }
})

export default router
