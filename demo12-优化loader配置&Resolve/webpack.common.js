const path=require("path");
const webpack = require('webpack');
const { AutoWebPlugin } = require('web-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const autoWebPlugin = new AutoWebPlugin('./src/pages', {
    template: './template.html', // HTML 模版文件所在的文件路径
    htmlMinify: true  //压缩生成的HTML代码
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
        rules: [
            {
                test: /\.js$/,    //使用正则匹配所有需要使用babel-loader的文件
                use: {
                    loader: "babel-loader",  //指明要使用的loader
                    options: {               //传入loader的参数
                        presets: [           //用于解析ES6+React
                            [
                                "env",
                                {modules: false}  //关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                            ],
                            "react"
                        ]
                    }
                },
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,    //style-loader改用MiniCssExtractPlugin
                    'css-loader',
                    'sass-loader',
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                        fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                        outputPath: 'images',     //图片输出路径
                    }
                }],
                include: path.resolve(__dirname, 'src','assets')
            },

        ]
    },
    plugins: [
        autoWebPlugin,
        new MiniCssExtractPlugin({
            filename:  '[name].css'  //同output.filename
        }),
    ],
    resolve:{
        alias:{
            'assets': path.resolve(__dirname, 'src','assets')   //把导入语句里的 assets 关键字替换成 xx/src/assets/
        },
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['js'],
    }
};

