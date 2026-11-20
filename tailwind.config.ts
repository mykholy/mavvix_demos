import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domains/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mavvix: {
          navy: '#08132D',
          blue: '#1667F5',
          teal: '#0BBFC7',
          snow: '#F8FAFC',
        },
        construction: {
          ink: '#162327',
          surface: '#F2EFE9',
          accent: '#D26A3B',
          secondary: '#667F7B',
          paper: '#FFFFFF',
        },
        industrial: {
          ink: '#12243C',
          surface: '#F4F6F6',
          accent: '#DE9E37',
          secondary: '#4E697C',
          paper: '#FFFFFF',
        },
        realestate: {
          ink: '#25312D',
          surface: '#F5F0E6',
          accent: '#A8764F',
          secondary: '#7B8272',
          paper: '#FFFDF8',
        },
        dental: {
          ink: '#182B2A',
          surface: '#F1F6F4',
          accent: '#2A8E7D',
          secondary: '#6C8581',
          paper: '#FFFFFF',
        },
        ecommerce: {
          ink: '#1A1918',
          surface: '#F6F4EE',
          accent: '#9E472A',
          secondary: '#766E65',
          paper: '#FFFFFF',
        },
        portfolio: {
          ink: '#0D0F12',
          surface: '#F2F4F8',
          accent: '#3B82F6',
          secondary: '#64748B',
          paper: '#FFFFFF',
        },
        restaurant: {
          ink: '#221611',
          surface: '#FAF5ED',
          accent: '#C65D23',
          secondary: '#7C5D4B',
          paper: '#FFFFFF',
        },
        academy: {
          ink: '#0F172A',
          surface: '#F1F5F9',
          accent: '#4F46E5',
          secondary: '#64748B',
          paper: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

