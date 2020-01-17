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
//
const HASH_VERSION                = require('./defineHash').HASH_VERSION ;
console.log('Hash Version: ',HASH_VERSION,';');
//
const mySpecialWindowFunction = () => {
    /* START HACK */
    if (!process.env.BROWSER) {
      global.window = {}; // Temporarily define window for server-side
    }
    /* END HACK */
    return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
} ;
//
module.exports = {
  entry: './src/mainAppSSR.js',
  output: {
    filename: 'mainAppSSR.js',
    path: path.join(__dirname, '../dist') ,
    libraryTarget: "umd",
    globalObject: "this",
  },
  module:{
	   rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader?compact=false", query: {compact: false}
        /*
        use: {
          loader: "babel-loader?compact=false", query: {compact: false}
        }
        */
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
  plugins: [
      new CopyWebpackPlugin([{from: 'src/img',to: 'img'},{from: 'src/css',to: 'css'}]),
      /*
      new webpack.DefinePlugin({
        '__HASH_BUILD__': JSON.stringify(HASH_VERSION.hashVersion),
        '__URL_WIDGET__': JSON.stringify(HASH_VERSION.URLbackend),
        '__ID_WIDGET__': JSON.stringify(HASH_VERSION.IDwidget)
      }),
      new HtmlWebpackPlugin({
        __HASH_BUILD__: HASH_VERSION.hashVersion ,
        __URL_WIDGET__: HASH_VERSION.URLbackend ,
        __ID_WIDGET__: HASH_VERSION.IDwidget ,
        filename: "appSSR.html",
        template: "./src/app.html",
        title:"appSSR",
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
      */
      new webpack.DefinePlugin({
        'process.env.BROWSER': JSON.stringify(true) ,
        window: {
            matchMedia:
        }
      }) ,
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