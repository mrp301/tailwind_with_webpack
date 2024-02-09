const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DIST_PATH = "dist/";

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, DIST_PATH),
    filename: "main.js",
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 3000,
  },
  target: "web",
};
