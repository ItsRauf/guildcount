module.exports = {
  purge: ["./src/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        blurple: "#7289DA",
        notQuiteBlack: "#23272A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
