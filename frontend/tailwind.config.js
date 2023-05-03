/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1C1C27',
          light: '#363740',
        },
        white: {
          DEFAULT: '#FFFFFF',
          dimmed: {
            DEFAULT: 'rgba(255, 255, 255, 0.4)',
            heavy: 'rgba(255, 255, 255, 0.2)',
          },
        },
        red: '#EF4444',
        green: '#22C55E',
        yellow: '#FFB43A',
      },
    },
  },
  plugins: [],
};
 