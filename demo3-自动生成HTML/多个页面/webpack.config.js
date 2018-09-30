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
                    presets: [           //用于解析一组语法特性
                        [
                            "@babel/preset-env",       //包含当前所有 ECMAScript 标准里的最新特性
                            {
                                "targets": {   //指定需要兼容的浏览器类型和版本
                                    "browsers": [
                                        "> 1%",     //支持市场份额超过1％的浏览器。
                                        "ie >= 9"   //支持IE9以上的版本
                                    ]
                                }
                            }
                        ],
                        "@babel/preset-react"
                    ],
                    plugins: [         //用于解析某个语法特性
                        "@babel/plugin-proposal-object-rest-spread", //解析对象的扩展运算符（ES2018）
                        "@babel/plugin-proposal-export-default-from",  //解析额外的export语法
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-class-properties",   //解析class中的静态属性
                        "@babel/plugin-syntax-dynamic-import"         //解析import方法
                    ]
                }
            }

        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'template.html',  //模板文件
            filename:'A.html',       //生成的文件名
            chunks: ['A'],           //要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template:'template.html',
            filename:'B.html',
            chunks:['B'],
        }),
    ],
    devServer:{}   //开发服务器
};