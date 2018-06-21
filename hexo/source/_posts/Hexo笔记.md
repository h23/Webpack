---
title: Hexo学习
date: 2018-06-20 16:20:47
tags:
---
# Hexo结合GitHub搭建博客基础
## Hexo简介
Hexo是一个博客框架，用Markdown解析文档，用主题生成静态网页。
## Hexo安装
前提条件：已安装nodeJS，git
安装：

	npm install -g hexo-cli

## 博客搭建步骤
1. 建站
2. 新建文章
3. 开启服务器，本地测试
4. 生成文件
5. 部署到GitHub

###  建站
在指定文件夹下

```
hexo init <folder>
cd <folder>
npm install
```

完成命令后，folder下多出如下文件：
**_config.yml:** 网站的配置信息。
**source:** 存放用户资源的地方
**themes:** 主题文件夹
**package.json:** 应用程序的信息
**scaffolds:** 模版文件夹

###  新建文章

	hexo new [layout] <title>

layout默认为post，存放路径```source/_posts```
使用markdown语法，编辑新建的文章

### 开启服务器，本地测试
安装服务器：
	npm install hexo-server --save
开启服务器：
	hexo server
开启后，可通过```http://localhost:4000```访问博客。


###  生成文件

	hexo generate

生成的文件，存放在public中

###  部署到GitHub
安装hexo-deployer-git

	npm install hexo-deployer-git --save

方式1：修改_config.yml配置文件，在Deployment部分中：

	deploy:
		type: git
		repo: <GitHub Pages仓库 url>

完成后，可通过xx.github.io来访问博客。
**这种方式，会直接覆盖仓库。原内容需要放到public下重新提交。**

方式2：
1.新建一个仓库，用于存放hexo博客。
2.修改_config.yml配置文件，在URL部分中：
	
	url: https://xx.github.io/blog
	root: /blog/

3.在Deployment部分中：

	deploy:
		type: git
		repo: 新仓库地址

4.在GitHub上，修改新仓库的GitHub Pages为master branch
完成后，可通过xx.github.io/blog来访问博客。


## 更换主题(可选)
1.在[Hexo主题](https://hexo.io/themes/ "Hexo主题")上，找到相应主题。
2.将主题clone到themes目录下
3.修改_config.yml配置文件，在Extensions部分中：

	theme: 主题名

