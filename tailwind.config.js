/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "oklch(var(--canvas) / <alpha-value>)",
        surface: "oklch(var(--surface) / <alpha-value>)",
        ink: "oklch(var(--ink) / <alpha-value>)",
        muted: "oklch(var(--muted) / <alpha-value>)",
        line: "oklch(var(--line) / <alpha-value>)",
        accent: "oklch(var(--accent) / <alpha-value>)",
        accentSoft: "oklch(var(--accent-soft) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 24px 60px -42px oklch(var(--ink) / 0.24)",
      },
    },
  },
  plugins: [],
};
