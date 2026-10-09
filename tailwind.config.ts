import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e5ebe5',
          200: '#cbd7cb',
          300: '#a6bca6',
          400: '#7e9d7e',
          500: '#5e805e',
          600: '#496649',
          700: '#3c523c',
          800: '#324332',
          900: '#2a372a',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ecd9',
          300: '#ecddbf',
          400: '#e1c89f',
          500: '#d5b27e',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4eee5',
          200: '#e7dcce',
          300: '#d6c4b0',
          400: '#bfa48c',
          500: '#ab8b71',
          600: '#9b765e',
          700: '#815f4c',
          800: '#6a4e40',
          900: '#574136',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(20, 83, 45, 0.04), 0 1px 2px -1px rgba(20, 83, 45, 0.04)',
        nature: '0 4px 20px -2px rgba(22, 101, 52, 0.08), 0 2px 6px -1px rgba(22, 101, 52, 0.04)',
        'nature-lg': '0 10px 25px -3px rgba(22, 101, 52, 0.12), 0 4px 10px -2px rgba(22, 101, 52, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
