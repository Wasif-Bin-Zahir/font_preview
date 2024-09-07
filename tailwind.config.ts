import type { Config } from 'tailwindcss'

const config: Config = {
   content: ['./src/**/*.{jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#f97b73',
            secondary: '#e4675f',
            tertiary: '#cf544c',
            dark: '#404040',
            light: '#ebebeb',
            ash: '#e3e2de'
         }
      }
   },
   plugins: []
}

export default config
