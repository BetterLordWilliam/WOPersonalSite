/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "closeToBlack": "#0E0C0A",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
}

