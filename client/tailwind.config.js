/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base color
        base: "#DE9C62",

        // Accent colors
        "accent-darkest": "#FAE694",
        "accent-light": "#E1BF4B",
        accent: "#FF9C79",
        "accent-dark": "#D8B390",
        "accent-lightest": "#FDF8F2",

        // Darker accent colors
        "dark-accent-light": "#9D2C40",
        "dark-accent": "#554738",
        "dark-accent-dark": "#D8B390",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
  ],
};
