/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      fontFamily:{
        inter:['Inter','sans-serif']
      },
      colors: {
        'Primary_clr': '#B9ff66',
        'Secondary':'#191A23'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  // daisyui: {
  //   themes:true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  //   darkTheme: "light", // name of one of the included themes for dark mode
  //   base: true, // applies background color and foreground color for root element by default
  //   styled: true, // include daisyUI colors and design decisions for all components
  //   utils: true, // adds responsive and modifier utility classes
  //   prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  //   logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  //   themeRoot: ":root", // The element that receives theme color CSS variables
  // },
}

