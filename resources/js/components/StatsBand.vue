<script setup>
import { stats } from '../data/misc'
import StatCounter from './StatCounter.vue'
</script>

<template>
  <section class="stats-band">
    <div class="container-xl">
      <div class="row g-4">
        <div v-for="s in stats" :key="s.label" class="col-6 col-md-3" v-reveal>
          <div class="stat-icon">{{ s.icon }}</div>
          <StatCounter :count="s.count" :suffix="s.suffix" />
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
