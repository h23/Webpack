const path=require("path");
const { WebPlugin } = require('web-webpack-plugin');

module.exports={
    entry:{
        A:'./src/A.js',     //每个入口以及其依赖的所有module形成一个chunk，chunk名=属性名
        B:'./src/B.js'
    },
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
        new WebPlugin({
            filename: 'index.html',         //生成的HTML文件名
            template: './src/template.html',    //使用的模板
            requires: ['A', 'B'],           //自动引入的JS文件，chunk名称
        }),
    ],
    devServer:{}   //开发服务器
};