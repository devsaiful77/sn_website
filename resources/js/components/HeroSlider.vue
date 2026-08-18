<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { heroSlides } from '../data/misc'

const index = ref(0)
let timer = null
const sparks = ref([])
let sparkTimer = null
let sparkId = 0

function show(i) {
  index.value = (i + heroSlides.length) % heroSlides.length
}
function next() { show(index.value + 1) }
function prev() { show(index.value - 1) }

function restart() {
  clearInterval(timer)
  timer = setInterval(next, 5500)
}

function spawnSpark() {
  const id = sparkId++
  const dx = (Math.random() * 120 - 60).toFixed(0) + 'px'
  const dy = (-40 - Math.random() * 90).toFixed(0) + 'px'
  const right = (10 + Math.random() * 8) + '%'
  const bottom = (6 + Math.random() * 6) + '%'
  sparks.value.push({ id, dx, dy, right, bottom })
  setTimeout(() => {
    sparks.value = sparks.value.filter((s) => s.id !== id)
  }, 1700)
}

onMounted(() => {
  restart()
  sparkTimer = setInterval(spawnSpark, 180)
})
onUnmounted(() => {
  clearInterval(timer)
  clearInterval(sparkTimer)
})
</script>

<template>
  <section class="hero-slider">
    <div
      v-for="(slide, i) in heroSlides"
      :key="i"
      class="hero-slide"
      :class="{ active: i === index }"
    >
      <div class="slide-bg" :style="{ background: slide.bg }"></div>
      <div class="slide-overlay"></div>

      <div v-if="slide.sparks && i === index" class="spark-field">
        <span
          v-for="s in sparks"
          :key="s.id"
          class="spark"
          :style="{ '--dx': s.dx, '--dy': s.dy, right: s.right, bottom: s.bottom }"
        ></span>
      </div>

      <div class="container-xl">
        <div class="hero-content">
          <h1>{{ slide.title }} <span class="accent">{{ slide.accent }}</span> {{ slide.tail }}</h1>
          <p>{{ slide.text }}</p>
          <div class="hero-btns">
            <router-link :to="slide.primaryTo" class="btn btn-primary">{{ slide.primaryLabel }}</router-link>
            <a href="https://wa.me/8801911234567" class="btn btn-outline-light">💬 Whatsapp Us</a>
          </div>
        </div>
      </div>
    </div>

    <button class="hero-arrow prev" aria-label="Previous slide" @click="prev(); restart()">‹</button>
    <button class="hero-arrow next" aria-label="Next slide" @click="next(); restart()">›</button>
    <div class="hero-dots">
      <span
        v-for="(slide, i) in heroSlides"
        :key="i"
        :class="{ active: i === index }"
        @click="show(i); restart()"
      ></span>
    </div>
  </section>
</template>
