# 从零开始搭建React项目

## 1. Webpack基础概念

webpack主要作用：

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

Webpack 有以下几个核心概念：

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。
- **Output**：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

构建过程：

1. 从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 
2. 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则。
3. 对 Module 进行转换后，再解析出当前 Module 依赖的 Module。
4. 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。
5. 最后 Webpack 会把所有 Chunk 转换成文件输出。
6. 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。 

## 2. 项目需求

使用Webpack 4.x 搭建项目，满足以下需求：

1. 使用ES6语言
2. 使用React框架
3. 自动生成HTML
4. webpack-dev-server
5. 加载样式（CSS、SCSS）
6. 加载静态资源（图片、字体）
7. 使用第三方库
8. 其他（clean,merge,source map）

## 3. 实战

### 3.1 基础环境

NodeJS版本10.4.1。

1. 初始化生成一个 `package.json` 文件。

   ```
   npm init -y
   ```

2. 本地安装webpack

   webpack4版本命名行相关的功能独立到Webpack-cli。

   ```
   npm i webpack webpack-cli -D
   ```

3. 新建webpack.config.js 配置文件。

   ```
   webpack默认会查找 webpack.config.js 作为配置文件。
   
   自定义配置文件名称：
   webpack --config xx.js
   ```

4. 基础配置

   ```
   webpack配置采用commonJS规范，通过module.export导出一个描述如何构建的 Object 对象。
   
   module.exports={
       entry:{},     //入口配置*
       output:{},    //出口配置*
       modules:{},   //module.rules loader
       plugins:[],   //插件
       devServer:{}   //开发服务器
   }
   ```

### 3.2 ES6

#### 3.2.1 前置步骤

1. 按如下结构创建相应文件与目录：

   ```
   │  package.json
   │  webpack.config.js
   ├─dist
   │      index.html        
   └─src
           main.js
   ```

2. main.js 内容：

   ```
   class Ui {
       constructor(name, age) {
           this.name = name;
           this.age = age;
       }
   
       coding() {
           return `${this.name} is coding`;
       }
   }
   
   let ui= new Ui('hqz','18');
   
   document.getElementById('app').innerText=ui.coding();
   ```

3. index.html 内容：

   ```
   <html>
   <head>
   	<meta charset="UTF-8">
   	<title>ES6</title>
   </head>
   <body>
       <div id="app"></div>
       <script src="bundle.js"></script>    //手动引入打包后的JS
   </body>
   </html>
   ```

4. webpack配置

   ```
   const path=require("path");
   
   module.exports={
       entry:'./src/main.js',     //入口文件
       output:{                   //出口配置
           filename: 'bundle.js', //出口文件名
           path: path.resolve(__dirname, 'dist')  //出口文件路径
       },
       module: {},    //module.rules loader
       plugins:[],    //插件
       devServer:{}   //开发服务器
   };
   ```

#### 3.2.2 配置Babel

目前浏览器对ES6的标准支持不全，所以我们需要把ES6转换成ES5，包含以下两件事：

1. 把新的 ES6 语法用 ES5 实现。
2. 给新的 API 注入 polyfill。

babel可以方便的完成以上2件事。 babel-preset-env的工作方式类似于babel-preset-latest，但它允许您指定环境并仅转换该环境中缺少的功能。

babel 7.X的主要变更：

- 删除对未维护的 Node 版本的支持：0.10,0.12,2,5
- 删除“Stage” & 年度预设（preset-es2015 等）， 用@babel/preset-env 取代。
- 对部分软件包进行重命名（e.g. babel-core-->@babel/core）

简单升级：

1. 利用babel-upgrade

   ```
   npm i babel-upgrade -g
   babel-upgrade --write
   ```

2. 重新安装包

3. 修改配置文件中的包名

配置：

1. 本地安装Babel

   ```
   npm i -D @babel/core @babel/preset-env babel-loader
   @babel/plugin-transform-object-rest-spread @babel/plugin-transform-export-extensions @babel/plugin-transform-class-properties @babel/plugin-syntax-dynamic-import
   ```

