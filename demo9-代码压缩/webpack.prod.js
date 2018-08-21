const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(["dist"])
    ],
    optimization: {
        // minimize:false，     //若不需要进行压缩，可使用此句禁用
        minimizer: [            //用于指定使用的压缩插件或自定义UglifyjsWebpackPlugin插件配置，覆盖默认配置。
            new UglifyJsPlugin({}),
            new OptimizeCSSAssetsPlugin({})  //压缩css
        ]
    },
});