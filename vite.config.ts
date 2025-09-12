/// <reference types="vitest" />

import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import zip from 'vite-plugin-zip-pack'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest.config.js'
import { name, version } from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    react(),
    svgr(),
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
