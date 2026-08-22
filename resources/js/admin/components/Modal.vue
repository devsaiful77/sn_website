<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
const emit = defineEmits(['close'])

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="sn-modal-mask" @click.self="emit('close')">
    <div class="sn-modal" role="dialog" aria-modal="true">
      <div class="sn-modal-head">
        <div>
          <h3>{{ title }}</h3>
          <p v-if="subtitle">{{ subtitle }}</p>
        </div>
        <button class="sn-modal-x" aria-label="Close" @click="emit('close')">×</button>
      </div>
      <div class="sn-modal-body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="sn-modal-foot">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
