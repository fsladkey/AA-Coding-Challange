const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./frontend/main.js",
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "bundle.js"
  },
  devtool: 'source-map'
};
