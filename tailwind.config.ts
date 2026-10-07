import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1040px" } },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
      },
      fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        ping: { "75%, 100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        rise: "rise .7s cubic-bezier(.2,.7,.2,1) both",
        "ping-slow": "ping 2.4s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
