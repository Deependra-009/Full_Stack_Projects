/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'logo-img':"url('/public/Images/profile/profile.jpeg')"
      }
    },
  },
  plugins: [],
}