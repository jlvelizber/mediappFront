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
        // status appointment colors
        status: {
          pending: {
            DEFAULT: "#fefce8", // yellow-50
            text: "#854d0e",    // yellow-800
            border: "#fef3c7",  // yellow-200
          },
          completed: {
            DEFAULT: "#ecfdf5", // emerald-50
            text: "#065f46",    // emerald-800
            border: "#d1fae5",  // emerald-200
          },
          cancelled: {
            DEFAULT: "#fff1f2", // rose-50
            text: "#b91c1c",    // rose-700
            border: "#fecaca",  // rose-200
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
