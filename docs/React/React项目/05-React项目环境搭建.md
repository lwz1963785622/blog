# React项目环境搭建


当我们采用React进行SPA项目开发的时候，起初需要做开发前的准备工作，主要工作搭建开发环境，建立目录结构，初始化当前项目，安装React开发依赖。

搭建React项目环境有两种方式：
1. 从零搭建开发环境
- 通过`create-react-app` 命令行工具用来搭建开发环境

## 从零搭建开发环境基本步骤
### 建立项目文件夹
```
$ mkdir 项目目录名称
$ cd 项目目录名称
```
### npm init 项目初始化    
创建一个package.json文件，这是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。在终端中使用npm init命令可以自动创建这个package.json文件

```
$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (react-test)
...
About to write to /Users/houningzhou/Web/react-o2o/package.json:
{
  "name": "react-test",
  "version": "1.0.0",
  "description": "react项目练习",
  "main": "index.jsx.js",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "hnz",
  "license": "ISC"
}
Is this ok? (yes)
```
最终会在项目目录中生成package.json文件。

我们还需要调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。

package.json
```
{
  "name": "react-test",
  "version": "1.0.0",
  "description": "react项目练习",
+ "private": true,
- "main": "index.js",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "hnz",
  "license": "ISC"
}
```
### 安装指定npm包    
安装webpack、webpack-dev-server开发依赖
```
$ npm install webpack webpack-dev-server --save-dev
```
安装react、react-dom到生产依赖
```
$ npm install react react-dom --save
```
安装完成之后，查看package.json可看到多了devDependencies和dependencies两项，根目录也多了一个node_modules文件夹。

### 目录结构
```
/
 ├── dist/                          # 构建后自动生成
 │
 ├── src/                           # 项目开发目录
 │      ├── components/             # 组件
 │      ├── pages/                  # 页面
 │      └── main.js                 # 项目入口
 │
 ├── config/                        # 工程配置
 │      │
 │      ├── webpack.development.config.js # webpack开发环境配置文件
 │      │
 │      └── webpack.production.config.js  # webpack生产环境配置文件
 │
 ├── test/                          # 测试代码
 │
 ├── docs/                          # 项目文档
 │
 ├── static/                        # 库文件等，不会被webpack的loader处理,手动管理
 │      │
 │      ├── favicon.ico             # 站标
 │      │
 │      └── index.html              # 项目入口
 │
 ├── node_modules/                  # 自动生成 包含生产依赖及开发依赖
 │
 ├── package.json                   # 项目配置文件
 │
 └── README.md                      # 项目说明
```
