var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
      filename: '[name].bundle.js'
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
            use: ["style-loader",'css-loader', 'sass-loader'],
            test: /\.(css|scss)$/,
            exclude: exclude_from_webpack
        },
        {
          use: 'file-loader?name=fonts/[name].[ext]',
          test: /\.(eot|ttf|woff|woff2|otf)$/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              collapseWhitespace: false
          },
          hash: false
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {from: __dirname + '/src/css/img', to: __dirname + '/dist/img'}
      ])
    ]
  }
}
