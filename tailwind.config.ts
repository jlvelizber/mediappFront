import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6", // Medical blue
        secondary: "#00B4D8", // Soft blue
        background: "#F8F9FA", // Light gray background
        accent: "#90E0EF", // Light cyan for highlights
        dark: "#023E8A", // Darker blue for contrast
        text: "#333333", // Dark text for readability
      },
    },
  },
  plugins: [],
} satisfies Config;
