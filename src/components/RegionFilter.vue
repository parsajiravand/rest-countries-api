<template>
  <div class="region-filter">
    <select
      class="region-select"
      :value="selectedRegion"
      @change="handleChange"
      :disabled="disabled"
    >
      <option value="">Filter by Region</option>
      <option
        v-for="region in regions"
        :key="region"
        :value="region"
      >
        {{ region }}
      </option>
    </select>
    <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  regions?: string[]
  selectedRegion?: string
  disabled?: boolean
}

interface Emits {
  (e: 'region-change', region: string): void
}

const props = withDefaults(defineProps<Props>(), {
  regions: () => [],
  selectedRegion: '',
  disabled: false
})

const emit = defineEmits<Emits>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  emit('region-change', value)
}
</script>

<style scoped>
.region-filter {
  position: relative;
  min-width: 200px;
}

.region-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) var(--spacing-sm);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  background-color: var(--element-color);
  color: var(--text-color);
  font-size: var(--font-size-home);
  font-family: var(--font-family);
  cursor: pointer;
  appearance: none;
  transition: all var(--transition-fast);
}

.region-select:focus {
  outline: none;
  border-color: var(--text-color);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.region-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dropdown-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--input-color);
  pointer-events: none;
}

/* Custom styling for option elements */
.region-select option {
  background-color: var(--element-color);
  color: var(--text-color);
  padding: var(--spacing-xs);
}

@media (min-width: 768px) {
  .region-filter {
    min-width: 220px;
  }
}
</style>
