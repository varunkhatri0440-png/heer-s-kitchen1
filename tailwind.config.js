/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        foreground: "#f4f4f5",
        brand: {
          50: "#fbf8f3",
          100: "#f5eee4",
          200: "#e9dac5",
          300: "#d9be9e",
          400: "#c79e72",
          500: "#b98350",
          600: "#aa6e43",
          700: "#8e5737",
          800: "#734631",
          900: "#5e3a2b",
          gold: "#c5a880",
          accent: "#38bdf8",
        },
        surface: {
          100: "rgba(255, 255, 255, 0.03)",
          200: "rgba(255, 255, 255, 0.06)",
          300: "rgba(255, 255, 255, 0.1)",
          glass: "rgba(18, 18, 22, 0.75)",
          border: "rgba(255, 255, 255, 0.12)",
        }
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Outfit", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
