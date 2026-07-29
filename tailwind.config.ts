import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff9ed',
          100: '#fef0d6',
          200: '#fde0ad',
          300: '#fcc979',
          400: '#faaa43',
          500: '#F58220', // Main Saffron Accent
          600: '#e56715',
          700: '#be4d12',
          800: '#973c16',
          900: '#7a3316',
        },
        navy: {
          50: '#f0f4f9',
          100: '#dce5f1',
          200: '#bfd1e6',
          300: '#94b3d5',
          400: '#638fc0',
          500: '#3d6ea9',
          600: '#2b548d',
          700: '#1E3A8A', // Main Federation Navy
          800: '#172e6f',
          900: '#0A2540', // Deep Dark Navy
          950: '#06172a',
        },
        tricolor: {
          green: '#138808',
          white: '#FFFFFF',
          navy: '#000080',
          saffron: '#FF9933',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
