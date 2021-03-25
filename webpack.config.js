const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "littlemodal.js",
    //library: "$",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-private-methods"],
              ["@babel/plugin-proposal-class-properties"]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        /*парсинг лоадеров идет с права на лево*/
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ]
      }
    ],
  },
  mode: "development",
}