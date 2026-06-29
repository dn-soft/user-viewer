/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        argong: {
          listen: '#3b82f6',
          read: '#22c55e',
          write: '#a855f7',
          speak: '#f59e0b',
          gold: '#eab308',
          book: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
