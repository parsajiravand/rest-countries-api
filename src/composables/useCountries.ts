import { ref, computed } from 'vue'
import axios from 'axios'
import Fuse from 'fuse.js'
import type { Country, CountryFilters } from '@/types'

const API_BASE_URL = 'https://restcountries.com/v3.1'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Fuzzy search configuration
const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
  keys: [
    { name: 'name.common', weight: 0.4 },
    { name: 'name.official', weight: 0.3 },
    { name: 'capital', weight: 0.2 },
    { name: 'cca3', weight: 0.1 }
  ]
}

export const useCountries = () => {
  // Reactive state
  const countries = ref<Country[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<CountryFilters>({
    search: '',
    region: '',
    sortBy: 'name',
    sortOrder: 'asc'
  })

  // Computed properties
  const filteredCountries = computed(() => {
    let filtered = [...countries.value]

    // Apply region filter first (more efficient)
    if (filters.value.region) {
      filtered = filtered.filter(country =>
        country.region === filters.value.region
      )
    }

    // Apply search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.trim()

      if (searchTerm.length > 0) {
        // Use fuzzy search for better results (handles typos like "Grmany" -> "Germany")
        const fuse = new Fuse(filtered, fuseOptions)
        const searchResults = fuse.search(searchTerm)

        // Extract countries from search results and sort by score (relevance)
        filtered = searchResults
          .sort((a, b) => (a.score || 0) - (b.score || 0))
          .map(result => result.item)
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const { sortBy, sortOrder } = filters.value
      let comparison = 0

      if (sortBy === 'name') {
        comparison = a.name.common.localeCompare(b.name.common)
      } else if (sortBy === 'population') {
        comparison = a.population - b.population
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  })

  // API Methods
  const fetchAllCountries = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const fields = 'name,capital,region,subregion,population,flags,languages,currencies'
      const response = await api.get<Country[]>(`/all?fields=${fields}`)
      countries.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch countries'
      console.error('Error fetching countries:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCountriesByRegion = async (region: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const fields = 'name,capital,region,subregion,population,flags,languages,currencies'
      const response = await api.get<Country[]>(`/region/${region}?fields=${fields}`)
      countries.value = response.data
      filters.value.region = region
    } catch (err) {
      error.value = err instanceof Error ? err.message : `Failed to fetch countries from ${region}`
      console.error(`Error fetching countries from ${region}:`, err)
    } finally {
      loading.value = false
    }
  }

  const fetchCountryByName = async (name: string): Promise<Country | null> => {
    error.value = null

    try {
      const fields = 'name,capital,region,subregion,population,flags,languages,currencies'
      const response = await api.get<Country[]>(`/name/${encodeURIComponent(name)}?fields=${fields}`)
      return response.data[0] || null
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return null
      }
      error.value = err instanceof Error ? err.message : `Failed to fetch country: ${name}`
      console.error(`Error fetching country ${name}:`, err)
      return null
    }
  }

  const fetchCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
    if (codes.length === 0) return []

    error.value = null

    try {
      const codesString = codes.join(',')
      const fields = 'name,capital,region,subregion,population,flags,languages,currencies'
      const response = await api.get<Country[]>(`/alpha?codes=${codesString}&fields=${fields}`)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch border countries'
      console.error('Error fetching border countries:', err)
      return []
    }
  }

  // Filter methods
  const setSearchFilter = (search: string) => {
    filters.value.search = search
  }

  const setRegionFilter = (region: string) => {
    filters.value.region = region
    if (region) {
      fetchCountriesByRegion(region)
    } else {
      fetchAllCountries()
    }
  }

  const setSorting = (sortBy: 'name' | 'population', sortOrder: 'asc' | 'desc' = 'asc') => {
    filters.value.sortBy = sortBy
    filters.value.sortOrder = sortOrder
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      region: '',
      sortBy: 'name',
      sortOrder: 'asc'
    }
    fetchAllCountries()
  }

  // Utility methods
  const getRegions = () => {
    const regions = [...new Set(countries.value.map(country => country.region))]
    return regions.filter(region => region).sort()
  }

  const getCountryByCode = (code: string): Country | undefined => {
    return countries.value.find(country =>
      country.cca2 === code ||
      country.cca3 === code
    )
  }

  return {
    // State
    countries,
    loading,
    error,
    filters,

    // Computed
    filteredCountries,

    // API methods
    fetchAllCountries,
    fetchCountriesByRegion,
    fetchCountryByName,
    fetchCountriesByCodes,

    // Filter methods
    setSearchFilter,
    setRegionFilter,
    setSorting,
    clearFilters,

    // Utility methods
    getRegions,
    getCountryByCode
  }
}
