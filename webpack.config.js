const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist folder
const HtmlWebpackPlugin = require("html-webpack-plugin"); // for html

module.exports = {
  entry: "./src/index.js", // main entry
  output: {
    path: path.join(__dirname + "/dist"), // path to build
    filename: "js/bundle.js", // output js file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // all js
        exclude: /node_modules/, // not node_modules
        use: {
          loader: "babel-loader", // babel for react and ES6 to ES5
        },
      },
      {
        test: /\.scss$/, // all scss
        use: [
          "style-loader", // loader for styles
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // loader for css
            options: {
              sourceMap: true, // create sourcemaps
            },
          },
          "postcss-loader", // postcss
          "sass-loader", // loader for scss to css
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
};
