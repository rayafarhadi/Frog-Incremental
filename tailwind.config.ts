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
        "background-primary": "#19aece",
        "background-secondary": "#166e7a",
        "button-primary": "#0d9682",
        highlight: "#52c33f",
      },
      fontFamily: {
        action: ["action", "sans-serif"],
        actionbold: ["action-bold", "bold"],
      },
    },
  },
  plugins: [],
};
export default config;
