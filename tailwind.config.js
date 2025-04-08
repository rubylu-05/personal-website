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
        "light2": "#f4ebe3",
        "primary": "#145943",
        "secondary": "#af8b6a"
      },
      fontFamily: {
        "body": ['Source Sans 3'],
        "heading": ['Fjalla One']
      },
      fontWeight: {
        'extrabold': 800,
      },
    },
  },
  plugins: [],
}
