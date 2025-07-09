import { pxToRemMap } from './src/styles'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: pxToRemMap,
      spacing: pxToRemMap,
      borderWidth: pxToRemMap,
      borderRadius: pxToRemMap,
    },
  },
  plugins: [],
}
