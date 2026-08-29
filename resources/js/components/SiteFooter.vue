<script setup>
import { onMounted } from 'vue'
import { services } from '../data/services'
import { useSettings } from '../composables/useSettings'
import { asset } from '../services/config'

const { settings, load } = useSettings()
onMounted(load)
</script>

<template>
  <footer class="footer">
    <div class="container-xl">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <div class="gear-badge" v-if="!settings.logo"><span>S<br />N</span></div>
            <img v-else :src="asset(settings.logo)" alt="Logo" class="footer-logo-img" />
            <div class="footer-brand-name">{{ settings.site_name || 'SN Engineering Works' }}</div>
          </div>
          <p class="footer-note">{{ settings.footer_about || 'Reliable engineering solutions for industrial & mechanical works — fabrication, piping, and maintenance done right.' }}</p>
          <div class="footer-social">
            <a v-if="settings.facebook && settings.facebook !== '#'" :href="settings.facebook" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a v-if="settings.instagram && settings.instagram !== '#'" :href="settings.instagram" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a v-if="settings.linkedin && settings.linkedin !== '#'" :href="settings.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a v-if="settings.youtube && settings.youtube !== '#'" :href="settings.youtube" target="_blank" rel="noopener" aria-label="YouTube">yt</a>
            <a v-if="settings.whatsapp" :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
          </div>
        </div>

        <div class="foot-col">
          <div class="foot-title">Quick Links</div>
          <router-link to="/about-us">About Us</router-link>
          <router-link to="/services">Services</router-link>
          <router-link to="/projects">Projects</router-link>
          <router-link to="/gallery">Gallery</router-link>
          <router-link to="/why-choose-us">Why Choose Us</router-link>
          <router-link to="/contact-us">Contact Us</router-link>
        </div>

        <div class="foot-col">
          <div class="foot-title">Our Services</div>
          <router-link v-for="s in services" :key="s.id" :to="`/services#${s.id}`">{{ s.title }}</router-link>
        </div>

        <div class="foot-col">
          <div class="foot-title">Contact Info</div>
          <div class="foot-contact-item" v-if="settings.phone"><span class="ic">📞</span> {{ settings.phone }}</div>
          <div class="foot-contact-item" v-if="settings.email"><span class="ic">✉️</span> {{ settings.email }}</div>
          <div class="foot-contact-item" v-if="settings.address"><span class="ic">📍</span> {{ settings.address }}</div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© {{ new Date().getFullYear() }} {{ settings.site_name || 'SN Engineering Works' }}. All rights reserved.</div>
        <div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-logo-img {
  height: 46px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
}
</style>
