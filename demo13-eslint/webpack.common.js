const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["env",{modules: false}],
                                "react"
                            ]
                        }
                    },
                    "eslint-loader"          //先使用eslint-loader处理后，在由babel-loader转换
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,   //style-loader改用MiniCssExtractPlugin
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|woff|tff|)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                            fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                            outputPath: 'images',     //图片输出路径
                        }
                    },
                    'image-webpack-loader'        //压缩图片
                ],
                include: path.resolve(__dirname, 'src','assets')
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            chunks: ['A','common','vendor'],           //要引入的chunk
            filename:'A.html',       //生成的文件名
            template:'template.html',  //模板文件
            minify:{                   //压缩输出
                collapseWhitespace:true   //折叠空白区域
            }
        }),
        new HtmlWebpackPlugin({
            chunks:['B','common','vendor'],
            filename:'B.html',
            template:'template.html'
        }),
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname, 'src/assets/public'),  //将此目录下的文件
            to:'./public'                                       //输出到此目录，相对于output的path目录
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",    //同output.filename
        }),
    ],
    resolve: {
        // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js'],
        alias:{
            'assets': path.resolve(__dirname, 'src/assets')   //把导入语句里的 assets 关键字替换成 根目录/src/assets/
        }
    },
};