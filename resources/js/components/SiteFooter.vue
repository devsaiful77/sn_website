<script setup>
import { onMounted } from 'vue'
import { services } from '../data/services'
import { useCompanyProfile } from '../composables/useCompanyProfile'
import { asset } from '../services/config'

const { profile, load } = useCompanyProfile()
onMounted(load)
</script>

<template>
  <footer class="footer">
    <div class="container-xl">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <div class="gear-badge" v-if="!profile.logo"><span>S<br />N</span></div>
            <img v-else :src="asset(profile.logo)" alt="Logo" class="footer-logo-img" />
            <div class="footer-brand-name">{{ profile.company_name || 'SN Engineering Works' }}</div>
          </div>
          <p class="footer-note">{{ profile.footer_about || profile.about_company || 'Reliable engineering solutions for industrial & mechanical works — fabrication, piping, and maintenance done right.' }}</p>
          <div class="footer-social">
            <a v-if="profile.facebook && profile.facebook !== '#'" :href="profile.facebook" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a v-if="profile.instagram && profile.instagram !== '#'" :href="profile.instagram" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a v-if="profile.linkedin && profile.linkedin !== '#'" :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a v-if="profile.youtube && profile.youtube !== '#'" :href="profile.youtube" target="_blank" rel="noopener" aria-label="YouTube">yt</a>
            <a v-if="profile.whatsapp" :href="`https://wa.me/${profile.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
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
          <div class="foot-contact-item" v-if="profile.support_number"><span class="ic">☎️</span> {{ profile.support_number }}</div>
          <div class="foot-contact-item" v-if="profile.phone"><span class="ic">📞</span> {{ profile.phone }}</div>
          <div class="foot-contact-item" v-if="profile.email"><span class="ic">✉️</span> {{ profile.email }}</div>
          <div class="foot-contact-item" v-if="profile.address"><span class="ic">📍</span> {{ profile.address }}</div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© {{ new Date().getFullYear() }} {{ profile.company_name || 'SN Engineering Works' }}. All rights reserved.</div>
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