2. 配置webpack

   ```
   在module.rules中添加如下：
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
                           ]
                       ],
                       plugins: [         //用于解析某个语法特性
                           "@babel/plugin-proposal-object-rest-spread", //解析对象的扩展运算符（ES2018）
                           "@babel/plugin-proposal-export-default-from",  //解析额外的export语法:export v from "xx/xx"
                           "@babel/plugin-proposal-export-namespace-from", //解析额外的export语法:export v as vv from "xx/xx";
                           "@babel/plugin-proposal-class-properties",   //解析class中的静态属性
                           "@babel/plugin-syntax-dynamic-import"         //解析import方法
                       ]
                   }
               }
   
           }]
       },
   ```

3. 执行编译

   ```
   package.json 的 script字段添加如下：
   "build": "webpack"
   
   执行 npm run build
   ```

   编译完成后，dist文件夹下多出一个bundle.js文件，打包成功。

### 3.3 React

#### 3.3.1 前置步骤

1. 本地安装react

   ```
   npm i -D react react-dom
   ```

2. mian.js

   ```
   import React, { Component } from 'react';
   import ReactDOM from 'react-dom';
   
   class App extends Component {
       render() {
           return <h1>Hello word!</h1>
       }
   }
   ReactDOM.render(<App />, document.getElementById('app'));
   ```

#### 3.3.2 配置Babel

Babel也可用于解析JSX，需要使用babel-preset-react。

1. 本地安装babel-preset-react

   ```
   npm i -D @babel/preset-react
   ```

2. 配置webpack (在ES6环境的基础上)

   ```
   在module.rules中添加如下：
   module: {
           rules: [{
               test: /\.js$/,   
               use: {
                   loader: "babel-loader", 
                   options: {               
                       presets: ["@babel/preset-env","@babel/preset-react"]  //用于解析ES6+React
                   }
               }
   
           }]
       },
   ```

### 3.4 自动生成HTML

#### 3.4.1 单个页面

使用html-webpack-plugin 自动生成HTML，并引入相应文件。

1. 将index.html移到src目录下，并重命名：

   ```
   │  package.json
   │  webpack.config.js
   ├─dist     
   └─src
           main.js
           template.html
   ```

2. template.html 内容：

   ```
   <html>
   <head>
   	<meta charset="UTF-8">
   	<title>自动生成HTML</title>
   </head>
   <body>
       <div id="app"></div>     //去掉手动引入script
   </body>
   </html>
   ```

3. 本地安装

   ```
   npm i -D html-webpack-plugin
   ```

4. webpack配置

   ```
   const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入插件
   
   plugins:[
       new HtmlWebpackPlugin({
       	template:'./src/template.html',  //html模板
       })
   ]
   ```

5. 编译

6. 编译后生成的HTML

   ```
   <html>
   <head>
     <meta charset="UTF-8">
     <title>自动生成HTML</title>
   </head>
   <body>
   <div id="app"></div>
   <script type="text/javascript" src="bundle.js"></script>   //自动引入JS文件
   
   </body>
   </html>
   ```

#### 3.4.2 多个页面

如果单页应用中需要多个页面入口，或者多页应用时配置多个html时，那么就需要实例化该插件多次。

1. 目录结构要求：

   ```
   │  package.json
   │  webpack.config.js
   │  template.html
   ├─dist
   └─src                   
       ├─A                 
       │      A.js 
       └─B
              B.js
   ```

2. 配置webpack

   ```
   const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入插件
   
   entry: {                           //多入口使用对象形式配置，chunk名称为key值
           A: './src/pages/A/A.js',
           B: './src/pages/B/B.js',
   },
   output:{                   
           filename:'[name].bundle.js',  //[name]代表chunk名称
           path: path.resolve(__dirname, 'dist')
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
   ]
   ```

