<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import ThemeToggle from '@/components/ThemeToggle.vue'

// Initialize theme on app start
const { initTheme } = useTheme()
initTheme()
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 class="app-title">Where in the world?</h1>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: background-color var(--transition-normal);
}

.header {
  background-color: var(--element-color);
  box-shadow: 0 2px 4px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
}

.app-title {
  font-size: var(--font-size-detail);
  font-weight: var(--font-weight-bold);
  color: var(--text-color);
  margin: 0;
}

.main {
  background-color: var(--bg-color);
  min-height: calc(100vh - 80px);
  padding: var(--spacing-lg) 0;
}

@media (min-width: 768px) {
  .main {
    padding: var(--spacing-xl) 0;
  }
}
</style>
