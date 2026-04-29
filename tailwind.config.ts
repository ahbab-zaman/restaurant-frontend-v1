import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // ── Brand palette ──────────────────────────────────────────────
        "nav-bg": "#FCFBFA",          // navbar / card surface
        "site-bg": "#F7F5F3",         // whole-website background
        "brand-btn": "#473729",       // primary button background
        "brand-text": "#EFEAE9",      // light text on dark surfaces

        // Semantic aliases (useful for dark-mode overrides via CSS vars)
        brand: {
          50:  "#FCFBFA",
          100: "#F7F5F3",
          200: "#EDE8E3",
          300: "#D4C8BC",
          400: "#B8A898",
          500: "#8C7A6B",
          600: "#6B5847",
          700: "#473729",   // ← primary button / dark accent
          800: "#2E2218",
          900: "#1A120D",
        },
      },

      fontFamily: {
        // Elegant serif for headings; clean sans for body
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:    ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;