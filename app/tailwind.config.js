/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundPosition: {
      "auth-position": "top left, bottom right",
    },
    minHeight: {
      app: "calc(100vh - 60px)",
    },
    extend: {
      backgroundImage: {
        "auth-pattern": "url('/vector-7.svg'), url('/vector-6.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
