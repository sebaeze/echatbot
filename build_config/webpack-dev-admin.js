/*
*
*/
const path                        = require('path');
const webpack                     = require("webpack");
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin     = require('html-webpack-prefix-plugin') ;
const HASH_VERSION                = require('./defineHash').HASH_VERSION ;
console.log('Hash Version: ',HASH_VERSION,';');
//
module.exports = {
  entry: './src/mainAdmin.js',
  output: {
    filename: 'mainAdmin.js',
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
    open: true,
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
      new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", 'window.jQuery': 'jquery' }),
      new CopyWebpackPlugin([ {from: 'src/img',to: 'img'}, {from: 'src/css',to: 'css'}, {from: 'src/xls'} ]),
      new webpack.DefinePlugin({
        '__HASH_BUILD__': JSON.stringify(HASH_VERSION.hashVersion),
        '__URL_WIDGET__': JSON.stringify(HASH_VERSION.URLbackend),
        '__ID_WIDGET__': JSON.stringify(HASH_VERSION.IDwidget)
      }),
      new HtmlWebpackPlugin({
        __HASH_BUILD__: HASH_VERSION.hashVersion ,
        __URL_WIDGET__: HASH_VERSION.URLbackend ,
        __ID_WIDGET__: HASH_VERSION.IDwidget ,
        filename: "admin.html",
        template: "./src/admin.html",
        title:"admin",
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
      new webpack.DefinePlugin({ "BACKEND_URL":"http://localhost:3000" })
    ]
};
//