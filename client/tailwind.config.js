// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation:{
        bounce:'bounce 1s linear infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
