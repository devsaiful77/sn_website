<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import SiteHeader from './components/SiteHeader.vue'
import MainNav from './components/MainNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import BackToTop from './components/BackToTop.vue'
import { useCompanyProfile } from './composables/useCompanyProfile'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

// Load the active company profile (logo, phone, email, address, socials...)
// once, early, so every component that reads `profile` from
// useCompanyProfile() already has the data by the time it renders (or
// reacts to it once the fetch lands).
const { load } = useCompanyProfile()
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
