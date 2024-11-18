/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 4px 35px 0px rgba(168, 172, 176, 0.3)",
      },
    },
  },
  plugins: [],
};
