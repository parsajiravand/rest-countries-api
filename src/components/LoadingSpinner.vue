<template>
  <div class="loading-container" v-if="show">
    <div class="spinner"></div>
    <p class="loading-text" v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  message: 'Loading...'
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--input-color);
  border-top: 3px solid var(--text-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-sm);
}

.loading-text {
  font-size: var(--font-size-home);
  color: var(--text-color);
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dark mode adjustments */
[data-theme="dark"] .spinner {
  border-color: var(--input-color);
  border-top-color: var(--text-color);
}
</style>
