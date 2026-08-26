<script setup>
import PageBanner from '../components/PageBanner.vue'
import StatsBand from '../components/StatsBand.vue'
import CtaBand from '../components/CtaBand.vue'
import { projects } from '../data/projects'
</script>

<template>
  <div>
  <PageBanner
    crumb="Projects"
    title="Our Projects"
    text="500+ completed jobs across fabrication, piping, boiler installation and structural steel work — here's a sample."
  />

  <!-- PROJECT GRID -->
  <section class="section">
    <div class="container-xl">
      <div class="row g-4" v-reveal>
        <div v-for="(p, i) in projects" :key="i" class="col-md-6 col-lg-4">
          <div class="project-card" style="width:100%; aspect-ratio:4/3.4;">
            <div class="pc-bg">
              <img :src="p.icon" alt="">
            </div>
            <div class="pc-overlay"><span class="pc-label">{{ p.label }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <StatsBand />

  <CtaBand title="Have A Project In Mind?" text="Let's talk scope, timeline and budget — get a free quote today." />
  </div>
</template>
