# webpack4-vue-loader-tudo
[基于慕课网《Vue+Webpack打造todo应用视频踩坑之从webpack3升级webpack4》](https://www.imooc.com/video/16402)<br> 
最近在学vue的ssr的视频教学课程，奈何还有一个前置课程，就是当前这个webpack配置教程了。蛋疼的是学习过程中发现作者视频中使用的所有环境版本都与当下最新版本不匹配。很多操作都不尽相同。于是照着作者的思路一路踩坑走过，总算学完，遂将踩坑经验以做记录，方便日后翻阅以及遇到同样困惑的同学作为参考；<br>
# 使用方法
安装
```
https://github.com/dcrysg/webpack4-vue-loader-tudo.git
```
进入项目目录，运行 
```
npm i

```
运行 
```
npm start
```
打包 
```
npm run build
```
# 踩坑记录
## 2-1 vue+loader+webpack项目配置（解决报错）<br>
1、npm i webpack vue vue-loader之后warn提示需要安装css-loader依赖
```
npm i css-loader
```
2、webpack4版本需要安装webpack-cli，根据提示安装就行<br>
3、在webpack.config.js中配置开发模式
```
mode: 'development'
```
4、缺少VueloDelpLuin，在vue官网照着加上
<br>https://vue-loader.vuejs.org/zh/migrating.html<br>
5、安装vue-template-compiler
```
npm i vue-template-compiler
```
6、差了css的loader配置。那么在webpack.config.js中加上
```
{test:/\.css$/,use:['vue-style-loader','css-loader']}
```
## 2-3 webpack-dev-server的配置和使用<br>
这一节课，因为新版本差别较大，所以我没有跟着教程敲，而是通过视频理解了作者大致的思路，然后根据webpack官方文档进行配置。整理为以下几点<br>
### 1、配置webpack-dev-server（实时重新加载）
安装webpack-dev-server插件 
```
npm i webpack-dev-server
```
然后在webpack.config.js中添加devserver配置
```
devServer: {
    contentBase: './dist',
},
```
最后在package.json里面添加配置
```
"start": "webpack-dev-server --open",
```
### 2、配置HtmlWebpackPlugin（个人理解为解析html文件）
安装html-webpack-plugin插件
```
npm i html-webpack-plugin
```
配置webpack.config.js文件
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
    title: 'Output Management'
}),
```
从现在开始就是通过npm start命令运行项目了
```
npm start
```
### 2、启用模块热替换（HMR）
没啥好说的，跟着官方文档配置就行<br>
才发现md格式的文档，写起来真不习惯呀。。那教程就写到这里先，如果有人看再继续写剩下的，没人看就不写了。
