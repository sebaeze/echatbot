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
const { CleanWebpackPlugin }      = require('clean-webpack-plugin') ;
// const BundleAnalyzerPlugin        = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//
const APP_AMBIENTES               = require('./config.js').APP_AMBIENTES ;
const APP_ID                      = require('./config.js').APP_ID ;
const ASSET_PATH                  = process.env.ASSET_PATH || '/';
//
// Solo para analizar chunks::
// process.env.AMBIENTE = APP_AMBIENTES.PRODUCCION ;
//
const HASH_VERSION                = require('./defineHash').HASH_VERSION ;
let hashType                      = process.env.AMBIENTE==APP_AMBIENTES.PRODUCCION ? '.[contenthash]' : '' ;
console.log('Hash Version: ',HASH_VERSION,';');
//
module.exports = {
  entry: './src/mainApp.js',
  output: {
    filename: `waiboc.home${hashType}.js`,
    path: path.join(__dirname, '../dist'),
    publicPath: ASSET_PATH
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
    moduleIds: 'hashed',
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "vendorReact"
          },
          utilityVendor: {
            test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
            name: "VendorUtility"
          },
          antdVendor: {
            test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
            name: "vendorAntd"
          },
          waibocWidget: {
            test: /[\\/]node_modules[\\/](waiboc-widget-react)[\\/]/,
            name: "waibocWidget"
          } ,
          vendor: {
            test: /[\\/]node_modules[\\/](!react)(!react-dom)(!antd)(!lodash)(!moment)(!moment-timezone)(!waiboc-widget-react)[\\/]/,
          name: "vendor"
        },
      },
    },
  },
  plugins: [
      new CleanWebpackPlugin(),
      // new BundleAnalyzerPlugin() ,
      //{  verbose: true, ['../dist'] }),
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
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5
      }),
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