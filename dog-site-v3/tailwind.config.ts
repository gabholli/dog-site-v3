import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "clouds": "url('/clouds.jpg')",
        "dogBackground": "url('/Big Dog With Branch.jpg')"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        garamond: ["Garamond", "serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
