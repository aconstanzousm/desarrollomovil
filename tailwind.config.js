/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/index.tsx", "./components/**/*.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}",
"./app.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#49129C',
        secondary:{
          default:'#B40086',
          100:'#C51297',
          200:'#831266',
        },
        tertiary: '#EF2967'
      },

      fontFamily:{
        'work-black': [ 'WorkSans-Black', 'sans-serif' ], //Formato: Nombre para llamar a la fuente, fuente que quieres usar, fuente para fallback.
        'work-light': [ 'WorkSans-Light', 'sans-serif' ],
        'work-medium': [ 'WorkSans-Medium', 'sans-serif' ],
      }


    },
  },
  plugins: [],
}