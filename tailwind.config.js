/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "background" : "#0E0E0E",
        "primary": "#2110E5",
        "secondary": "#262626",
        "tertiary": "#202020",
        "quaternary": "#131313",
      }
    },
  },
  plugins: [],
}
