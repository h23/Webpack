const path=require("path");
const { WebPlugin } = require('web-webpack-plugin');

module.exports={
    entry:'./src/main.js',     //入口文件
    output:{                   //出口配置
        filename: 'bundle.js', //出口文件名
        path: path.resolve(__dirname, 'dist')  //出口文件路径
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
    plugins:[
        new WebPlugin({
            filename: 'index.html',         //生成的HTML文件名
            template: './src/template.html',    //使用的模板
        }),
    ],
    devServer:{}   //开发服务器
};