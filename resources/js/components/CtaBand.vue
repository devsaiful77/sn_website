<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true }
})
</script>

<template>
  <section class="cta-band">
    <div class="container-xl">
      <div v-reveal>
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
      </div>
      <div class="cta-actions" v-reveal>
        <router-link to="/contact-us" class="btn btn-primary">Get A Quote</router-link>
        <a href="https://wa.me/8801911234567" class="btn btn-whatsapp">💬 Whatsapp Us</a>
      </div>
    </div>
  </section>
</template>
