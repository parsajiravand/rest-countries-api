<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
    title="Toggle theme"
  >
    <span v-if="theme === 'light'" class="theme-icon">🌙</span>
    <span v-else class="theme-icon">☀️</span>
    <span class="theme-text">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--element-color);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--bg-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px var(--shadow-color);
}

.theme-icon {
  font-size: 16px;
  line-height: 1;
}

.theme-text {
  font-size: 12px;
  font-weight: var(--font-weight-normal);
}

@media (min-width: 768px) {
  .theme-text {
    display: inline;
  }
}

@media (max-width: 767px) {
  .theme-text {
    display: none;
  }

  .theme-toggle {
    padding: var(--spacing-xs);
    min-width: 40px;
    justify-content: center;
  }
}
</style>
