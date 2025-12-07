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
          cyan: '#00FFFF',
          fuchsia: '#FF00FF',
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
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-hover': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
      aspectRatio: {
        'card': '16 / 9',
        'square': '1 / 1',
      },
      animation: {
        'brutal-shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-8px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(8px, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
}

