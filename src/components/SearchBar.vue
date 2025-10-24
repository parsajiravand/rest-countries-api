<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        type="text"
        class="search-input"
        :value="initialValue"
        @input="handleInput"
        placeholder="Search for a country..."
        :disabled="disabled"
        ref="searchInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Props {
  initialValue?: string
  disabled?: boolean
}

interface Emits {
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: '',
  disabled: false
})

const emit = defineEmits<Emits>()

const searchInput = ref<HTMLInputElement>()

// Handle input with debouncing
let debounceTimer: number | null = null

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Set new timer for debounced search
  debounceTimer = setTimeout(() => {
    emit('search', value)
  }, 300)
}

// Focus input when component mounts
const focus = () => {
  nextTick(() => {
    searchInput.value?.focus()
  })
}

// Watch for initial value changes (for external updates)
watch(() => props.initialValue, (newValue) => {
  if (searchInput.value && searchInput.value.value !== newValue) {
    searchInput.value.value = newValue
  }
})

// Expose focus method
defineExpose({
  focus
})
</script>

<style scoped>
.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  width: 18px;
  height: 18px;
  color: var(--input-color);
  z-index: 1;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 48px;
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  background-color: var(--element-color);
  color: var(--text-color);
  font-size: var(--font-size-home);
  font-family: var(--font-family);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--text-color);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-input::placeholder {
  color: var(--input-color);
}

@media (min-width: 768px) {
  .search-container {
    max-width: 480px;
  }
}
</style>
