<script setup>
import PageBanner from '../components/PageBanner.vue'
import GalleryGrid from '../components/GalleryGrid.vue'
import CtaBand from '../components/CtaBand.vue'
</script>

<template>
  <div>
  <PageBanner
    crumb="Gallery"
    title="Work In Progress"
    text="A look inside the workshop and on-site — fabrication, welding, piping and installation work as it happens."
  />

  <section class="section">
    <div class="container-xl">
      <GalleryGrid />
    </div>
  </section>

  <CtaBand title="Like What You See?" text="This could be your project next. Let's talk." />
  </div>
</template>
