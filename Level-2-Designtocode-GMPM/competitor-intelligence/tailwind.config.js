/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background:  '#0D1117',
        surface:     '#161B22',
        border:      '#30363D',
        primary:     '#E8450A',
        'primary-hover': '#FF5A1F',
        // Card-level tokens (from Figma — slightly deeper than surface)
        card:        '#16191F',
        'card-border': '#262B38',
        // Threat level colours (Figma exact values × 255)
        threat: {
          high: '#F24545',
          med:  '#FFA600',
          low:  '#33CC66',
        },
        // Text hierarchy
        'text-primary':   '#E6EDF3',
        'text-secondary': '#BFC4D1',
        'text-muted':     '#666E80',
        'text-dim':       '#A6ABB8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
