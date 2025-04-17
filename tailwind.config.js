/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#ffffff",
        "primary": "#000000",
        "secondary": "#909bad"
      },
      fontFamily: {
        "body": ['DM Mono'],
        "heading": ['DM Mono']
      },
      fontWeight: {
        'light': 300,
        'extralight': 200,
      },
      fontSize: {
        'xl': '22px'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
