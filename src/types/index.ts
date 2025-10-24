// TypeScript interfaces for REST Countries API v3.1

export interface Country {
  name: {
    common: string
    official: string
    nativeName?: { [key: string]: { official: string; common: string } }
  }
  flags: {
    png: string
    svg: string
  }
  population: number
  region: string
  subregion: string
  capital?: string[]
  tld?: string[]
  currencies?: { [key: string]: { name: string; symbol: string } }
  languages?: { [key: string]: string }
  borders?: string[]
  cca2: string
  cca3: string
}

export interface Currency {
  name: string
  symbol: string
}

export interface Language {
  name: string
}

// Filter and search interfaces
export interface CountryFilters {
  search: string
  region: string
  sortBy: 'name' | 'population'
  sortOrder: 'asc' | 'desc'
}

// API response types
export interface ApiResponse<T> {
  data: T
  loading: boolean
  error: string | null
}

// Theme types
export type Theme = 'light' | 'dark'

// URL query parameters
export interface QueryParams {
  search?: string
  region?: string
  sortBy?: string
  sortOrder?: string
}
