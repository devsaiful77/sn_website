<script setup>
import HeroSlider from '../components/HeroSlider.vue'
import ServiceRail from '../components/ServiceRail.vue'
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

  <!-- LOGOS -->
  <section class="section-tight" v-reveal>
    <div class="container-xl">
      <p class="text-muted-nx mb-tiny" style="font-size:13px;">Trusted by teams across textile, chemical and logistics sectors</p>
      <div class="logo-strip">
        <span class="logo-chip">Northline</span>
        <span class="logo-chip">Reef Retail</span>
        <span class="logo-chip">Fintra</span>
        <span class="logo-chip">Lumio</span>
        <span class="logo-chip">Kavo Textiles</span>
        <span class="logo-chip">Orbital Chem</span>
      </div>
    </div>
  </section>

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
  <section class="section" id="about">
    <div class="container-xl">
      <div class="row g-5 align-items-center">
        <div class="col-lg-5" v-reveal="'fade-left'">
          <div class="about-media">
            <div class="photo-block">🏭</div>
            <div class="exp-badge">
              <div class="n">10+</div>
              <div class="l">Years Exp.</div>
            </div>
          </div>
        </div>

        <div class="col-lg-7" v-reveal="'fade-right'">
          <span class="eyebrow">About Us</span>
          <h2 class="section-title" style="margin-bottom:16px;">SN Engineering Works</h2>
          <p class="section-sub" style="margin-top:0;">SN Engineering Works is a trusted name in the field of mechanical fabrication, industrial piping, and maintenance services.</p>
          <p class="section-sub">We are committed to delivering high quality engineering solutions with safety, precision and on-time completion.</p>

          <ul class="check-list row">
            <li class="col-md-6">Experienced &amp; Skilled Team</li>
            <li class="col-md-6">Modern Tools &amp; Equipment</li>
            <li class="col-md-6">Quality Workmanship</li>
            <li class="col-md-6">Customer Satisfaction Our Priority</li>
          </ul>

          <router-link to="/about-us" class="btn btn-outline-light" style="border-color:var(--navy); color:var(--navy); margin-top:10px;">More About Us →</router-link>
        </div>
      </div>
    </div>
  </section>

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

  <!-- GALLERY -->
  <section class="section section-soft" id="gallery">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Gallery</span>
        <h2 class="section-title">Work In Progress</h2>
        <div class="divider-bar"></div>
      </div>

      <GalleryGrid />

      <div class="text-center mt-5" v-reveal>
        <router-link to="/gallery" class="btn btn-navy">View Full Gallery</router-link>
      </div>
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
