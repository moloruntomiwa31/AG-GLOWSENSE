/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        serif: ['Poppins', 'serif'],
        mono: ['CustomMono', 'monospace'],
      },
      screens: {
        'sm': '410px',
        'md': '768px',
        'lg': '1000px'
      }
    },
  },
  plugins: [],
}

