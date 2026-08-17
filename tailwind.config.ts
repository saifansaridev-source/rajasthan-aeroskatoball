import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3D91', // Royal Blue
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#bad5ff',
          300: '#7cb5ff',
          400: '#388dff',
          500: '#0A3D91',
          600: '#083279',
          700: '#062661',
          800: '#041c49',
          900: '#031232',
        },
        secondary: {
          DEFAULT: '#F57C00', // Vibrant Orange
          50: '#fff8f0',
          100: '#ffeedb',
          200: '#ffd9b3',
          300: '#ffbc80',
          400: '#ff9847',
          500: '#F57C00',
          600: '#d96700',
          700: '#ad4e00',
          800: '#8c3f00',
          900: '#733500',
        },
        royal: '#0A3D91',
        orange: {
          brand: '#F57C00',
        },
        success: '#2E7D32',
        danger: '#D32F2F',
        surface: '#F5F7FA',
        saffron: {
          50: '#fff8f0',
          100: '#ffeedb',
          200: '#ffd9b3',
          300: '#ffbc80',
          400: '#ff9847',
          500: '#F57C00',
          600: '#d96700',
          700: '#ad4e00',
          800: '#8c3f00',
          900: '#733500',
        },
        navy: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#bad5ff',
          300: '#7cb5ff',
          400: '#388dff',
          500: '#0A3D91',
          600: '#083279',
          700: '#062661',
          800: '#041c49',
          900: '#031232',
          950: '#020b1f',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 61, 145, 0.12)',
        'glass-hover': '0 12px 40px 0 rgba(10, 61, 145, 0.2)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
