/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'realaqua': '#2f93a2',
        'darkeraqua': '#52CFE3',
        'realslate': '#223B45',
        'navyblue': '#DFDFDF',
        'realorange': '#FF9100'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],

}