3. 编译后的目录结构

   ```
   │  package.json
   │  webpack.config.js
   │  template.html
   ├─dist
   |	A.bundle.js
   |	A.html
   │  	B.bundle.js
   │  	B.html
   └─src                   
       ├─A                 
       │      A.js 
       └─B
              B.js
   ```

### 3.5 Webpack-dev-server

webpack-dev-server提供了一个简单的服务器，用于访问 webpack 构建好的静态文件，我们日常开发时可以使用它来调试前端代码。 webpack-dev-server将构建好的项目存在内存中。

DevServer 支持模块热替换, 可在不刷新整个网页的情况下实时预览页面。 原理是当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。 

#### 3.5.1 devServer

1. 本地安装devServer

   ```
   npm i -D webpack-dev-server
   ```

2. 配置webpack：

   ```
   const webpack = require('webpack');
   
   plugins: [
           new webpack.HotModuleReplacementPlugin()  //启用 HMR (webpack 4)
   ],
   
   devServer:{
           hot: true,                 //开启模块热替换
           contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
           host: '0.0.0.0',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
           port: 3000,                //DevServer 服务监听的端口，默认8080
           https: false,              //是否使用HTTPS服务
           open: true                 //自动打开网页，地址是host:port
   },
   
   只有在通过 DevServer 去启动 Webpack 时配置文件里 devServer 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 devServer 配置项。 
   ```

3. 执行编译

   ```
   package.json 的 script字段添加如下：
   "start": "webpack-dev-server"
   
   执行 npm start
   ```

4. http://192.168.1.87:3000/A.html

#### 3.5.2 open-browser-webpack-plugin 

1. 本地安装

   ```
   npm i -D open-browser-webpack-plugin
   ```

2. 配置webpack

   ```
   const OpenBrowserPlugin = require('open-browser-webpack-plugin');
   
   plugins: [
       new OpenBrowserPlugin({ url: 'http://192.168.1.87:3000/A.html' })  //开启服务后，自动打开的地址
   ]
   ```

3. 执行 npm start后，会自动打开http://192.168.1.87:3000/A.html页。

### 3.6 加载样式

webpack本身只认得JS文件，其他非JS文件需要用loader进行转换。

#### 3.6.1 加载CSS

处理css文件，需要用到以下两个loader：

* **css-loader** 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明。
* **style-loader** 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。

1. 本地安装loader

   ```
   npm i -D css-loader style-loader
   ```

2. 配置webpack

   ```
   module: {
           rules: [
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
           ]
       },
   ```

#### 3.6.2 加载SCSS

先将SCSS转成CSS，后续处理同上。

1. 本地安装

   ```
   npm i -D sass-loader node-sass 
   ```

2. 配置webpack

   ```
   module: {
           rules: [
               {
                   test: /\.scss$/,    //使用正则匹配所有需要使用此loader的文件
                   use: ['style-loader','css-loader', 'sass-loader']  //处理顺序:sass-loader->css-loader->style-loader
               },
           ]
       },
   ```

### 3.7 加载静态资源

#### 3.7.1 加载图片&字体

file-loader, url-loader可用于处理图片，字体等静态资源。

url-loader封装了file-loader：

* 文件大小小于limit参数时，url-loader将会把文件转为DataURL。
* 文件大小大于limit，url-loader会调用file-loader进行处理。

1. 本地安装loader

   ```
   npm i -D file-loader url-loader
   ```

2. 配置webpack

   ```
   module: {
       rules: [
           {
                   test: /\.(png|svg|jpg|gif)$/,
                   use: [{
                       loader: 'url-loader',
                       options: {
                           limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                           fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                           outputPath: 'images',     //图片输出路径，相对于output.path
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
   ```

3. 编译后:

   * 大于30KB的资源，用file-loader处理，复制到dist/images目录下。
   * 小于30KB的资源，和js一起打包，形成dataURL形式。

#### 3.7.2 copy-webpack-plugin

将不需要webpack处理的静态资源（e.g. favicon），原样输出到指定目录下。

1. 本地安装

   ```
   npm i copy-webpack-plugin -D
   ```

