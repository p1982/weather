import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/api/mappers/weather-mapper.ts',
        'src/api/geo-service.ts',
        'src/api/interceptors.ts',
        'src/i18n/settings.ts',
        'src/middleware.ts',
        'src/schemas/schema-city-search.ts',
        'src/store/city-store/city-store.tsx',
        'src/store/weather-store/weather-store.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
