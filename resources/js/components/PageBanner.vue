<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  crumb: { type: String, required: true }
})
</script>

<template>
  <section class="page-banner">
    <div class="container-xl">
      <div class="breadcrumb-row"><router-link to="/">Home</router-link> <span>/</span> <span>{{ crumb }}</span></div>
      <h1>{{ title }}</h1>
      <p v-if="text">{{ text }}</p>
    </div>
  </section>
</template>
