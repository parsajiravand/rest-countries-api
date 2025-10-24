import { describe, it, expect } from 'vitest'
import { formatPopulation, formatCurrencies, formatLanguages } from '../formatters'

describe('formatPopulation', () => {
  it('formats population numbers correctly', () => {
    expect(formatPopulation(1000)).toBe('1,000')
    expect(formatPopulation(1234567)).toBe('1,234,567')
    expect(formatPopulation(0)).toBe('0')
    expect(formatPopulation(1000000)).toBe('1,000,000')
  })

  it('handles edge cases', () => {
    expect(formatPopulation(NaN)).toBe('0')
    expect(formatPopulation(Infinity)).toBe('0')
    expect(formatPopulation(-1000)).toBe('-1,000')
  })
})

describe('formatCurrencies', () => {
  it('formats currency objects correctly', () => {
    const currencies = {
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' }
    }
    expect(formatCurrencies(currencies)).toBe('US Dollar ($), Euro (€)')
  })

  it('handles empty objects', () => {
    expect(formatCurrencies(null as any)).toBe('N/A')
    expect(formatCurrencies(undefined as any)).toBe('N/A')
  })

  it('handles single currency', () => {
    const currencies = { JPY: { name: 'Yen', symbol: '¥' } }
    expect(formatCurrencies(currencies)).toBe('Yen (¥)')
  })
})

describe('formatLanguages', () => {
  it('formats language objects correctly', () => {
    const languages = {
      eng: 'English',
      spa: 'Spanish'
    }
    expect(formatLanguages(languages)).toBe('English, Spanish')
  })

  it('handles empty objects', () => {
    expect(formatLanguages(null as any)).toBe('N/A')
    expect(formatLanguages(undefined as any)).toBe('N/A')
  })

  it('handles single language', () => {
    const languages = { fra: 'French' }
    expect(formatLanguages(languages)).toBe('French')
  })
})
