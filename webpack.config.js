// 这里声明的‘path’与下面的‘__dirname’拼接起来，成为绝对路径
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    // 声明入口文件
    //‘__dirname’ 代表当前文件所在目录地址，在这里也就是根目录
    entry: path.join(__dirname,'src/index.js'),  
    devServer: {
        contentBase: './dist',
        hot: true,
        // 端口号
        port: 9000
    },
    // 声明出口文件
    output:{
        // 输出文件名
        filename: 'bundle.js',
        // 输出文件的路径
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {test:/\.vue$/,loader: 'vue-loader'},
            {test:/\.jsx$/,loader: 'babel-loader'},
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        // 图片大小小于1024就转为base64,从而减少http请求
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    // 'vue-style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
                filename: `js/chunk-vendors.[contenthash].js`,
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial'
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    }
}