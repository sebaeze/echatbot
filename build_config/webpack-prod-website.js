/*
*
*/
const path                        = require('path');
const webpack                     = require("webpack");
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin     = require('html-webpack-prefix-plugin') ;
//
let tempURLbackend = process.env.AMBIENTE=="produccion" ? "https://www.waiboc.com:3001" : "http://localhost:3001" ;
let tempIDwidget   = process.env.AMBIENTE=="produccion" ? "5dc1e10a0038b92890d5b851"    : "5dc0d60400935d306ebd489d"    ;
console.log('tempURLbackend: '+tempURLbackend+'. tempIDwidget: '+tempIDwidget+' \n\n') ;
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
      new webpack.ProvidePlugin({$: "jquery",jQuery: "jquery",'window.jQuery': 'jquery'}),
      new CopyWebpackPlugin([{from: 'src/img',to: 'img'},{from: 'src/css',to: 'css'}]),
      new webpack.DefinePlugin({
        '__URL_WIDGET__': JSON.stringify(tempURLbackend),
        '__ID_WIDGET__': JSON.stringify(tempIDwidget)
      }),
      new HtmlWebpackPlugin({
        __URL_WIDGET__: tempURLbackend,
        __ID_WIDGET__: tempIDwidget,
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