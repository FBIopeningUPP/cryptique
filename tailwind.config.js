export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FBF7EE',
          200: '#F4EBD9',
          300: '#E8DBBF',
          400: '#D5C29D',
          500: '#BAA276',
        },
        ink: {
          900: '#231B15',
          800: '#352B24',
          700: '#4E4137',
          500: '#7B6A5C',
          300: '#B09E8F',
        },
        gold: {
          DEFAULT: '#C59B4B',
          hover: '#D8AE5C',
          dark: '#936E2B',
        },
        rust: {
          DEFAULT: '#B2533E',
          hover: '#C7634D',
          dark: '#873B2B',
        },
        sage: {
          DEFAULT: '#6B8772',
          light: '#88A38F',
          dark: '#4F6855',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Outfit', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'parchment': '0 4px 20px -2px rgba(35, 27, 21, 0.08), 0 2px 6px -1px rgba(35, 27, 21, 0.04)',
        'seal': '0 4px 12px rgba(178, 83, 62, 0.35)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 50%, 90%': { transform: 'translateX(-4px)' },
          '30%, 70%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'shake': 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
