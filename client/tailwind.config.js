const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // primary: colors.blueGray,
        // secondary: colors.trueGray
        primary: colors.blue,
        secondary: colors.violet
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
