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
        "closeiToBlack": "#151515",
        "closeishToBlack": "#1E1E1E",
        "lessCloseToBlack": "#232323",
        "consoleGreen": "#5BD821",
        "button_green_dark": "#006200",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
}

