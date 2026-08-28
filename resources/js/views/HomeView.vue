<script setup>
import HeroSlider from '../components/HeroSlider.vue'
import ServiceRail from '../components/ServiceRail.vue'
import AboutSection from '../components/AboutSection.vue'
import ProjectRail from '../components/ProjectRail.vue'
import StatsBand from '../components/StatsBand.vue'
import WhyGrid from '../components/WhyGrid.vue'
import GalleryGrid from '../components/GalleryGrid.vue'
import TestimonialGrid from '../components/TestimonialGrid.vue'
import CtaBand from '../components/CtaBand.vue'
import { whyReasons } from '../data/misc'
</script>

<template>
  <div>
  <HeroSlider />

  <!-- SERVICES -->
  <section class="section" id="services">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">What We Do</span>
        <h2 class="section-title">Our Services</h2>
        <div class="divider-bar"></div>
      </div>
    </div>

    <ServiceRail />

    <div class="container-xl text-center mt-5" v-reveal>
      <router-link to="/services" class="btn btn-navy">View All Services</router-link>
    </div>
  </section>

  <!-- STATS -->
  <StatsBand />

  <!-- ABOUT TEASER -->
  <AboutSection />

  <!-- WHY CHOOSE US -->
  <section class="section section-soft" id="why">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Why Choose Us</span>
        <h2 class="section-title">What Sets Us Apart</h2>
        <div class="divider-bar"></div>
      </div>

      <WhyGrid :reasons="whyReasons.slice(0, 4)" />

      <div class="text-center mt-5" v-reveal>
        <router-link to="/why-choose-us" class="btn btn-navy">See All Reasons</router-link>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="section" id="projects">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Our Projects</span>
        <h2 class="section-title">Recent Projects</h2>
        <div class="divider-bar"></div>
      </div>
    </div>

    <ProjectRail />

    <div class="text-center mt-5" v-reveal>
      <router-link to="/projects" class="btn btn-navy">View All Projects</router-link>
    </div>
  </section>

  

  <!-- TESTIMONIALS -->
  <section class="section">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Testimonials</span>
        <h2 class="section-title">What Our Clients Say</h2>
        <div class="divider-bar"></div>
      </div>

      <TestimonialGrid />
    </div>
  </section>

  <CtaBand title="Looking For Reliable Engineering Solutions?" text="Let's build something great together." />
  </div>
</template>
