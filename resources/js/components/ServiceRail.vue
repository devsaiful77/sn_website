<script setup>
import { services } from '../data/services'

// duplicate the list for a seamless CSS-driven loop
const looped = [...services, ...services]
</script>

<template>
  <div class="service-rail-wrap" v-reveal>
    <div class="service-rail">
      <div v-for="(s, i) in looped" :key="i" class="service-card">
        <div class="service-icon">{{ s.icon }}</div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.short }}</p>
      </div>
    </div>
  </div>
</template>
