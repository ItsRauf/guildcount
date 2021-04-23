const path = require("path");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: { path: path.resolve(__dirname, "dist"), filename: "index.js" },
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "src", "index.html"),
        path.resolve(__dirname, "src", "privacy-policy.md"),
      ],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin()],
  },
};
