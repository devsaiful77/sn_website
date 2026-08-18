<script setup>
import { projects } from '../data/projects'

const featured = projects.slice(0, 5)
const looped = [...featured, ...featured]
</script>

<template>
  <div class="project-rail-wrap" v-reveal>
    <div class="project-rail">
      <div v-for="(p, i) in looped" :key="i" class="project-card">
        <div class="pc-bg">{{ p.icon }}</div>
        <div class="pc-overlay"><span class="pc-label">{{ p.label }}</span></div>
      </div>
    </div>
  </div>
</template>
