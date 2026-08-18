<script setup>
import { galleryIcons } from '../data/misc'

function bounce(e) {
  const el = e.currentTarget
  el.style.transform = 'scale(0.97)'
  setTimeout(() => { el.style.transform = '' }, 150)
}
</script>

<template>
  <div class="row g-3" v-reveal>
    <div v-for="(icon, i) in galleryIcons" :key="i" class="col-6 col-md-3">
      <div class="gallery-tile" @click="bounce">{{ icon }}</div>
    </div>
  </div>
</template>
