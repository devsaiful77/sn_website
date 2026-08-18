<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  count: { type: Number, required: true },
  suffix: { type: String, default: '+' }
})

const display = ref('0')
const el = ref(null)
let io

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate()
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  if (el.value) io.observe(el.value)
})

onUnmounted(() => io && io.disconnect())

function animate() {
  let current = 0
  const step = Math.max(1, Math.ceil(props.count / 60))
  const timer = setInterval(() => {
    current += step
    if (current >= props.count) {
      display.value = props.count.toLocaleString() + props.suffix
      clearInterval(timer)
    } else {
      display.value = current.toLocaleString()
    }
  }, 20)
}
</script>

<template>
  <div ref="el" class="stat-num">{{ display }}</div>
</template>
