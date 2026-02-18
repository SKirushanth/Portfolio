/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding the custom colors from your design
        darkBg: '#0a0a0a',
        accentOrange: '#f97316', 
      },
    },
  },
  plugins: [],
}