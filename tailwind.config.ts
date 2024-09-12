import type { Config } from 'tailwindcss'

const config: Config = {
   content: ['./src/**/*.{jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            dark: '#404040'
         }
      }
   },
   plugins: []
}

export default config
