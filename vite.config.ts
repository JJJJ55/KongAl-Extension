/// <reference types="vitest" />
import path from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest.config.js'
import { name, version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    react(),
    crx({ manifest }),
    tailwindcss(),
    tsconfigPaths(),
    zip({ outDir: 'release', outFileName: `crx-${name}-${version}.zip` }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/test/vitest.setup.ts'],
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
