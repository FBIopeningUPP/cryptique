    /** @type {import('tailwindcss').Config} */
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
              100: '#FBF7EE',  // Base background
              200: '#F4EBD9',  // Card surface
              300: '#E8DBBF',  // Card borders
              400: '#D5C29D',  // Subtle lines
              500: '#BAA276',
            },
            ink: {
              900: '#231B15',  // Deep antique ink (primary text)
              800: '#352B24',  // Headers
              700: '#4E4137',  // Body text
              500: '#7B6A5C',  // Faded subtitles / stamps
              300: '#B09E8F',  // Inactive text
            },
            gold: {
              DEFAULT: '#C59B4B',
              hover: '#D8AE5C',
              dark: '#936E2B',
            },
            rust: {
              DEFAULT: '#B2533E', // Wax seals / sealed locks
              hover: '#C7634D',
              dark: '#873B2B',
            },
            sage: {
              DEFAULT: '#6B8772', // Solved / verified badges
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
        },
      },
      plugins: [],
    }