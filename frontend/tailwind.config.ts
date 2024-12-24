import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-blue": "var(--dark-blue)",
        "light-blue": "var(--light-blue)",
        "light-blue-disabled": "var(--light-blue-disabled)",
        "light-blue-textarea": "var(--light-blue-textarea)",
        "light-gray": "var(--light-gray)",
        "dark-gray": "var(--dark-gray)",
        "light-red": "var(--light-red)",
        "dark-red": "var(--dark-red)",
        "light-green": "var(--light-green)",
        "dark-green": "var(--dark-green)",
        "light-yellow": "var(--light-yellow)",
        "dark-yellow": "var(--dark-yellow)",
        "light-orange": "var(--light-orange)",
        "dark-orange": "var(--dark-orange)",
      },
      fontFamily: {
        noto: ["var(--font-noto)"],
        bitter: ["var(--font-bitter)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
