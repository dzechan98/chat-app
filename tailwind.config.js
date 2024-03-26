/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7269ef",
        "primary-opacity": "#7269ef1a",
        light: "#fff",
        dark: "#000",
        error: "#ef476f",
        "light-100": "#f7f7ff",
        "light-200": "#ccc",
        "light-300": "#f8f9fa",
        "light-400": "#e6ebf5",
        "main-100": "#343a40",
        "main-200": "#7a7f9a",
      },
    },
  },
  plugins: [],
};
