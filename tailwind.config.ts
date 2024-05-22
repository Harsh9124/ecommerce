import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0ch' },
          '50%': { width: '25ch' },  // Adjust '25ch' based on the length of your longest text
          '100%': { width: '0ch' },  // Erase the text
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
        },
      },
      animation: {
        typing: 'typing 4s steps(25,end) 1s infinite normal both, blink .7s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
