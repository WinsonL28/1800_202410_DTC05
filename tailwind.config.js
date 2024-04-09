/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'darkaqua': '#2f93a2',
        'realaqua': '#52CFE3',
        'navyblue': '#223B45',
        'realslate': '#DFDFDF',
        'realorange': '#FF9100'
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],

}

