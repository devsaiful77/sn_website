<script setup>
// Floating "message us" button — replaces the old WhatsApp float.
// Links to the Contact page. Works with vue-router; falls back to /contact-us.
</script>

<template>
  <router-link to="/contact-us" class="msg-float" aria-label="Message us">
    <span class="msg-float-ic">✉</span>
    <span class="msg-float-label">Message Us</span>
    <span class="msg-float-pulse"></span>
  </router-link>
</template>

<style scoped>
.msg-float {
  position: fixed; right: 22px; bottom: 22px; z-index: 900;
  display: flex; align-items: center; gap: 0;
  height: 56px; padding: 0; width: 56px;
  border-radius: 100px; overflow: hidden;
  background: var(--blue, #1763c9); color: #fff; text-decoration: none;
  box-shadow: 0 10px 26px -8px rgba(23,99,201,.7);
  transition: width .28s ease, padding .28s ease, background .15s;
}
.msg-float-ic {
  width: 56px; height: 56px; flex: none;
  display: grid; place-items: center; font-size: 23px;
}
.msg-float-label {
  white-space: nowrap; font-size: 14.5px; font-weight: 600;
  max-width: 0; opacity: 0; transition: max-width .28s ease, opacity .2s ease, padding .28s ease;
}
.msg-float:hover {
  width: 176px; padding-right: 20px; background: #1257b0;
}
.msg-float:hover .msg-float-label { max-width: 120px; opacity: 1; }

/* soft pulse ring */
.msg-float-pulse {
  position: absolute; inset: 0; border-radius: 100px;
  box-shadow: 0 0 0 0 rgba(23,99,201,.55);
  animation: msg-pulse 2.4s infinite;
  pointer-events: none;
}
@keyframes msg-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(23,99,201,.5); }
  70%  { box-shadow: 0 0 0 16px rgba(23,99,201,0); }
  100% { box-shadow: 0 0 0 0 rgba(23,99,201,0); }
}

@media (max-width: 520px){ .msg-float { right: 16px; bottom: 16px; } }
@media (prefers-reduced-motion: reduce){ .msg-float-pulse { animation: none; } .msg-float { transition: none; } }
</style>
