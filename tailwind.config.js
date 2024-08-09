/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#656ED3',
        'darkBlue':"#300370"}
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

