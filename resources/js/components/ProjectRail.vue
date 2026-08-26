<script setup>
import { projects } from '../data/projects'

const featured = projects.slice(0, 5)
const looped = [...featured, ...featured]
</script>

<template>
  <div class="project-rail-wrap" v-reveal>
    <div class="project-rail">
      <div v-for="(p, i) in looped" :key="i" class="project-card">
        <div class="pc-bg">
          <img :src="p.image" :alt="p.label" class="pc-img" loading="lazy" />
        </div>
        <div class="pc-overlay"><span class="pc-label">{{ p.label }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Don't touch .pc-bg — it's already position:absolute; inset:0 in your CSS. */
.pc-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
</style>
