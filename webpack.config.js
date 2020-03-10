const path = require('path');

module.exports = {
  entry: 'mongooseConnector.js',
  output: {
    path: path.resolve('lib'),
    filename: 'mongooseConnector.js',
    libraryTarget: 'commonjs2',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
  externals: {
    mongoose: 'mongoose'
  },
};
