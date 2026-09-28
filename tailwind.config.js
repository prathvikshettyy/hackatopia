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
        gov: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          850: '#141E33',
          900: '#0F172A',
          950: '#0A0F1D',
        },
        navy: {
          950: '#070C18',
          900: '#0B1326',
          850: '#0F1B35',
          800: '#152445',
          700: '#1E335C',
        },
        brand: {
          blue: '#1D4ED8',
          lightBlue: '#2563EB',
          sky: '#0284C7',
          steel: '#38BDF8',
          emerald: '#059669',
          amber: '#D97706',
          crimson: '#DC2626',
          slate: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
        'gov-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
        'gov-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
        'gov-card': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
