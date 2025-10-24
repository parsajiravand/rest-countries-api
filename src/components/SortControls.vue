<template>
  <div class="sort-controls">
    <label class="sort-label">Sort by:</label>
    <div class="sort-buttons">
      <button
        @click="setSorting('name')"
        :class="{ active: filters.sortBy === 'name' }"
        class="sort-button"
      >
        Name
        <svg
          v-if="filters.sortBy === 'name'"
          :class="{ 'rotate-180': filters.sortOrder === 'desc' }"
          class="sort-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      <button
        @click="setSorting('population')"
        :class="{ active: filters.sortBy === 'population' }"
        class="sort-button"
      >
        Population
        <svg
          v-if="filters.sortBy === 'population'"
          :class="{ 'rotate-180': filters.sortOrder === 'desc' }"
          class="sort-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryFilters } from '@/types'

interface Props {
  filters: CountryFilters
}

interface Emits {
  (e: 'update:filters', filters: CountryFilters): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const setSorting = (sortBy: 'name' | 'population') => {
  const currentSortBy = props.filters.sortBy
  const currentSortOrder = props.filters.sortOrder

  let newSortOrder: 'asc' | 'desc' = 'asc'

  // If clicking the same sort button, toggle the order
  if (sortBy === currentSortBy) {
    newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc'
  }

  emit('update:filters', {
    ...props.filters,
    sortBy,
    sortOrder: newSortOrder
  })
}
</script>

<style scoped>
.sort-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sort-label {
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  color: var(--text-color);
  opacity: 0.8;
}

.sort-buttons {
  display: flex;
  gap: var(--spacing-xs);
}

.sort-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--element-color);
  color: var(--text-color);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.sort-button:hover {
  background-color: var(--bg-color);
  transform: translateY(-1px);
}

.sort-button.active {
  background-color: var(--text-color);
  color: var(--bg-color);
  border-color: var(--text-color);
}

.sort-icon {
  width: 14px;
  height: 14px;
  transition: transform var(--transition-fast);
}

.sort-icon.rotate-180 {
  transform: rotate(180deg);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .sort-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .sort-buttons {
    width: 100%;
  }

  .sort-button {
    flex: 1;
    justify-content: center;
  }
}
</style>
