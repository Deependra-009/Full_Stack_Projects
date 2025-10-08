/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      borderWidth: {
        '2': '2px',
      },
      colors: {
        'black': '#000000',
      },
      borderColor: {
        '2-black': '#000000', // Custom class combining border-2 and border-black
      },
      backgroundImage:{
        'login':"url('/assets/Images/BG.jpeg')",
        'home-bg-image':"url('/assets/Images/home_bg_image.png')",
        'bg-img':"url('/assets/Images/img.png')",
        'bg-jacket':"url('/assets/Images/jacket.png')",
        'bg-ads':"url('/assets/Images/homepage/hnw1.png')"
      },
      fontFamily:{
        'font1':['Roboto Slab', 'serif'],
        'font2':['Circular Std']
      },
      screens: {
        'mobile':'200px',

        'tablet': '450px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      backgroundSize: {
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
}