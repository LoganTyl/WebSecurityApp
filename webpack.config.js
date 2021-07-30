const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
  function(_env, argv){
      const isProduction = argv.mode === "production";
      const isDevelopment = !isProduction;

      return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: "./src/index.js",
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "assets/js/[name].[contenthash:8].js",
          publicPath: "/"
        }
      };
  },
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    overlay: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 80 //TODO use 443 with HTTPS
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
          test: /\.css$/,
          use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader'
          ]
      },
      {
        "test": /\.jsx?$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: "static/media/[name].[hash:8].[ext]"
            }
        }
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      },
      {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve('file-loader'),
          options: {
              name: "static/edia/[name].[hash:8].[ext]"
          }
      }
    ]
  },
  resolve: {
      extensions: [".js", ".jsx"]
  },
  plugins: [
      isProduction && new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].css',
          chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
      }),
      new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(
              isProduction ? "production" : "development"
          )
      }),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public/index.html"),
          inject: true
      })
  ].filter(Boolean),
  optimization: {
      minimize: isProduction,
      minimizer: [
          new TerserWebpackPlugin({
              terserOptions: {
                  compress: {
                      comparisons: false
                  },
                  mangle: {
                      safari10: true
                  },
                  output: {
                      comments: false,
                      ascii_only: true
                  },
                  warnings: false
              }
          }),
          new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name(module, chunks, cacheGroupKey) {
                    const packageName = module.content.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                    )[1];
                    return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                }
            },
            common: {
                minChunks: 2,
                priority: -10
            }
        }
      },
      runtimeChunk: "single"
  }
}