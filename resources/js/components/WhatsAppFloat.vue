<script setup>
import { onMounted } from 'vue'
import { useSettings } from '../composables/useSettings'

const { settings, load } = useSettings()
onMounted(load)
</script>

<template>
  <a
    v-if="settings.whatsapp"
    :href="`https://wa.me/${settings.whatsapp}`"
    class="wa-float"
    target="_blank"
    rel="noopener"
    aria-label="Chat on WhatsApp"
  >💬</a>
</template>
