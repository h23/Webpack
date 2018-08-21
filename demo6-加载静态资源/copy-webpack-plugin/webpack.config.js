const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
    entry:{                   //多入口使用对象形式配置，chunk名称为key值
        A: './src/pages/A/A.js',
        B: './src/pages/B/B.js',
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
                                "env",       //包含当前所有 ECMAScript 标准里的最新特性
                                {
                                    "targets": {   //指定需要兼容的浏览器类型和版本
                                        "browsers": [
                                            "> 1%",     //支持市场份额超过1％的浏览器。
                                            "ie >= 9"   //支持IE9以上的版本
                                        ]
                                    }
                                }
                            ],
                            "react"
                        ],
                        plugins: [         //用于解析某个语法特性
                            "transform-object-rest-spread", //解析对象的扩展运算符（ES2018）
                            "transform-export-extensions",  //解析额外的export语法
                            "transform-class-properties",   //解析class中的静态属性
                            "syntax-dynamic-import"         //解析import方法
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
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                        fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                        outputPath: 'images',     //图片输出路径
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                        fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                        outputPath: 'fonts',      //字体输出路径
                    }
                }]
            },
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
        new OpenBrowserPlugin({ url: 'http://192.168.1.87:3000/A.html' }), //开启服务后，自动打开的地址
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname, 'src/assets/public'),  //将此目录下的文件
            to:'./public'                                       //输出到此目录，相对于output的path目录
        }]),
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