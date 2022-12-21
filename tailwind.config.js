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
      colors: {},
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
