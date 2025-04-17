/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
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