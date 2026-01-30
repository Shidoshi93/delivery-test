/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          dark: '#E55D00',
          light: '#FF8533'
        },
        background: {
          DEFAULT: '#F5F1E8',
          card: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
