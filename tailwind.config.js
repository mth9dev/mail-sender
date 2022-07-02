/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts,scss}",
    ],
    theme: {
      screens : {
        xs: '425px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px'
    },
      extend: {},
    },
    plugins: [],
  }
  