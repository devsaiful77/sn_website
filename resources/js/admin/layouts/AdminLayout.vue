<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminHeader from '../components/AdminHeader.vue'
import AdminFooter from '../components/AdminFooter.vue'
import ToastHost from '../components/ToastHost.vue'

const route = useRoute()
const collapsed = ref(false)   // desktop rail collapse
const drawerOpen = ref(false)  // mobile drawer

const pageTitle = computed(() => route.meta.title || 'Dashboard')

function toggleSidebar() {
  if (window.innerWidth <= 992) drawerOpen.value = !drawerOpen.value
  else collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="admin-root">
    <div class="admin-shell" :class="{ collapsed, 'drawer-open': drawerOpen }">
      <AdminSidebar />

      <div v-if="drawerOpen" class="sn-scrim" @click="drawerOpen = false"></div>

      <div class="admin-main">
        <AdminHeader :title="pageTitle" @toggle-sidebar="toggleSidebar" />

        <main class="admin-body">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </main>

        <AdminFooter />
      </div>
    </div>

    <ToastHost />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
