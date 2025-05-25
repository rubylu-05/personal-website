/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        background2: '#f2f2f2',
        primary: '#000000',
        secondary: '#9c9c9c',
        darkBackground: '#1e342e',
        darkBackground2: '#28423c',
        darkPrimary: '#e5f0cc',
        darkSecondary: '#af8b6c',
      },
      fontFamily: {
        body: ['DM Mono'],
        heading: ['DM Mono'],
      },
      fontWeight: {
        light: 300,
        extralight: 200,
      },
      fontSize: {
        xl: '22px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
