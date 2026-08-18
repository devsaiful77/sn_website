<script setup>
import { testimonials } from '../data/misc'
</script>

<template>
  <div class="row g-4" v-reveal>
    <div v-for="t in testimonials" :key="t.name" class="col-md-4">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">{{ t.text }}</p>
        <div class="testi-person">
          <div class="testi-avatar">{{ t.initials }}</div>
          <div>
            <div class="testi-name">{{ t.name }}</div>
            <div class="testi-role">{{ t.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
