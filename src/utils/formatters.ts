/**
 * Format a number as a localized population string
 * @param population - The population number to format
 * @returns Formatted population string with commas
 */
export const formatPopulation = (population: number): string => {
  if (typeof population !== 'number' || isNaN(population) || !isFinite(population)) {
    return '0'
  }
  return new Intl.NumberFormat('en-US').format(population)
}

/**
 * Format currency information for display (v3.1 API)
 * @param currencies - Object with currency codes as keys
 * @returns Formatted currency string
 */
export const formatCurrencies = (currencies: { [key: string]: { name: string; symbol: string } }): string => {
  if (!currencies || Object.keys(currencies).length === 0) return 'N/A'
  return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
}

/**
 * Format language information for display (v3.1 API)
 * @param languages - Object with language codes as keys
 * @returns Formatted languages string
 */
export const formatLanguages = (languages: { [key: string]: string }): string => {
  if (!languages || Object.keys(languages).length === 0) return 'N/A'
  return Object.values(languages).join(', ')
}
