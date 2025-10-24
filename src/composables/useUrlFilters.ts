import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { CountryFilters } from '@/types'

export const useUrlFilters = (filters: { value: CountryFilters }) => {
  const route = useRoute()
  const router = useRouter()

  // Update URL when filters change
  const updateUrl = () => {
    const query: Record<string, string> = {}

    if (filters.value.search) {
      query.search = filters.value.search
    }

    if (filters.value.region) {
      query.region = filters.value.region
    }

    if (filters.value.sortBy !== 'name') {
      query.sortBy = filters.value.sortBy
    }

    if (filters.value.sortOrder !== 'asc') {
      query.sortOrder = filters.value.sortOrder
    }

    // Update URL without triggering navigation
    router.replace({
      path: route.path,
      query: Object.keys(query).length > 0 ? query : {}
    })
  }

  // Parse URL query parameters and update filters
  const parseUrlAndUpdateFilters = () => {
    const query = route.query

    const newFilters: CountryFilters = {
      search: (query.search as string) || '',
      region: (query.region as string) || '',
      sortBy: (query.sortBy as 'name' | 'population') || 'name',
      sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
    }

    // Only update if filters are actually different to avoid infinite loops
    if (
      newFilters.search !== filters.value.search ||
      newFilters.region !== filters.value.region ||
      newFilters.sortBy !== filters.value.sortBy ||
      newFilters.sortOrder !== filters.value.sortOrder
    ) {
      filters.value = newFilters
    }
  }

  // Watch for filter changes and update URL
  watch(
    () => filters.value,
    () => {
      updateUrl()
    },
    { deep: true }
  )

  // Watch for route changes and update filters
  watch(
    () => route.query,
    () => {
      parseUrlAndUpdateFilters()
    },
    { immediate: true }
  )

  // Initialize filters from URL on mount
  onMounted(() => {
    parseUrlAndUpdateFilters()
  })

  return {
    updateUrl,
    parseUrlAndUpdateFilters
  }
}
