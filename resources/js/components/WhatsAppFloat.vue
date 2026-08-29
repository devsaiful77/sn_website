<script setup>
import { onMounted } from 'vue'
import { useCompanyProfile } from '../composables/useCompanyProfile'

const { profile, load } = useCompanyProfile()
onMounted(load)
</script>

<template>
  <a
    v-if="profile.whatsapp"
    :href="`https://wa.me/${profile.whatsapp}`"
    class="wa-float"
    target="_blank"
    rel="noopener"
    aria-label="Chat on WhatsApp"
  >💬</a>
</template>
