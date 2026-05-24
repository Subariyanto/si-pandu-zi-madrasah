/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kemenag: {
          green: '#166534',
          'green-light': '#16a34a',
          gold: '#d97706',
          'gold-light': '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