2. 配置webpack

   ```
   const CopyWebpackPlugin = require('copy-webpack-plugin');
   
   plugins:[
       new CopyWebpackPlugin([{
           from: './src/assets/public',  // 将此目录下的文件
           to:'./public'                 // 输出到此目录，相对于output.path目录
       }])
   ]
   ```

3. 编译后 src/assets/public 下的文件将原封不动的输出到 dist/public 目录下。

### 3.8 第三方库

通过ProvidePlugin引用某些模块作为应用运行时的变量，从而不必每次都用 `require` 或者 `import`, 是内置的插件。

1. 安装jquery

   ```
   npm i -D jquery
   ```

2. 配置webpack

   ```
   plugins:[
       new webpack.ProvidePlugin({
         $: 'jquery', 
       })
   ]
   
   ```

3. 在JS文件中就可直接使用jquery，不用导入。

### 3.9 其他

#### 3.9.1 clean-webpack-plugin 

webpack打包的文件都放在dist文件夹下，但webpack无法追踪到哪些文件是实际项目中用到的。所以建议在每次构建前都清理下dist文件夹。

1. 本地安装插件

   ```
   npm i -D clean-webpack-plugin
   ```

2. 配置webpack

   ```
   const CleanWebpackPlugin=require('clean-webpack-plugin');
   
   new CleanWebpackPlugin(['dist'])
   ```

#### 3.9.2 Webpack-merge 

实际项目开发中，一般会有三份配置文件：

* webpack.dev.js  开发环境：devserver配置，生成SourceMap
* webpack.prod.js  生产环境：压缩代码
* webpack.common.js  公共配置

可使用webpack-merge合并配置。

1. 本地安装

   ```
   npm i -D webpack-merge
   ```

2. 拆分webpack配置

   ```
   webpack.prod.js:
   
   const merge = require("webpack-merge");
   const common = require("./webpack.common.js");     //引入公共配置
   const CleanWebpackPlugin = require("clean-webpack-plugin");
   
   module.exports = merge(common, {                   //合并配置
           plugins: [
               new CleanWebpackPlugin(["dist"])
           ],
   });
   ```

3. 修改package.json的script字段

   ```
   "build": "webpack --config webpack.prod.js",
   "start": "webpack-dev-server --config webpack.dev.js"
   ```

#### 3.9.3 source map 

React, ES6等经过webpack转换后，代码可读性非常差，不利于在浏览器中调试代码。可通过加载 Source Map 文件，在浏览器中调试源码。

各种source map的差异见：https://github.com/webpack/webpack/tree/master/examples/source-map

```
devtool: "cheap-module-eval-source-map"  //开发环境
```

## 4. 优化

### 4.1 模式

我们在日常的前端开发工作中，一般都会有开发&生产两套构建环境。

webpack 4.X新增用mode字段指定当前环境，并启用相应模式下的webpack内置的优化。

```
module.exports = {
  mode: 'production'
};
```

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | process.env.NODE_ENV =development<br />并启用以下插件：<br /> NamedChunksPlugin ， NamedModulesPlugin |
| production  | process.env.NODE_ENV =production<br />并启用以下插件：<br />FlagDependencyUsagePlugin  ，  FlagIncludedChunksPlugin ,  ModuleConcatenationPlugin ,  NoEmitOnErrorsPlugin ,  OccurrenceOrderPlugin ,  SideEffectsFlagPlugin  ,  UglifyJsPlugin |

可通过optimization字段，手动配置或覆盖mode配置。

### 4.2 代码压缩

#### 4.2.1 压缩JS文件

将mode设置成production，在此模式下optimization.minimize默认为true, webpack 会自动调用UglifyjsWebpackPlugin压缩JS代码。

若不需要压缩，可将optimization.minimize设置为false。

1. 配置webpack.prod.js

   ```
   mode: "production"
   ```

   ```
   optimization: {
           // minimize:false，     //若不需要进行压缩，可使用此句禁用
           // minimizer: [         //用于指定使用的压缩插件或自定义UglifyjsWebpackPlugin插件配置，覆盖默认配置。
           //     new UglifyJsPlugin({ /* your config */ })
           // ]
   },
   ```

