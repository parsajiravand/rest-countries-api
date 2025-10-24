<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCountries } from '@/composables/useCountries'
import type { CountryFilters } from '@/types'
import CountryCard from '@/components/CountryCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import RegionFilter from '@/components/RegionFilter.vue'
import SortControls from '@/components/SortControls.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Composables
const {
  filteredCountries,
  loading,
  error,
  filters,
  fetchAllCountries,
  setSearchFilter,
  setRegionFilter,
  setSorting,
  getRegions,
} = useCountries()

// Computed properties
const regions = computed(() => getRegions())

// Lifecycle
onMounted(() => {
  fetchAllCountries()
})

// Event handlers
const handleSearch = (searchTerm: string) => {
  setSearchFilter(searchTerm)
}

const handleRegionFilter = (region: string) => {
  setRegionFilter(region)
}

const handleFiltersUpdate = (newFilters: CountryFilters) => {
  // Update filters using the composable's setSorting method
  setSorting(newFilters.sortBy, newFilters.sortOrder)
}
</script>

<template>
  <div class="home-view">
    <div class="container">
      <!-- Search and Filter Section -->
      <div class="controls">
        <SearchBar :initial-value="filters.search" @search="handleSearch" :disabled="loading" />
        <div class="filter-row">
          <RegionFilter
            :regions="regions"
            :selected-region="filters.region"
            @region-change="handleRegionFilter"
            :disabled="loading"
          />
          <SortControls :filters="filters" @update:filters="handleFiltersUpdate" />
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading && filteredCountries.length === 0" />

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchAllCountries" class="retry-btn">Try Again</button>
      </div>

      <!-- Countries Grid -->
      <div v-else-if="filteredCountries.length > 0" class="countries-grid">
        <div v-for="(country, index) in filteredCountries" :key="index">
          <CountryCard :country="country" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No countries found matching your criteria.</p>
        <button @click="setSearchFilter('')" class="clear-btn">Clear Search</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding-bottom: var(--spacing-xl);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.filter-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .controls {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .filter-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

@media (min-width: 640px) {
  .countries-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .countries-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .countries-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.error-state,
.empty-state {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.error-state p,
.empty-state p {
  font-size: var(--font-size-detail);
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
}

.retry-btn,
.clear-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--element-color);
  color: var(--text-color);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.retry-btn:hover,
.clear-btn:hover {
  background-color: var(--bg-color);
  transform: translateY(-1px);
}

.retry-btn:active,
.clear-btn:active {
  transform: translateY(0);
}
</style>
