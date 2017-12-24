var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {

  const exclude_from_webpack = [
    /node_modules/
  ];
  return {
    entry: {
      bundle: ['./src/index.js']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.[hash].js'
    },
    stats: 'errors-only',
    devtool: 'source-map',
    devServer: {
      port: 8000,
      inline: true,
      hot: true,
      open: true,
      overlay: false,
      stats: 'errors-only'
    },
    resolve: {
      extensions: ['.js']
    },
    module:{
      rules:[
        {
          loader: 'babel-loader',
          test: /\.(js|jsx)$/,
          exclude: exclude_from_webpack
        },
        {
          test: /\.(jpe?g|png|gifs|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 40000}
                },
                'image-webpack-loader'
            ]
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader', 'sass-loader']
          }),
          exclude: exclude_from_webpack
        },
        {
          use: 'file-loader?name=fonts/[name].[ext]',
          test: /\.(eot|ttf|woff|woff2|otf)$/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*']),
      new ExtractTextPlugin({
          filename: "styles.[contenthash].css",
          allChunks: false
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              collapseWhitespace: true
          },
          hash: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {from: __dirname + '/src/css/img', to: __dirname + '/dist/img'}
      ])
    ]
  }
}
