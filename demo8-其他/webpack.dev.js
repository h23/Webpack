const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://192.168.1.87:3000/A.html' }), //开启服务后，自动打开的地址
    ],
    devServer:{
        hot: true,                 //开启模块热替换
        contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
        headers: {'X-foo':'bar'},  //在 HTTP 响应中注入一些 HTTP 响应头
        host: '0.0.0.0',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
        port: 3000,                //DevServer 服务监听的端口，默认8080
        https: false,              //是否使用HTTPS服务
        open: false                 //自动打开网页
    },
    devtool: "cheap-module-eval-source-map"
});
