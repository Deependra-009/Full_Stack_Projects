/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html', './node_modules/flowbite/**/*.js',
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bg-card-img':'url("https://i.imgur.com/kGkSg1v.png")',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}