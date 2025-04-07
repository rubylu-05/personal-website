/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "#fffffb",
        "primary": "#145943",
        "secondary": "#af8b6a"
      }
    },
  },
  plugins: [],
}
