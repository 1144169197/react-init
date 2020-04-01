'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
var redux = require("redux")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: ['./src/index.js'],	//入口文件
		babel: ['babel-polyfill'], //babel-polyfill 和redux 单独打包减小app.js 的打包体积 用于配合externals
		redux: ['redux', 'react-redux'],
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath,
		libraryTarget: 'umd'	//用于外部引入的 react.js 等
	},
	resolve: {
		extensions: ['.js', '.json'],
		symlinks: false
	},
	// 配置全局使用
	plugins: [
		new webpack.ProvidePlugin({
			"React": "react",
			"ReactDOM": "react-dom",
			"_": "lodash",
			"classnames":"classnames"
		}),
		//extract css into its own file
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css')
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')],
				exclude:[resolve('node_modules')], 	//在node_modules的文件不被babel理会
				query: {
                    presets: ['react', 'stage-2']
                }
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]'),
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
			// {
            //     test: /\.less$/, 
            //     use: ExtractTextPlugin.extract({ use: extractCssLoaders, fallback: 'style-loader' }),
            // }
		]
	}
}
