/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#050707',
        graphite: '#111616',
        panel: '#151b1b',
        lime: '#d7ff28',
        moss: '#8da26f',
        blue: '#008dff',
      },
      boxShadow: {
        glow: '0 0 36px rgba(215, 255, 40, 0.22)',
        hard: '0 28px 80px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        display: ['Rajdhani', 'Orbitron', 'Arial Narrow', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
