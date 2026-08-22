<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

defineProps({
  title: { type: String, default: 'Dashboard' },
})
const emit = defineEmits(['toggle-sidebar'])

const router = useRouter()
const { user, logout } = useAuth()
const menuOpen = ref(false)

function initials(name) {
  return (name || 'A')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

async function onLogout() {
  await logout()
  router.replace('/admin/login')
}
</script>

<template>
  <header class="sn-header">
    <button class="sn-hamburger" aria-label="Toggle sidebar" @click="emit('toggle-sidebar')">☰</button>

    <div class="sn-crumbs">
      Admin <span style="opacity:.4"> / </span> <b>{{ title }}</b>
    </div>

    <div class="sn-header-spacer"></div>

    <div class="sn-search">
      <span class="ic">⌕</span>
      <input type="search" placeholder="Search…" aria-label="Search" />
    </div>

    <button class="sn-iconbtn" aria-label="Notifications">
      ✦<span class="sn-dot"></span>
    </button>

    <div class="sn-user" tabindex="0" @click="menuOpen = !menuOpen" @blur="menuOpen = false" style="position:relative">
      <div class="sn-avatar">{{ initials(user?.name) }}</div>
      <div class="sn-user-meta">
        <b>{{ user?.name || 'Admin' }}</b>
        <span>{{ user?.role || 'Administrator' }}</span>
      </div>
      <span style="color:var(--sn-faint);font-size:11px">▾</span>

      <div
        v-if="menuOpen"
        class="sn-card"
        style="position:absolute;top:52px;right:0;width:180px;padding:6px;z-index:50"
        @click.stop
      >
        <button class="sn-nav-item" style="color:var(--sn-text);width:100%;text-align:left">
          <span class="ic">☺</span><span class="txt">My Profile</span>
        </button>
        <button class="sn-nav-item" style="color:var(--sn-danger);width:100%;text-align:left" @click="onLogout">
          <span class="ic">⏻</span><span class="txt">Sign Out</span>
        </button>
      </div>
    </div>
  </header>
</template>
