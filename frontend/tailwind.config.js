/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#020617",
        deepslate: "#0F172A",
        "amber-signal": "#F59E0B",
        "verity-green": "#10B981",
        brand: "#F59E0B", // Map generic colors if any legacy styles rely on it
        accent: "#F59E0B"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"]
      },
      boxShadow: {
        soft: "0 20px 50px -25px rgba(15, 23, 42, 0.35)",
        "hard-glow-amber": "0 0 10px rgba(245, 158, 11, 0.15)",
        "hard-glow-green": "0 0 10px rgba(16, 185, 129, 0.15)",
        "hard-glow-slate": "0 0 10px rgba(148, 163, 184, 0.1)"
      }
    }
  },
  plugins: []
};