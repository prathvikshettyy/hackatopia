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
        navy: {
          950: '#030712',
          900: '#070C18',
          850: '#0B1120',
          800: '#0F172A',
          750: '#15213D',
          700: '#1E293B',
          600: '#334155',
        },
        cyber: {
          cyan: '#00F0FF',
          blue: '#38BDF8',
          teal: '#14B8A6',
          purple: '#A855F7',
          violet: '#8B5CF6',
          pink: '#F43F5E',
          amber: '#F59E0B',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.25)',
        'glow-purple': '0 0 20px -3px rgba(168, 85, 247, 0.25)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'glow-rose': '0 0 20px -3px rgba(244, 63, 94, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scan 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
