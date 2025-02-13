import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:{
          100: "#edf2ff",
          200: "#dbe4ff",
          300: "#bac8ff",
          400: "#91a7ff",
          500: "#748ffc",
          600: "#5c7cfa",
          700: "#4c6ef5",
          800: "#4263eb",
          900: "#3b5bdb",
          1000: "#364fc7",
        },
        secondary: {
          100: "#f4fce3",
          200: "#e9fac8",
          300: "#d8f5a2",
          400: "#c0eb75",
          500: "#a9e34b",
          600: "#94d82d",
          700: "#82c91e",
          800: "#74b816",
          900: "#66a80f",
          1000: "#5c940d",
        },
        tertiary:{
          100: "#f8f9fa",
          200: "#f1f3f5",
          300: "#e9ecef",
          400: "#dee2e6",
          500: "#ced4da",
          600: "#adb5bd",
          700: "#868e96",
          800: "#495057",
          900: "#343a40",
          1000: "#212529",
        }
      },
    },
    
  },
  types: ["node", "jest", "@testing-library/jest-dom"],

  plugins: [],
};
export default config;
