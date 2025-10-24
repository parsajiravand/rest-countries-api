<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCountries } from '@/composables/useCountries'
import LoadingSpinner from '@/components/LoadingSpinner.vue'


const route = useRoute()
const router = useRouter()

// Composables
const {
  fetchCountryByName,
  fetchCountriesByCodes,
} = useCountries()

// Reactive state
const country = ref<any>(null)
const borderCountries = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Computed properties
const countryName = computed(() => route.params.name as string)

// Format data for display
const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population)
}

const formatCurrencies = (currencies: { [key: string]: { name: string; symbol: string } }): string => {
  if (!currencies) return 'N/A'
  return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
}

const formatLanguages = (languages: { [key: string]: string }): string => {
  if (!languages) return 'N/A'
  return Object.values(languages).join(', ')
}

// Load country data
const loadCountry = async () => {
  loading.value = true
  error.value = null

  try {
    const countryData = await fetchCountryByName(countryName.value)
    if (countryData) {
      country.value = countryData

      // Load border countries if they exist
      if (countryData.borders && countryData.borders.length > 0) {
        borderCountries.value = await fetchCountriesByCodes(countryData.borders)
      }
    } else {
      error.value = 'Country not found'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load country'
    console.error('Error loading country:', err)
  } finally {
    loading.value = false
  }
}

// Navigate to border country
const goToBorderCountry = (borderCountryName: string) => {
  router.push(`/country/${encodeURIComponent(borderCountryName)}`)
}

// Go back to previous page
const goBack = () => {
  router.go(-1)
}

// Load country on mount and when route changes
onMounted(() => {
  loadCountry()
})

// Watch for route changes
watch(() => route.params.name, () => {
  loadCountry()
})
</script>

<template>
  <div class="detail-view">
    <div class="container">
      <!-- Back Button -->
      <button @click="goBack" class="back-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading" :message="`Loading ${countryName}...`" />

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <h2>Country Not Found</h2>
        <p>{{ error }}</p>
        <button @click="goBack" class="back-button">
          Go Back
        </button>
      </div>

      <!-- Country Details -->
      <div v-else-if="country" class="country-details">
        <div class="country-header">
          <div class="country-flag-large">
            <img
              :src="country.flags.png"
              :alt="'Flag of ' + country.name.common"
            />
          </div>

          <div class="country-content">
            <h1 class="country-name">{{ country.name.common }}</h1>

            <div class="country-info-grid">
              <div class="info-column">
                <div class="info-item">
                  <span class="info-label">Native Name:</span>
                  <span class="info-value">{{ country.name.official }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Population:</span>
                  <span class="info-value">{{ formatPopulation(country.population) }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Region:</span>
                  <span class="info-value">{{ country.region }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Sub Region:</span>
                  <span class="info-value">{{ country.subregion }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Capital:</span>
                  <span class="info-value">{{ country.capital?.[0] || 'N/A' }}</span>
                </div>
              </div>

              <div class="info-column">
                <div class="info-item">
                  <span class="info-label">Top Level Domain:</span>
                  <span class="info-value">{{ country.tld?.join(', ') || 'N/A' }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Currencies:</span>
                  <span class="info-value">{{ formatCurrencies(country.currencies) }}</span>
                </div>

                <div class="info-item">
                  <span class="info-label">Languages:</span>
                  <span class="info-value">{{ formatLanguages(country.languages) }}</span>
                </div>
              </div>
            </div>

            <!-- Border Countries -->
            <div v-if="borderCountries.length > 0" class="border-countries">
              <h3 class="border-title">Border Countries:</h3>
              <div class="border-buttons">
                <button
                  v-for="borderCountry in borderCountries"
                  :key="borderCountry.cca3"
                  @click="goToBorderCountry(borderCountry.name.common)"
                  class="border-button"
                >
                  {{ borderCountry.name.common }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  padding-bottom: var(--spacing-xl);
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--element-color);
  color: var(--text-color);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-bottom: var(--spacing-xl);
  transition: all var(--transition-fast);
}

.back-button:hover {
  background-color: var(--bg-color);
  transform: translateY(-1px);
}

.back-button svg {
  width: 16px;
  height: 16px;
}

.error-state {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.error-state h2 {
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.country-details {
  background-color: var(--element-color);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px var(--shadow-color);
  overflow: hidden;
}

.country-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (min-width: 1024px) {
  .country-header {
    flex-direction: row;
    align-items: flex-start;
  }
}

.country-flag-large {
  flex-shrink: 0;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: var(--border-radius);
}

@media (min-width: 1024px) {
  .country-flag-large {
    width: 40%;
  }
}

.country-flag-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-content {
  flex: 1;
  margin-top: var(--spacing-lg);
}

@media (min-width: 1024px) {
  .country-content {
    padding-left: var(--spacing-lg);
  }
}

.country-name {
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

@media (min-width: 768px) {
  .country-name {
    font-size: 32px;
  }
}

.country-info-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 768px) {
  .country-info-grid {
    flex-direction: row;
    gap: var(--spacing-xl);
  }
}

.info-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

@media (min-width: 640px) {
  .info-item {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-sm);
  }
}

.info-label {
  font-weight: var(--font-weight-normal);
  color: var(--text-color);
  opacity: 0.8;
  min-width: 120px;
}

.info-value {
  font-weight: var(--font-weight-normal);
  color: var(--text-color);
}

.border-countries {
  margin-top: var(--spacing-lg);
}

.border-title {
  font-size: var(--font-size-detail);
  font-weight: var(--font-weight-bold);
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
}

.border-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.border-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--input-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-home);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.border-button:hover {
  background-color: var(--element-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px var(--shadow-color);
}
</style>
