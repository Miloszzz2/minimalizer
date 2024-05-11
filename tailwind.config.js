/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "./popup.html"],
  theme: {
    extend: {
      fontFamily:{
        'sans':["'Poppins', sans-serif"]
      }
    },
  },
  plugins: [require('daisyui'),],
}

