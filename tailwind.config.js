/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
          green: '#00FF00',
          orange: '#FF6600',
          red: '#FF0000',
        },
      },
      borderWidth: {
        'brutal': '6px',
        'brutal-thick': '8px',
      },
      fontFamily: {
        brutal: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        brutal: '900',
      },
      borderRadius: {
        'brutal': '0px',
        'brutal-sm': '4px',
      },
    },
  },
  plugins: [],
}

