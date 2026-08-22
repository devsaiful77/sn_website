<script setup>
import { useToast } from '../composables/useToast'
const { toasts } = useToast()
</script>

<template>
  <div class="sn-toasts" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="sn-toast" :class="t.type">
      <span class="ic">{{ t.type === 'err' ? '✕' : '✓' }}</span>
      <span>{{ t.message }}</span>
    </div>
  </div>
</template>
