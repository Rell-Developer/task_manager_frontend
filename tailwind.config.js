/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        color1: "#2E5007",
        color2: "#4DA1A9",
        color3: "#79D7BE",
        color4: "#F6F4F0"
      }
    },
  },
  plugins: [],
}

