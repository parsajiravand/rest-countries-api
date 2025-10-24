import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the Vue composition API
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn((fn) => fn()),
    watch: vi.fn(),
    ref: vi.fn((value) => ({ value })),
  }
})

// Mock DOM APIs
const mockSetAttribute = vi.fn()
const mockGetItem = vi.fn()
const mockSetItem = vi.fn()

Object.defineProperty(document, 'documentElement', {
  value: { setAttribute: mockSetAttribute },
  writable: true
})

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem
  },
  writable: true
})

// Import after mocking
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset document theme attribute
    mockSetAttribute.mockClear()
  })

  it('initializes with light theme by default', () => {
    mockGetItem.mockReturnValue(null)
    ;(window as any).matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })

    const { theme } = useTheme()

    expect(theme.value).toBe('light')
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'light')
    expect(mockSetItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('loads saved theme from localStorage', () => {
    mockGetItem.mockReturnValue('dark')

    const { theme } = useTheme()

    expect(theme.value).toBe('dark')
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'dark')
  })

  it('detects system dark mode preference', () => {
    mockGetItem.mockReturnValue(null)
    ;(window as any).matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })

    const { theme } = useTheme()

    expect(theme.value).toBe('dark')
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'dark')
  })

  it('toggles theme correctly', () => {
    mockGetItem.mockReturnValue('light')

    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('light')

    toggleTheme()

    expect(theme.value).toBe('dark')
    expect(mockSetAttribute).toHaveBeenLastCalledWith('data-theme', 'dark')
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'dark')
  })

  it('sets specific theme correctly', () => {
    const { theme, setTheme } = useTheme()

    setTheme('dark')

    expect(theme.value).toBe('dark')
    expect(mockSetAttribute).toHaveBeenLastCalledWith('data-theme', 'dark')
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'dark')
  })
})
