<script setup>
import { onMounted } from 'vue'
import { useCompanyProfile } from '../composables/useCompanyProfile'
import { asset } from '../services/config'

const { profile, load } = useCompanyProfile()
onMounted(load)
</script>

<template>
  <header class="site-header">
    <div class="container-xl">
      <router-link to="/" class="brand-row" style="color:inherit;">
        <div class="gear-badge" v-if="!profile.logo"><span>S<br />N</span></div>
        <img v-else :src="asset(profile.logo)" alt="Logo" class="brand-logo-img" />
        <div>
          <div class="brand-name">{{ profile.company_name || 'N ENGINEERING WORKS' }}</div>
          <div class="brand-tag">{{ profile.company_slogan || 'Reliable Engineering Solutions for Industrial & Mechanical Works' }}</div>
        </div>
      </router-link>

      <div class="header-right">
        <div class="call-block" v-if="profile.phone || profile.support_number">
          <div class="call-icon">📞</div>
          <div class="call-text">
            <div class="label">Call Us Anytime</div>
            <div class="num">{{ profile.phone || profile.support_number }}</div>
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
