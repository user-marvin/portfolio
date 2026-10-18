import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        edge: "rgb(var(--edge) / <alpha-value>)",
        "edge-strong": "rgb(var(--edge-strong) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // Used by the TrackJob demo on the projects section.
      keyframes: {
        "demo-arrive": { from: { opacity: "0", transform: "translateX(-24px) scale(.98)" }, to: { opacity: "1", transform: "none" } },
        "demo-rise": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        "demo-pulse": { "0%, 100%": { opacity: ".35" }, "50%": { opacity: "1" } },
      },
      animation: {
        "demo-arrive": "demo-arrive .55s cubic-bezier(.2,.8,.2,1)",
        "demo-rise": "demo-rise .4s ease-out both",
        "demo-pulse": "demo-pulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
