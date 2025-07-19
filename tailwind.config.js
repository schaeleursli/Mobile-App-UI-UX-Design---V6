export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A7E1',
          dark: '#0095C8',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F1116',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1C1E27',
        },
        text: {
          primary: {
            light: '#1F2937',
            dark: '#F4F4F4',
          },
          secondary: {
            light: '#6B7280',
            dark: '#9CA3AF',
          },
        },
        alert: {
          warning: '#F39C12',
          error: '#E83E8C',
        },
        border: {
          light: '#E5E7EB',
          dark: '#2A2C34',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
}