<script setup>
import { onMounted } from 'vue'
import { useSettings } from '../composables/useSettings'
import { asset } from '../services/config'

const { settings, load } = useSettings()
onMounted(load)
</script>

<template>
  <header class="site-header">
    <div class="container-xl">
      <router-link to="/" class="brand-row" style="color:inherit;">
        <div class="gear-badge" v-if="!settings.logo"><span>S<br />N</span></div>
        <img v-else :src="asset(settings.logo)" alt="Logo" class="brand-logo-img" />
        <div>
          <div class="brand-name">{{ settings.site_name || 'SN ENGINEERING WORKS' }}</div>
          <div class="brand-tag">Reliable Engineering Solutions for Industrial &amp; Mechanical Works</div>
        </div>
      </router-link>

      <div class="header-right">
        <div class="call-block" v-if="settings.phone">
          <div class="call-icon">📞</div>
          <div class="call-text">
            <div class="label">Call Us Anytime</div>
            <div class="num">{{ settings.phone }}</div>
          </div>
        </div>
        <router-link to="/contact-us" class="btn btn-primary">Get A Quote</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.brand-logo-img {
  height: 52px;
  width: auto;
  max-width: 130px;
  object-fit: contain;
  flex: none;
}
</style>
