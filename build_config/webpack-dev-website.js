/*
*
*/
const path                        = require('path');
const webpack                     = require("webpack");
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin     = require('html-webpack-prefix-plugin') ;
const APP_ID                      = require('./config.js').APP_ID ;
const ASSET_PATH                  = process.env.ASSET_PATH || '/';
//
// import { HASH_VERSION }      from './defineHash' ;
const HASH_VERSION                = require('./defineHash').HASH_VERSION ;
console.log('Hash Version: ',HASH_VERSION,';');
//
module.exports = {
  entry: './src/mainApp.js',
  output: {
    filename: 'mainApp.js',
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
        //loader: 'url-loader?limit=false'
        // Muy importante indicar la direccion para buscar por nombre "/" indica que busca en directorio raiz
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
  devServer: {
    port: 9000,
    // open: true,
    hot: true,
    host: '0.0.0.0',
    proxy: {
        "/": "http://localhost:3000"
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  },
  plugins: [
      new CopyWebpackPlugin([ {from: 'src/img',to: 'img'}, {from: 'src/css',to: 'css'}, {from: 'src/xls'} ]),
      new HtmlWebpackPlugin({
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
      new webpack.DefinePlugin({
        'process.env.AMBIENTE': JSON.stringify(process.env.AMBIENTE),
        'process.env.APP_ID': JSON.stringify( APP_ID.HOME ),
        '__HASH_BUILD__': JSON.stringify(HASH_VERSION.hashVersion),
        '__URL_WIDGET__': JSON.stringify(HASH_VERSION.URLbackend),
        '__ID_WIDGET__': JSON.stringify(HASH_VERSION.IDwidget)
      }),
      new webpack.DefinePlugin({ "BACKEND_URL":"http://localhost:3000" })
    ]
};
//