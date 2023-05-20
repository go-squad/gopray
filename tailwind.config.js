/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0px 0px 20px 0px #1f2b45',
      },
      colors: {
        // eslint-disable-next-line prettier/prettier
        orem: {
          50: '#ffeff2',
          100: '#ffe1e5',
          200: '#ffc7d2',
          300: '#ff9aac',
          400: '#ff6182',
          500: '#ff2b5c',
          600: '#f70748',
          700: '#d1003d',
          800: '#a70238',
          900: '#950639',
          950: '#54001a',
          500.18: '#ff2b5c2e',
        },
      },
    },
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [],
};
