const path=require("path");
const { AutoWebPlugin } = require('web-webpack-plugin');
const webpack = require('webpack');


const autoWebPlugin = new AutoWebPlugin('src', {
    template: './template.html', // HTML 模版文件所在的文件路径
});

module.exports={
    // AutoWebPlugin 会为寻找到的所有单页应用，生成对应的入口配置，
    // autoWebPlugin.entry 方法可以获取到所有由 autoWebPlugin 生成的入口配置
    entry: autoWebPlugin.entry({
        // 这里可以加入你额外需要的 Chunk 入口
    }),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'  //[name]代表chunk名称
    },
    module: {
        rules: [{
            test: /\.js$/,    //使用正则匹配所有需要使用babel-loader的文件
            use: {
                loader: "babel-loader",  //指明要使用的loader
                options: {               //传入loader的参数
                    presets: ["env","react"] //用于解析ES6+React
                }
            }

        }]
    },
    plugins: [
        autoWebPlugin,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        hot: true,                 //开启模块热替换
        contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
        headers: {'X-foo':'bar'},  //在 HTTP 响应中注入一些 HTTP 响应头
        host: '0.0.0.0',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
        port: 3000,                //DevServer 服务监听的端口，默认8080
        https: false,              //是否使用HTTPS服务
        open: true                 //自动打开网页
    },
};

