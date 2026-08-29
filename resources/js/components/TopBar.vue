<script setup>
import { onMounted } from 'vue'
import { useSettings } from '../composables/useSettings'

const { settings, load } = useSettings()
onMounted(load)
</script>

<template>
  <div class="topbar">
    <div class="container-xl">
      <div class="topbar-left">
        <span v-if="settings.phone">📞 <a :href="`tel:${settings.phone}`">{{ settings.phone }}</a></span>
        <span v-if="settings.email">✉️ <a :href="`mailto:${settings.email}`">{{ settings.email }}</a></span>
        <span v-if="settings.address">📍 {{ settings.address }}</span>
      </div>
      <div class="topbar-social">
        <a v-if="settings.facebook && settings.facebook !== '#'" :href="settings.facebook" target="_blank" rel="noopener" aria-label="Facebook">f</a>
        <a v-if="settings.linkedin && settings.linkedin !== '#'" :href="settings.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a v-if="settings.whatsapp" :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
      </div>
    </div>
  </div>
</template>
