const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  target: 'node',
  // node: {
    // process: false,
    // Buffer: false,
    // require: false,
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 80 //TODO use 443 with HTTPS
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['source-map-loader']
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        }
      }
    ]
  },
  externals: {
    express: 'express',
    // express: require('express'),
  }
}