/** @type {import('tailwindcss').Config} */
import { blackA, mauve, violet } from '@radix-ui/colors';
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '10px',
      },
      boxShadow: {
        glow: '0px 0px 20px 0px #1f2b45',
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
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
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [],
};
