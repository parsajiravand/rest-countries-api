<template>
  <router-link :to="`/country/${encodeURIComponent(country.name.common)}`" class="country-card">
    <div class="country-flag">
      <img
        :src="country.flags.png"
        :alt="`Flag of ${country.name.common}`"
        loading="lazy"
        @load="handleImageLoad"
        @error="handleImageError"
        class="flag-image"
        :class="{ loaded: imageLoaded, error: imageError }"
      />
      <!-- Fallback for broken images -->
      <div v-if="imageError" class="flag-fallback">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <line x1="7" y1="7" x2="13" y2="13" />
          <line x1="13" y1="7" x2="7" y2="13" />
        </svg>
      </div>
    </div>

    <div class="country-info">
      <h2 class="country-name">{{ country.name.common }}</h2>

      <div class="country-details">
        <div class="detail-item">
          <span class="detail-label">Population:</span>
          <span class="detail-value">{{ formatPopulation(country.population) }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Region:</span>
          <span class="detail-value">{{ country.region }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Capital:</span>
          <span class="detail-value">{{ country.capital?.[0] || 'N/A' }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Country } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true,
  },
})
const imageLoaded = ref(false)
const imageError = ref(false)

// Format population with commas
const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population)
}

// Handle image load
const handleImageLoad = () => {
  imageLoaded.value = true
}

// Handle image error
const handleImageError = () => {
  imageError.value = true
  imageLoaded.value = true
}
</script>

<style scoped>
.country-card {
  display: block;
  background-color: var(--element-color);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all var(--transition-normal);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.country-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px var(--shadow-color);
}

.country-card:active {
  transform: translateY(-2px);
}

.country-flag {
  aspect-ratio: 4/3;
  overflow: hidden;
  background-color: var(--bg-color);
}

.flag-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition:
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.flag-image.loaded {
  opacity: 1;
}

.flag-image.error {
  display: none;
}

.country-card:hover .flag-image {
  transform: scale(1.05);
}

.flag-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--input-color);
  color: var(--text-color);
}

.flag-fallback svg {
  width: 48px;
  height: 48px;
}

.country-info {
  padding: var(--spacing-md);
}

.country-name {
  font-size: var(--font-size-detail);
  font-weight: var(--font-weight-bold);
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.country-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  color: var(--text-color);
  opacity: 0.8;
}

.detail-value {
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  color: var(--text-color);
  text-align: right;
}

/* Responsive adjustments */
@media (min-width: 640px) {
  .country-details {
    gap: var(--spacing-sm);
  }

  .detail-item {
    justify-content: flex-start;
    gap: var(--spacing-xs);
  }

  .detail-label {
    min-width: 80px;
  }

  .detail-value {
    text-align: left;
  }
}
</style>
