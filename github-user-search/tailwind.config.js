/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#7C3AED",
        primary: "#121826",
        muted: "#94A3B8",
      },
      borderRadius: {
        xl: "1rem",
      },
    }
,
  },
  plugins: [],
}

