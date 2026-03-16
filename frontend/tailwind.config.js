/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0f766e",
        ink: "#0b132b",
        accent: "#ef4444",
        panel: "#f8fafc"
      },
      fontFamily: {
        sans: ["Space Grotesk", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 50px -25px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};