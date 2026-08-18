<script setup>
import PageBanner from '../components/PageBanner.vue'
import CtaBand from '../components/CtaBand.vue'
import { services } from '../data/services'
import { processSteps } from '../data/misc'
</script>

<template>
  <div>
  <PageBanner
    crumb="Services"
    title="Our Services"
    text="From first weld to final inspection — full-service mechanical and industrial engineering, handled by one accountable team."
  />

  <!-- SERVICES DETAIL -->
  <section class="section">
    <div class="container-xl">
      <div class="row g-4">
        <div v-for="s in services" :key="s.id" :id="s.id" class="col-lg-6" v-reveal>
          <div class="why-card" style="text-align:left; padding:34px;">
            <div class="service-icon" style="margin:0 0 18px;">{{ s.icon }}</div>
            <h3 style="font-size:20px;">{{ s.title }}</h3>
            <p style="margin-bottom:16px;">{{ s.long }}</p>
            <ul class="check-list">
              <li v-for="p in s.points" :key="p">{{ p }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="section section-soft">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">How We Work</span>
        <h2 class="section-title">Our Process</h2>
        <div class="divider-bar"></div>
      </div>

      <div class="row g-4" v-reveal>
        <div v-for="(step, i) in processSteps" :key="step.title" class="col-md-6 col-lg-3">
          <div class="why-card">
            <div class="why-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <CtaBand title="Need A Service Not Listed Here?" text="Tell us what you need — chances are we've done it before." />
  </div>
</template>
