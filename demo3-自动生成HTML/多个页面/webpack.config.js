const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{                   //多入口使用对象形式配置，chunk名称为key值
        A: './src/A/A.js',
        B: './src/B/B.js',
    },
    output:{                   //出口配置
        filename:'[name].bundle.js',  //多入口打包输出多出口时，filename不能是固定的；[name]代表chunk名称
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
        new HtmlWebpackPlugin({
            chunks: ['A'],           //要引入的chunk
            filename:'A.html',       //生成的文件名
            template:'template.html',  //模板文件
        }),
        new HtmlWebpackPlugin({
            chunks:['B'],
            filename:'B.html',
            template:'template.html'
        }),
    ],
    devServer:{}   //开发服务器
};