<script setup>
// Navigation is data-driven so new sections are one line to add.
const primary = [
  { to: '/admin',           icon: '▚', label: 'Dashboard', exact: true },
]

</script>

<template>
  <aside class="sn-sidebar">
    <div class="sn-brand">
      <div class="sn-gear">S<br />N</div>
      <div class="sn-brand-text">
        <b>SN Engineering</b>
        <span>Control Panel</span>
      </div>
    </div>

    <nav class="sn-nav">
      <div class="sn-nav-label">Manage</div>
      <router-link
        v-for="item in primary"
        :key="item.to"
        :to="item.to"
        class="sn-nav-item"
        :class="{ active: $route.path === item.to || (!item.exact && $route.path.startsWith(item.to + '/')) }"
      >
        <span class="ic">{{ item.icon }}</span>
        <span class="txt">{{ item.label }}</span>
      </router-link>

    </nav>

    <div class="sn-sidebar-foot">v1.0 · SN Engineering Works</div>
  </aside>
</template>
