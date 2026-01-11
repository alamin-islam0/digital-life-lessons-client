/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enforcing the 3 primary brand colors limit + 1 neutral
        primary: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#59a2ff',
          500: '#2f7df8',
          600: '#155def',
          700: '#0B2C56', // Brand Navy
          800: '#0f3a6e',
          900: '#123259',
          950: '#0b2c56',
          DEFAULT: '#0B2C56', // Primary brand color (Navy from Logo)
        },
        secondary: {
          50: '#f0fdfc',
          100: '#ccfbf7',
          200: '#99f6ee',
          300: '#5eead4',
          400: '#32B2C9', // Brand Teal
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          DEFAULT: '#32B2C9', // Secondary brand color (Teal from Logo)
        },
        // Neutral scale
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0B2C56", // Navy
          "secondary": "#32B2C9", // Teal
          "accent": "#4FC3DC",
          "neutral": "#0f172a",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "info": "#32B2C9",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#32B2C9", // Use Teal as primary in dark mode for better visibility
          "secondary": "#0B2C56",
          "accent": "#4FC3DC",
          "neutral": "#e2e8f0",
          "base-100": "#020617", // Very dark navy/black background
          "base-200": "#0f172a",
          "base-300": "#1e293b",
          "info": "#32B2C9",
          "success": "#4ade80",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
}
