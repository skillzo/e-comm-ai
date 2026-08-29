

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#136dec",
        "background-light": "#f6f7f8",
        "background-dark": "#101822",
        "gray-light": "#f5f5f5",
        "text-light": "#111111",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};
