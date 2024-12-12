/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "slate-teal": "#3a5054",
        bg: "#e7e3da",
        "pale-steel": "#51789e86",
        "blue-sage": "#4c627736",
        navy: "#0f3d66",
        focus: "#258de9",
        sun: "#fcd46a",
        amber: "#f8b319",
        charcoal: "rgba(71, 68, 68)",
      },
      boxShadow: {
        custom: "1px 1px 4px 1px rgba(71, 68, 68, 0.4)",
      },
    },
  },
  plugins: [],
};
