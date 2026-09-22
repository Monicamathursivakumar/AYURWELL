/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f2',
          100: '#e5ede0',
          200: '#cbdcc1',
          300: '#a7c497',
          400: '#7fa76c',
          500: '#5e8a4c',
          600: '#496e3b',
          700: '#3a5730',
          800: '#304629',
          900: '#293c24',
        },
        turmeric: {
          50: '#fff8ec',
          100: '#ffedc9',
          200: '#ffda92',
          300: '#ffc158',
          400: '#ffa72e',
          500: '#fa8912',
          600: '#de680a',
          700: '#b8490c',
          800: '#943a10',
          900: '#7a3110',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
