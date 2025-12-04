/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ["Cabinet Grotesk", "sans-serif"],
        cabinetMedium: ["Cabinet Grotesk Medium", "sans-serif"],
        teko: ["Teko", "serif"],
        tiktok: ["TikTok Sans", "sans-serif"]
      },
      backgroundColor: {
        lightPurple: "#4A4C6C",
        lightGreen: "#77794E",
        blacky: "#333333",
      },
      borderColor: {
        lightPurpleStroke: "#7C7EA1",
        lightGreenStroke: "#9FA16D",
        grayLine: "#F5F3EE",
        grayStroke: "rgba(47, 47, 38, 0.3)",
      },
      letterSpacing: {
        wideaf: ".15em",
      },
    },
  },
  plugins: [],
};
