<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

// Add/remove items here as you build more admin pages.
const primary = [
  { to: '/admin', icon: '▚', label: 'Dashboard', exact: true },
]
const settings = [
  { to: '/admin/site', icon: '◈', label: 'Site Settings' },
]

async function onLogout() {
  await logout()
  router.replace('/admin/login')
}
</script>

<template>
  <aside class="sn-sidebar">
    <div class="sn-brand">
      <div class="sn-gear">S<br />N</div>
      <div class="sn-brand-text">
        <b>SN Engineering</b>
        <span>Control Panel</span>
      </div>
    </div>

    <nav class="sn-nav">
      <div class="sn-nav-label">Manage</div>
      <router-link
        v-for="item in primary"
        :key="item.to"
        :to="item.to"
        class="sn-nav-item"
        :class="{ active: $route.path === item.to || (!item.exact && $route.path.startsWith(item.to + '/')) }"
      >
        <span class="ic">{{ item.icon }}</span>
        <span class="txt">{{ item.label }}</span>
      </router-link>

      <div class="sn-nav-label">Configuration</div>
      <router-link
        v-for="item in settings"
        :key="item.to"
        :to="item.to"
        class="sn-nav-item"
        :class="{ active: $route.path.startsWith(item.to) }"
      >
        <span class="ic">{{ item.icon }}</span>
        <span class="txt">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="sn-sidebar-actions">
      <button class="sn-nav-item sn-logout" @click="onLogout">
        <span class="ic">⏻</span>
        <span class="txt">Sign Out</span>
      </button>
    </div>

    <div class="sn-sidebar-foot">v1.0 · SN Engineering Works</div>
  </aside>
</template>

<style scoped>
.sn-sidebar-actions { padding: 8px 12px; border-top: 1px solid rgba(255,255,255,.07); }
.sn-logout {
  width: 100%; text-align: left; border: 0; background: transparent; cursor: pointer;
  color: #f2a3a3;
}
.sn-logout:hover { background: rgba(220,38,38,.16); color: #fff; }
</style>
