const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  target: 'node',
  mode: 'none',
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
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, './dist'),
  //   port: 80, //TODO use 443 with HTTPS
  //   hot: true
  // }
}