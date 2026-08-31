/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brutal: {
          yellow: "#FFDE59",
          pink: "#FF6EC7",
          blue: "#4D9DE0",
          black: "#000000",
        },
      },
      boxShadow: {
        brutal: "8px 8px 0px 0px rgba(0,0,0,1)",
        "brutal-sm": "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-lg": "12px 12px 0px 0px rgba(0,0,0,1)",
      },
    },
  },
  plugins: [],
};
