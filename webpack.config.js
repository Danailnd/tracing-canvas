const path = require("path");

module.exports = {
  entry: "./src/index.js", // Adjust according to your entry file
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "tracing-canvas.js", // Adjust according to your output file name
    library: "TracingCanvas",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
};
