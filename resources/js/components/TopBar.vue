<script setup>
import { onMounted } from 'vue'
import { useCompanyProfile } from '../composables/useCompanyProfile'

const { profile, load } = useCompanyProfile()
onMounted(load)
</script>

<template>
  <div class="topbar">
    <div class="container-xl">
      <div class="topbar-left">
        <span v-if="profile.support_number || profile.phone">
          📞 <a :href="`tel:${profile.support_number || profile.phone}`">{{ profile.support_number || profile.phone }}</a>
        </span>
        <span v-if="profile.email">✉️ <a :href="`mailto:${profile.email}`">{{ profile.email }}</a></span>
        <span v-if="profile.address">📍 {{ profile.address }}</span>
      </div>
      <div class="topbar-social">
        <a v-if="profile.facebook && profile.facebook !== '#'" :href="profile.facebook" target="_blank" rel="noopener" aria-label="Facebook">f</a>
        <a v-if="profile.linkedin && profile.linkedin !== '#'" :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a v-if="profile.whatsapp" :href="`https://wa.me/${profile.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
      </div>
    </div>
  </div>
</template>
