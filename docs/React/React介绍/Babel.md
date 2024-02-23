# Babel
> Babel是一个Javascript编译器。

Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码：

- 转换语法
- Polyfill 实现目标环境中缺少的功能 (通过 @babel/polyfill)
- 源代码转换 (codemods)


| 名称         | 作用                            | 版本                         | 安装大小       |
| :----------- | :----------------------------- |:--------------------------- |:--------------|
| babel        | 是将 JSX 语法转为 JavaScript 语法 |[![babel][babel]][babel-url] | ![babel-size] |


[babel]: https://img.shields.io/npm/v/@babel/core.svg
[babel-url]: https://npmjs.com/package/@babel/core
[babel-size]: https://packagephobia.now.sh/badge?p=@babel/core

| 名称  | 地址 |
|-----------|-----------------|
| babel官网 - 中文 |[https://babel.docschina.org/](https://babel.docschina.org/) |
| babel官网 - 英文 |[http://babeljs.io](http://babeljs.io) |

## Babel作用

### 编译下一代ECMAscript语法
Babel 通过语法转换器支持最新版本的 JavaScript 。 这些插件允许你立刻使用新语法，无需等待浏览器支持。

### JSX and React
Babel内置支持JSX语法转换器，能够转换 JSX 语法并去除类型注释。

当我们采用JSX语法进行开发，我们需要将这种语法编译为正常的JS语法,我们可以使用Babel进行编译。

##  Babel编译方式
| 类别 | 描述     |
| :------------- | :------------- |
| **客户端编译**  | 我们需要引入babel的浏览器端编译库browser.js进行编译。采用这种方式需要在客户端进行编译为js文件。这种方式会造成浪费客户端资源。|
| **命令行编译**    | 我们可以在开发时采用babel编译器把jsx编译为js。|

### 客户端编译
引入babel客户端编译库babel.js
```
<script src="babel.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
//JSX
...
</script>
```

### 命令行编译

安装babel-cli
```
$ npm install -g babel-cli
```

## 基本使用
### 编译下一代JavaScript
在服务器端将使用新语法Javascript代码转换成 当前浏览器支持的Javascript需要使用Babel中一个插件`@babel/preset-env`

安装`@babel/preset-env`
```
$ npm install @babel/preset-env --save-dev
```
创建`.babelrc`文件
```
{
  "presets": ["@babel/preset-env"]
}

```

### 编译JSX
在服务器端将JSX 转换成 JS需要使用Babel中一个插件`@babel/preset-react`

> 注意：此插件基于nodejs，请确保已安装nodejs。

安装`@babel/preset-react`
```
$ npm install @babel/preset-react
```
创建`.babelrc`文件
```
{
  "presets": ["@babel/preset-react"]
}

```
### 命令行语法
在命令行执行
```
# --out-file or -o 输出到文件
$ babel script.js --out-file script-compiled.js

# --watch or -w 监测
$ babel script.js --watch --out-file script-compiled.js

# --out-dir 输出到文件夹
$ babel src --out-dir lib
```
| 参数 | 说明 |
|-----|------|
| src |  要编译的目录 |
| lib |   编译成功后输出目录 |
| -o | 输出文件 |
| -w | 自动监测文件变化执行编译 |
