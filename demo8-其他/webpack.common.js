const path=require("path");
const { AutoWebPlugin } = require('web-webpack-plugin');
const webpack = require('webpack');

const autoWebPlugin = new AutoWebPlugin('./src/pages', {
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
        rules: [
            {
                test: /\.js$/,    //使用正则匹配所有需要使用babel-loader的文件
                use: {
                    loader: "babel-loader",  //指明要使用的loader
                    options: {               //传入loader的参数
                        presets: ["env","react"] //用于解析ES6+React
                    }
                }
            },
            {
                test: /\.css$/,    //使用正则匹配所有需要使用此loader的文件
                use: [             //先由css-loader处理后，在交给style-loader处理
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{           //传入css-loader的参数
                            minimize:true,  //是否压缩css代码
                            module:true     //是否使用css module
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,    //使用正则匹配所有需要使用此loader的文件
                use: ['style-loader','css-loader','sass-loader']  //处理顺序:sass-loader->css-loader->style-loader
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
                }]
            },

        ]
    },
    plugins: [
        autoWebPlugin,
    ],
};

