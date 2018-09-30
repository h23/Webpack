const path=require("path");

module.exports={
    entry:'./src/main.js',     // 入口文件
    output:{                   // 出口配置
        filename: 'bundle.js', // 出口文件名
        path: path.resolve(__dirname, 'dist')  // 出口文件路径
    },
    module: {
        rules: [{
            test: /\.js$/,    // 使用正则匹配所有需要使用babel-loader的文件
            use: {
                loader: "babel-loader",  // 指明要使用的loader
                options: {               // 传入loader的参数
                    presets: [           // 用于解析一组语法特性
                        [
                            "@babel/preset-env",       // 包含当前所有 ECMAScript 标准里的最新特性
                            {
                                "targets": {   // 指定需要兼容的浏览器类型和版本
                                    "browsers": [
                                        "> 1%",     // 支持市场份额超过1％的浏览器。
                                        "ie >= 9"   // 支持IE9以上的版本
                                    ]
                                }
                            }
                        ]
                    ],
                    plugins: [         // 用于解析某个语法特性
                        "@babel/plugin-proposal-object-rest-spread",    // 解析对象的扩展运算符（ES2018）
                        "@babel/plugin-proposal-export-default-from",   // 解析额外的export语法:export v from "xx/xx"
                        "@babel/plugin-proposal-export-namespace-from", // 解析额外的export语法:export v as vv from "xx/xx";
                        "@babel/plugin-proposal-class-properties",      // 解析class中的静态属性
                        "@babel/plugin-syntax-dynamic-import"           // 解析import方法
                    ]
                }
            }

        }]
    },
    plugins:[],   //插件
    devServer:{},  //开发服务器
    mode: "development"
};