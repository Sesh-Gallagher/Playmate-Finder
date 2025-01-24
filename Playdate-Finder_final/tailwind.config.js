/**
 * Defines the configuration object for the Tailwind CSS framework.
 * This object specifies the content files, theme settings, and plugins
 * to be used in the Tailwind CSS compilation process.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
