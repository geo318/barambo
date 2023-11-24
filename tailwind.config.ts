import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '5/3': '5/3',
        '2/1': '2/1',
      },
      colors: {
        primary: '#040404',
        secondary: '#5A5A5A',
        'light-brown': '#FBF6F2',
        'dark-brown': '#31261D',
        'gold-light': '#FBF6F2',
        gray: '#D9D9D9',
        gold: '#BD9C64',
      },
      screens: {
        '3xl': '1920px',
      },
      maxWidth: {
        layout: '120rem',
      },
    },
  },
  plugins: [],
}
export default config
