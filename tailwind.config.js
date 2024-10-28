/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#4A90E2',      // Primary color
        'light-gray': '#F5F5F5',     // Background color
        'white': '#FFFFFF',           // Sidebar background
        'dark-gray': '#333333',       // Text color
        'light-blue': '#D9EFFF',      // Secondary color like for hovers
        'soft-red': '#E94B35',        // Error/Alert color
      },
    },
  },
  plugins: [],
};
