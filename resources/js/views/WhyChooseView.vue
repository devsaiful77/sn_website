<script setup>
import PageBanner from '../components/PageBanner.vue'
import WhyGrid from '../components/WhyGrid.vue'
import StatsBand from '../components/StatsBand.vue'
import TestimonialGrid from '../components/TestimonialGrid.vue'
import CtaBand from '../components/CtaBand.vue'
import { whyReasons } from '../data/misc'
</script>

<template>
  <div>
  <PageBanner
    crumb="Why Choose Us"
    title="Why Choose Us"
    text="100+ clients keep coming back for the same reasons — here's what sets SN Engineering Works apart."
  />

  <section class="section">
    <div class="container-xl">
      <WhyGrid :reasons="whyReasons" cols="col-md-6 col-lg-4" />
    </div>
  </section>

  <StatsBand />

  <section class="section section-soft">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Testimonials</span>
        <h2 class="section-title">What Our Clients Say</h2>
        <div class="divider-bar"></div>
      </div>

      <TestimonialGrid />
    </div>
  </section>

  <CtaBand title="Ready To Experience The Difference?" text="Get a free quote and see why clients stay with us for years." />
  </div>
</template>
