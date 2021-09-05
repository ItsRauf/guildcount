module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        blurple: "#5865F2",
        notQuiteBlack: "#23272A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
