import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--primary))",
        layout: "rgba(var(--sidebar))",
        overlay: "rgba(0,0,0,0.5)",
        light: "#fff",
        error: "#ef476f",
        "main-100": "rgba(var(--main-100))",
        "main-200": "rgba(var(--main-200))",
        "main-300": "rgba(var(--main-300))",
        "main-400": "rgba(var(--main-400))",
        "light-200": "#ccc",
      },
      textShadow: {
        sm: "0 1px 2px rgba(var(--primary))",
        DEFAULT: "0 2px 4px rgba(var(--primary))",
        lg: "0 4px 8px rgba(var(--primary))",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
