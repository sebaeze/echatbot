/*
*
*/
const path                        = require('path');
const webpack                     = require("webpack");
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin     = require('html-webpack-prefix-plugin') ;
const CompressionPlugin           = require('compression-webpack-plugin');
const BrotliPlugin                = require('brotli-webpack-plugin');
const APP_ID                      = require('./config.js').APP_ID ;
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
  /*
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
  */
 optimization: {
  runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "reactvendor"
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilityVendor"
        },
        antdVendor: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antdVendor"
        },
        vendor: {
           test: /[\\/]node_modules[\\/](!antd)(!lodash)(!moment)(!moment-timezone)[\\/]/,
        name: "vendor"
      },
      },
    },
  },
  plugins: [
      new CopyWebpackPlugin([{from: 'src/img',to: 'img'},{from: 'src/css',to: 'css'}]),
      new webpack.DefinePlugin({
        'process.env.AMBIENTE': JSON.stringify(process.env.AMBIENTE),
        'process.env.APP_ID': JSON.stringify( APP_ID.HOME ),
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
      new HtmlWebpackPrefixPlugin(),
      new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.7
        }),
        new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.7
        })
    ]
};
//