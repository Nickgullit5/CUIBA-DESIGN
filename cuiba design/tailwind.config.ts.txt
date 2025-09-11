import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#1C1C1C',
        snow: '#FFFFFF',
        fog:  '#F2F2F2',
        wood: { light: '#C69C6D', dark: '#8C6239' },
        sea:  '#007F7F'
      }
    }
  },
  plugins: []
}
export default config
