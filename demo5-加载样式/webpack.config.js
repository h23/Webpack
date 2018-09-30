const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
        rules: [
            {
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
            },
            {
                test: /\.css$/,    //使用正则匹配所有需要使用此loader的文件
                use: [             //先由css-loader处理后，在交给style-loader处理
                    'style-loader',
                    {
                        loader:'css-loader',
                        // options:{           //传入css-loader的参数
                        //     minimize:true,  //是否压缩css代码
                        //     module:true     //是否使用css module
                        // }
                    }
                ]
            },
            {
                test: /\.scss$/,    //使用正则匹配所有需要使用此loader的文件
                use: ['style-loader','css-loader', 'sass-loader']  //处理顺序:sass-loader->css-loader->style-loader
            }
        ]
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
        new webpack.HotModuleReplacementPlugin(),  //启用 HMR
        new OpenBrowserPlugin({ url: 'http://192.168.1.87:3000/A.html' })  //开启服务后，自动打开的地址
    ],
    devServer:{
        hot: true,                 //开启模块热替换
        contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
        headers: {'X-foo':'bar'},  //在 HTTP 响应中注入一些 HTTP 响应头
        host: '0.0.0.0',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
        port: 3000,                //DevServer 服务监听的端口，默认8080
        https: false,              //是否使用HTTPS服务
        // open: true                 //自动打开网页
    },
};