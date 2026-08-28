<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import SiteHeader from './components/SiteHeader.vue'
import MainNav from './components/MainNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import BackToTop from './components/BackToTop.vue'
import { useSettings } from './composables/useSettings'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

// Load site settings (logo, phone, email, address, socials...) once, early,
// so every component that reads `settings` from useSettings() already has
// the data by the time it renders (or reacts to it once the fetch lands).
const { load } = useSettings()
onMounted(load)
</script>

<template>
  <template v-if="!isAdmin">
    <TopBar />
    <SiteHeader />
    <MainNav />
  </template>

  <router-view v-slot="{ Component, route: r }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="r.path" />
    </transition>
  </router-view>

  <template v-if="!isAdmin">
    <SiteFooter />
    <WhatsAppFloat />
    <BackToTop />
  </template>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
