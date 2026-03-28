import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mintGreen: "#1D9E75",
        warmWhite: "#FAFAF9",
        rosePink: "#D4537E",
        deepPlum: "#72243E",
        warmAmber: "#EF9F27",
        nightBlue: "#0D1B2A",
        nightSurface: "#1A2A3A",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
