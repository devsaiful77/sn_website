<script setup>
import { services } from '../data/services'
</script>

<template>
  <footer class="footer">
    <div class="container-xl">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <div class="gear-badge"><span>S<br />N</span></div>
            <div class="footer-brand-name">SN Engineering<br />Works</div>
          </div>
          <p class="footer-note">Reliable engineering solutions for industrial &amp; mechanical works — fabrication, piping, and maintenance done right.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="WhatsApp">✆</a>
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
          <div class="foot-contact-item"><span class="ic">📞</span> +880 1911-234567</div>
          <div class="foot-contact-item"><span class="ic">✉️</span> info@snengineeringworks.com</div>
          <div class="foot-contact-item"><span class="ic">📍</span> J-86, Kabir Shopping Tower, Joydebpur, Gazipur</div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 SN Engineering Works. All rights reserved.</div>
        <div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
      </div>
    </div>
  </footer>
</template>