#### 4.2.2 压缩CSS文件

3.7章节介绍了如何加载样式，但加载后的样式是写在JS文件中的。随着项目越来越大，js文件也会越来越大，所以，我们就需要对css文件进行分离并压缩。

1. 本地安装插件

   ```
   npm i -D mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
   ```

2. 配置webpack：分离css文件

   ```
   webpack.common.js:
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module.exports = {
     plugins: [
       new MiniCssExtractPlugin({
         filename: "[name].css",    //同output.filename
       })
     ],
     module: {
       rules: [
         {
           test: /\.(sc|c)ss$/,
           use: [
               MiniCssExtractPlugin.loader,   //style-loader改用MiniCssExtractPlugin
               'css-loader',
               'sass-loader',
           ],
         }
       ]
     }
   }
   
   注：在Webpack4上用extract-text-webpack-plugin会出错，可以安装beta版本extract-text-webpack-plugin@next。
   ```

3. 配置webpack：压缩css文件

   ```
   webpack.prod.js:
   const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //用于压缩CSS代码
   const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  //用于压缩JS代码
   
   optimization: {
           minimizer: [     
               new UglifyJsPlugin({}),
               new OptimizeCSSAssetsPlugin({})  //压缩css
           ]
       },
   ```


#### 4.2.3 压缩HTML文件

HtmlWebpackPlugin支持压缩输出的HTML文件。

```
 plugins:[
    new HtmlWebpackPlugin({
    	template:'src/index.html', 
    	minify:{                     //压缩输出
            collapseWhitespace:true   //折叠空白区域
            minifyCSS: true, 	// 压缩 HTML 中出现的 CSS 代码
        	minifyJS: true 		// 压缩 HTML 中出现的 JS 代码
    	}
    })
]
```

#### 4.2.4 压缩图片

1. 本地安装

   ```
   npm i -D image-webpack-loader
   ```

2. 配置webpack

   ```
   {
       test: /\.(png|svg|jpg|gif)$/,
       use: [
           {
               loader: 'url-loader',
               options: {
                   limit: 1024 * 30,         
                   fallback: 'file-loader',  
                   outputPath: 'images',    
               }
           },
       	'image-webpack-loader'        //压缩图片
       ]
   },
   ```

### 4.3 Tree Sharing

Tree Shaking 可以用来剔除 JavaScript 中用不上的代码。

Tree Shaking要求：

- 必须遵循 ES6 的模块规范（即 import 和 export）。
- 在项目 `package.json` 文件中，添加一个 "sideEffects" 属性。作为第三方包？
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 `UglifyJSPlugin`）。

1. 新建util.js

   ```
   import React from 'react';
   
   export function funcA() {
       return <h1>I'm funcA</h1>;
   }
   
   export function funB() {
       return <h1>I'm funcB</h1>;
   }
   ```

2. 在A.js中引用util.funcA，则funcB就是用不上的代码。

   ```
   import {funcA} from '../util';
   ```

3. 修改babel-loader配置。

   ```
   presets: [ 
       [
           "env",
           {modules: false}  //关闭Babel的模块转换功能，保留原本的ES6模块化语法
       ],
       "react"
   ]
   ```

4. package.json添加sideEffects字段： 将文件标记为无副作用

   ```
   "sideEffects": ["*.css","*.scss"]  //避免样式文件被删除
   
   注：此字段是webpack4新增的。
   ```

5. 开启压缩，参照4.2.1

   执行编译后，A.bundle.js无funcB相关代码。

### 4.4 提取公共代码

提取公共代码的原理：用户第一次访问页面后，页面公共代码的文件已经被浏览器缓存起来。用户切换到其它页面时，存放公共代码的文件就不会再重新加载，而是直接从缓存中获取。 加快了其他页面的访问速度，减少了网络传输流量。

3种拆分方案浏览器的加载情况：

