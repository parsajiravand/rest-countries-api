# 🌍 REST Countries API

A modern, responsive web application built with Vue 3 and TypeScript that displays information about countries worldwide using the REST Countries API.

## ✨ Features

### Core Features
- **📱 Responsive Design**: Mobile-first design that works seamlessly on all devices
- **🌙 Dark/Light Mode**: Toggle between themes with persistent preferences
- **🔍 Advanced Search**: Fuzzy search with typo tolerance (e.g., "Grmany" → "Germany")
- **🌍 Region Filtering**: Filter countries by continent/region
- **📊 Sorting Options**: Sort by country name or population
- **🔗 URL State Management**: Share filtered views with URL parameters
- **⚡ Lazy Loading**: Optimized image loading with fade-in effects
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Country Information
- **🏳️ Flag Display**: High-quality country flags with error fallbacks
- **📈 Population Data**: Formatted population numbers
- **🌍 Geographic Info**: Region, subregion, and capital information
- **💰 Economic Data**: Currencies and exchange information
- **🗣️ Language Support**: Native and official languages
- **🔗 Border Countries**: Clickable navigation to neighboring countries

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/parsajiravand/rest-countries-api.git
   cd rest-countries-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🛠️ Technology Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties (CSS variables)
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Fuzzy Search**: Fuse.js
- **Icons**: Custom SVG icons

## 📁 Project Structure

```
src/
├── assets/           # Static assets and styles
├── components/       # Reusable Vue components
│   ├── CountryCard.vue     # Individual country display
│   ├── SearchBar.vue       # Search input component
│   ├── RegionFilter.vue    # Region dropdown filter
│   ├── SortControls.vue    # Sorting buttons
│   ├── ThemeToggle.vue     # Dark/light mode toggle
│   └── LoadingSpinner.vue  # Loading indicator
├── composables/      # Vue 3 Composition API functions
│   ├── useCountries.ts     # API calls and state management
│   ├── useTheme.ts         # Theme management
│   └── useUrlFilters.ts    # URL synchronization
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── views/            # Page components
│   ├── HomeView.vue        # Main countries listing
│   └── DetailView.vue      # Individual country details
├── router/           # Vue Router configuration
└── App.vue           # Root component
```

## 🎨 Theming

The application supports both light and dark themes with automatic system preference detection:

```css
/* Light theme (default) */
:root {
  --bg-color: hsl(0, 0%, 98%);
  --text-color: hsl(200, 15%, 8%);
  --element-color: hsl(0, 0%, 100%);
}

/* Dark theme */
[data-theme="dark"] {
  --bg-color: hsl(207, 26%, 17%);
  --text-color: hsl(0, 0%, 100%);
  --element-color: hsl(209, 23%, 22%);
}
```

## 🔧 Configuration

### API Configuration
The app uses the REST Countries API v2:
```typescript
const API_BASE_URL = 'https://restcountries.com/v2'
```

### Fuzzy Search Configuration
```typescript
const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'nativeName', weight: 0.3 },
    { name: 'capital', weight: 0.2 },
    { name: 'alpha3Code', weight: 0.1 }
  ]
}
```

## 🚀 Deployment

### Build Commands
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_BASE_URL=https://restcountries.com/v2

# App Configuration
VITE_APP_TITLE="REST Countries API"
VITE_APP_DESCRIPTION="A Vue.js application for exploring countries"
```

## 🌟 Bonus Features Implemented

✅ **Theme Toggle (No 3rd Party Libraries)**: Custom theme management with localStorage persistence
✅ **Fuzzy Search**: Typo-tolerant search using Fuse.js
✅ **Sorting Functionality**: Sort by name and population (ascending/descending)
✅ **URL Query Parameters**: Shareable filtered views
✅ **Lazy Loading**: Optimized image loading with loading states


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 API Reference

This project uses [REST Countries API v2](https://restcountries.com/#api-endpoints-v2):

### Endpoints Used
- `GET /all` - Fetch all countries
- `GET /region/{region}` - Fetch countries by region
- `GET /name/{name}` - Fetch country by name
- `GET /alpha?codes={codes}` - Fetch countries by border codes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [REST Countries](https://restcountries.com/) for the comprehensive country data API
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Fuse.js](https://fusejs.io/) for fuzzy search capabilities

---

Made with ❤️ using Vue 3, TypeScript, and modern web technologies.
