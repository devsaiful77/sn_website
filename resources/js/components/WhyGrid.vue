<script setup>
defineProps({
  reasons: { type: Array, required: true },
  cols: { type: String, default: 'col-md-6 col-lg-3' }
})
</script>

<template>
  <div class="row g-4" v-reveal>
    <div v-for="(r, i) in reasons" :key="r.title" :class="cols">
      <div class="why-card">
        <div class="why-num">{{ String(i + 1).padStart(2, '0') }}</div>
        <h3>{{ r.title }}</h3>
        <p>{{ r.text }}</p>
      </div>
    </div>
  </div>
</template>
