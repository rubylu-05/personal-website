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
        "body": ['Inter'],
        "heading": ['Work Sans']
      },
      fontWeight: {
        'extrabold': 700,
        'extralight': 200,
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
