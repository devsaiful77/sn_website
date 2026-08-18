<script setup>
import { ref } from 'vue'
import { useScrollState } from '../composables/useScrollState'
import { services } from '../data/services'

const { scrollY } = useScrollState()
const navOpen = ref(false)
const servicesOpen = ref(false)

function toggleNav() {
  navOpen.value = !navOpen.value
}

function toggleServicesMobile() {
  if (window.innerWidth <= 991) servicesOpen.value = !servicesOpen.value
}
</script>

<template>
  <nav class="main-nav" :class="{ scrolled: scrollY > 10 }">
    <div class="container-xl" style="display:flex; align-items:center;">
      <div class="nav-inner" :class="{ open: navOpen }">
        <router-link to="/" @click="navOpen = false">Home</router-link>
        <router-link to="/about-us" @click="navOpen = false">About Us</router-link>

        <div class="nav-item" :class="{ open: servicesOpen }" @click="toggleServicesMobile">
          <router-link to="/services" style="padding:0; color:inherit;" @click="navOpen = false">Services ▾</router-link>
          <div class="dropdown-panel">
            <router-link
              v-for="s in services"
              :key="s.id"
              :to="`/services#${s.id}`"
              @click="navOpen = false"
            >{{ s.title }}</router-link>
          </div>
        </div>

        <router-link to="/projects" @click="navOpen = false">Projects</router-link>
        <router-link to="/gallery" @click="navOpen = false">Gallery</router-link>
        <router-link to="/why-choose-us" @click="navOpen = false">Why Choose Us</router-link>
        <router-link to="/contact-us" @click="navOpen = false">Contact Us</router-link>
      </div>
      <button class="nav-toggle" aria-label="Menu" @click="toggleNav">☰</button>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  background: var(--blue);
  color: #fff;
}
</style>
