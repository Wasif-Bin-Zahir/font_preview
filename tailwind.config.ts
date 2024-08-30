import type { Config } from 'tailwindcss'

const config: Config = {
   content: ['./src/**/*.{jsx,tsx}'],
   theme: {},
   plugins: [require('daisyui')],
   daisyui: {
      themes: ['light'] // Enforce light theme
   }
}

export default config
