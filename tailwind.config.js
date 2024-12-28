/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ["Cabinet Grotesk", "sans-serif"],
        teko: ["Teko", "serif"],
      },
      backgroundColor: {
        lightPurple: "#4A4C6C",
        lightGreen: "#77794E",
      },
      borderColor: {
        lightPurpleStroke: "#7C7EA1",
        lightGreenStroke: "#9FA16D",
      },
    },
  },
  plugins: [],
};
