const sharedTheme = require('./src/themes/tailwind/tailwind.theme');
const { tailwindV3Colors } = require('./src/themes/shared/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      ...tailwindV3Colors,
    },
    fontFamily: {
      ...sharedTheme.fontFamily,
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
  ],
};
