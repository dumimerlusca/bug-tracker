const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // secondary: colors.cyan,
        // primary: colors.teal
        primary: colors.cyan,
        secondary: colors.purple
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
