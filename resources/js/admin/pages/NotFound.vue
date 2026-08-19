<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="sn-404">
    <div class="sn-404-card">
      <div class="sn-404-badge">⚙</div>

      <div class="sn-404-code">404</div>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist, was moved, or the link is broken.</p>

      <div class="sn-404-actions">
        <button class="sn-btn sn-btn-ghost" @click="router.back()">← Go back</button>
        <router-link to="/admin" class="sn-btn sn-btn-primary">Back to dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sn-404 {
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 40px 16px;
}
.sn-404-card {
  position: relative;
  text-align: center;
  max-width: 440px;
  padding: 44px 32px;
  background: var(--sn-surface);
  border: 1px solid var(--sn-border);
  border-radius: 16px;
  box-shadow: var(--sn-shadow);
  overflow: hidden;
}
/* blueprint grid signature, faded */
.sn-404-card::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(23,99,201,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23,99,201,.06) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%);
  pointer-events: none;
}
.sn-404-card > * { position: relative; }

.sn-404-badge {
  width: 58px; height: 58px; margin: 0 auto 18px;
  display: grid; place-items: center;
  border-radius: 14px;
  background: var(--sn-blue-050);
  color: var(--sn-blue);
  font-size: 26px;
  animation: sn-turn 6s linear infinite;
}
@keyframes sn-turn { to { transform: rotate(360deg); } }

.sn-404-code {
  font-family: var(--sn-mono);
  font-size: 64px;
  font-weight: 500;
  letter-spacing: 2px;
  line-height: 1;
  color: var(--sn-ink-2);
  margin-bottom: 6px;
}
.sn-404-card h1 {
  font-family: var(--sn-display);
  font-size: 22px;
  margin: 0 0 8px;
  color: var(--sn-text);
}
.sn-404-card p {
  font-size: 13.5px;
  color: var(--sn-muted);
  margin: 0 0 26px;
  line-height: 1.6;
}
.sn-404-actions {
  display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
}
.sn-404-actions .sn-btn { text-decoration: none; }

@media (prefers-reduced-motion: reduce) {
  .sn-404-badge { animation: none; }
}
</style>
