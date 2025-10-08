/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login':"url('/assets/Images/BG.jpeg')",
        'home-bg-image':"url('/assets/Images/home_bg_image.png')",
        'bg-img':"url('/assets/Images/img.png')",
        'bg-jacket':"url('/assets/Images/jacket.png')",
        'bg-ads':"url('/assets/Images/homepage/hnw1.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
