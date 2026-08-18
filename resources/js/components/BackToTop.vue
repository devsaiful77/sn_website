<script setup>
import { useScrollState } from '../composables/useScrollState'

const { scrollY } = useScrollState()

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button class="to-top" :class="{ show: scrollY > 500 }" aria-label="Back to top" @click="scrollTop">↑</button>
</template>
