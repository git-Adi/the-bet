/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0a0a0f",
        rose: "#e11d48",
        blush: "#f472b6",
        plum: "#7c3aed",
      },
      boxShadow: {
        glow: "0 0 40px rgba(225, 29, 72, 0.35)",
        soft: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
