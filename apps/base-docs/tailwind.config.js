import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./vocs.config.{js,ts,jsx,tsx}",
    "./sidebar.{js,ts}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'home-hero': '1220px',
      'overview-hero': '1360px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['CoinbaseSans', ...defaultTheme.fontFamily.sans],
        mono: ['CoinbaseMono', ...defaultTheme.fontFamily.mono],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}