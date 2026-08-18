<script setup>
import TopBar from './components/TopBar.vue'
import SiteHeader from './components/SiteHeader.vue'
import MainNav from './components/MainNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <TopBar />
  <SiteHeader />
  <MainNav />

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>

  <SiteFooter />
  <WhatsAppFloat />
  <BackToTop />
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
