/*
*
*/
const path                        = require('path');
const webpack                     = require("webpack");
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin     = require('html-webpack-prefix-plugin') ;
//
const HASH_VERSION                = require('./defineHash').HASH_VERSION ;
console.log('Hash Version: ',HASH_VERSION,';');
//
module.exports = {
  entry: './src/mainApp.js',
  output: {
    filename: 'mainApp.js',
    path: path.join(__dirname, '../dist')
  },
  module:{
	   rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=/[name].[ext]',
     },
     {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        },
      ]
     }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx','.css'],
    modules: [ path.join(__dirname,'../node_modules') ]
  },
  resolveLoader: {
    modules: [ path.join(__dirname,'../node_modules') ]
  },
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
  },
  plugins: [
      new CopyWebpackPlugin([{from: 'src/img',to: 'img'},{from: 'src/css',to: 'css'}]),
      new webpack.DefinePlugin({
        '__HASH_BUILD__': JSON.stringify(HASH_VERSION.hashVersion),
        '__URL_WIDGET__': JSON.stringify(HASH_VERSION.URLbackend),
        '__ID_WIDGET__': JSON.stringify(HASH_VERSION.IDwidget)
      }),
      new HtmlWebpackPlugin({
        __HASH_BUILD__: HASH_VERSION.hashVersion ,
        __URL_WIDGET__: HASH_VERSION.URLbackend ,
        __ID_WIDGET__: HASH_VERSION.IDwidget ,
        filename: "app.html",
        template: "./src/app.html",
        title:"app",
        inject: true,
        prefix: '/',
        minify:{
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        hash:true
      }),
      new HtmlWebpackPrefixPlugin()
    ]
};
//