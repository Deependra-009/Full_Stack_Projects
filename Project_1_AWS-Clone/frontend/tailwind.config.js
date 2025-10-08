/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aws-orange': '#FF9900',
        'aws-blue': '#232F3E',
        'aws-light-blue': '#146EB4',
        'aws-gray': '#F2F3F3',
        'aws-dark-gray': '#545B64',
      },
      fontFamily: {
        'aws': ['Amazon Ember', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