* 未拆分代码：所有代码被打包到一个JS文件中，当修改了代码，浏览器就得重新加载所有代码。
* 拆分公共代码：代码被打包成两个JS文件（公共代码 & 其余代码），修改其中一个文件的代码，浏览器只需要重新加载修改的代码文件。但第三方库的代码也属于公共代码，若修改了非第三方库的公共代码，那么浏览器也会重新加载不常变更的第三方库代码。
* 拆分公共代码&第三方库：代码被打包成3个以上的JS文件。

mode=production时，webpack 4.X 会默认对代码进行拆分，拆分的规则是：

- 模块被重复引用，或者是来自`node_modules`中的模块。
- 文件大于30kb。
- 在按需加载时，请求数量小于等于5。
- 在初始化加载时，请求数量小于等于3。

注：webpack 4.x 通过optimization.splitChunks配置, webpack 4.x之前可用CommonsChunkPlugin。

默认配置：

```
optimization: {
    splitChunks: {
      chunks: "async", //异步加载的模块
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //被引用超过1次
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
    },
  },
}
```

简单配置：

```
optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}
```

建议将公共使用的第三方类库显式地配置为公共的部分:

- 根据所使用的技术栈，找出所有页面都需要用到的基础库。如react、react-dom 等库，把它们提取到一个单独vendor.js文件。 
- 在剔除了各个页面中被 vendor.js 包含的部分代码外，再找出所有页面都依赖的公共部分的代码提取出来放到 common.js中去。
- 再为每个页面都生成一个单独的文件，这个文件中不再包含 vendor.js 和 common.js中包含的部分，而只包含各个页面单独需要的部分代码。

```
optimization: {
    splitChunks: {
            cacheGroups: {           //缓存组
                commons: {           //提取入口文件之间的公共代码
                    chunks: 'all',   //块的范围，有三个可选值：initial、async、all，默认为all
                    minChunks: 2,    //被引用次数
                    minSize: 0,      //文件大小
                    name: "common"   //拆分出来块的名字
                },
                vendor: {
                    chunks: "all",
                    test: /node_modules/,//控制哪些模块被这个缓存组匹配到
                    name: "vendor",
                    priority: 10,
                },
            },
        }
}
```

```
new HtmlWebpackPlugin({
    chunks: ['A','common','vendor'],           //引入拆分出来的chunk
    filename:'A.html',      
    template:'template.html', 
    minify:{                 
    	collapseWhitespace:true  
    }
}),
```

编译完成后dist目录结构如下：

```
│  A.bundle.js
│  A.css
│  A.html
│  B.bundle.js
│  B.css
│  B.html
│  common.bundle.js           //A和B之间的公共代码
│  vendor.bundle.js           //node_modules下的第三方依赖代码
├─images
│      230280f0ff880c8273b99fdae150dc96.png
└─public
        ico.png
```

### 4.5 优化loader配置

使用 Loader 时可以通过 test 、 include、 exclude 三个配置项来命中 Loader 要应用规则的文件。 为了尽可能少的让文件被 Loader 处理，可以通过 include && exclude 去命中/排除文件。

示例配置：

```
babel-loader:
exclude: path.resolve(__dirname, 'node_modules')

url-loader：
include: path.resolve(__dirname, 'src/assets')
```

### 4.6 Resolve

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 

模块引入方式：

```
import * as m from './index.js'   // 相对路径
import React from 'react'         // 模块名
```

- 解析相对路径
  1. 查找相对当前模块的路径下是否有对应文件或文件夹
  2. 是文件则直接加载
  3. 是文件夹则继续查找文件夹下的 package.json 文件
  4. 有 package.json 文件则按照文件中 browser/module/main 字段的文件名来查找文件 (配置项：resolve.mainFields )
  5. 无 package.json 或者无 browser/module/main字段则查找 index.js 文件  (配置项：resolve.mainFiles) 
- 解析模块名
  1. 查找当前文件目录下，父级目录及以上目录下的 node_modules 文件夹，看是否有对应名称的模块  (配置项：resolve.modules) 

