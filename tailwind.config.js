/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#ffca08',
        customP: '#aaaaaa',
        customAccordionColor: '#5b5748',
        customGray: '#1e1e1e',
        formBg: '#1C1601',
      },

      maxHeight: {
        '0': '0px',
      },

      screens: {
        '500px': { 'max': '500px'},
      }
    },
  },
  plugins: [],
}

