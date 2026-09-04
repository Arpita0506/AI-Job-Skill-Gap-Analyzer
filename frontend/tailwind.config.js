/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#090d16',
          card: '#111726',
          cardHover: '#182035',
          border: '#1f293d',
          borderLight: '#2e3d5b',
          primary: '#8b5cf6',
          primaryHover: '#7c3aed',
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