#### 4.6.1 resolve.modules

resolve.modules 用于配置 Webpack 去哪些目录下寻找第三方模块。

 默认值是 ['node_modules']，作用：

* 先去当前目录下的node_modules目录下查找第三方模块。
* 如果没找到，就去上级目录的node_modules目录下查找。
* 还是没找到，再去上级的node_modules目录下查找。
* 直到根目录。

通常安装的第三方模块都放在项目根目录下的 node_modules 目录下，就没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找。

配置如下：

```
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```

#### 4.6.2 resolve.extensions

resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：

```
extensions: ['.js', '.json']
```

如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多。 

建议：

- 后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。
- 频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。
- 在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 `require('./data')` 写成 `require('./data.json')`。

相关 Webpack 配置如下：

```
module.exports = {
  resolve: {
    // 尽可能的减少后缀尝试的可能性
    extensions: ['.js'],
  },
};
```

#### 4.6.3 resolve.alias

`resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径，可简化import/require路径。

```
resolve:{
  alias:{
    'assets': path.resolve(__dirname, 'src','assets')   //把导入语句里的 assets 关键字替换成 根目录/src/assets/
  }
}
```

`import img from 'assets/images/1.png'` ==> `import img from 'xx/src/assets/images/1.png'`。

css中的url不支持。

解决在webstorm中无法解析alias后的路径：

1. 在webpack settings中指定webpack配置文件的路径。
2. 由于我们脚手架的webpack配置中resolve.alias配置是直接写在alias字段下的，webstorm无法解析。所以需要在配置文件中配置resolve.alias字段。

### 4.7 Hash

在打包出来的文件名上加上文件内容的`hash`是目前最常见的有效使用浏览器长缓存的方法，js文件如果有内容更新，`hash`就会更新，浏览器请求路径变化所以更新缓存，如果js内容不变，`hash`不变，直接用缓存。

hash类型：

* **hash** 跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值。
* **chunkhash** 和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
* **contenthash** 更细致地根据内容更改，生成对应的哈希值。为css文件生成独立的hash，让css文件不受js文件的影响。

webpack配置：

```
output:{                
        filename:'[name].[chunkhash:8].bundle.js', 
        path: path.resolve(__dirname, 'dist') 
    },
plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
        }),
    ],
```

### 4.8 遗留

#### 4.8.1 热更新 （react-hot-loader）
1. 安装

   ```
   yarn add react-hot-loader
   ```

2. webpack配置

   ```
   1.使用HotModuleReplacementPlugin插件
       plugins: [
           new webpack.HotModuleReplacementPlugin(),
       ],
   2.开启devServer的模块热替换
       devServer:{
           hot: true,                 //开启模块热替换
       },
   3.在babel-loader中使用react-hot-loader/babel插件
       plugins: ["react-hot-loader/babel"             
   ```

3. ##### 入口文件设置

   ```
   import React, { Component } from 'react';
   import { AppContainer } from 'react-hot-loader';  
   import ReactDOM from 'react-dom';
   require('./a.css');
   import Test from './Test';
   
   
   function render(RootElement) {
     ReactDOM.render(
       <AppContainer>
         <RootElement />
       </AppContainer>,
       document.getElementById('app')
     );
   }
   
   render(Test);
   
   if (module.hot) {
     module.hot.accept('./Test', () => {
       render(Test);
     });
   }
   ```

#### 4.8.2 Proxy

proxy 用于配置 webpack-dev-server 将特定 URL 的请求代理到另外一台服务器上。例如：

```
proxy: {
    '/api/test': {
        target: "http://localhost:3000", // 将URL中带有/api/test的请求代理到本地的3000端口的服务上
        pathRewrite: { '^/api': '' }, // 把URL中path部分的api移除掉
    },
}
```

1. 请求到 `/api/test` 会被代理到请求 `http://localhost:3000/api/users`。
2. 请求到 `/api/test` 会被代理到请求 `http://localhost:3000/users`。