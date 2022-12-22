/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./styles/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#1098FF",
          400: "#1098FF",
          500: "#1098FF",
          600: "#1098FF",
          700: "#1098FF",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
