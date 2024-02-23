# React环境搭建
当我们需要使用某种框架或库进行开发的时候，要先进行开发环境的搭建。

创建一个React应用程序，通过如下两种方式：
- 浏览器直接引入
- 使用工具链构建React应用程序

在前期的学习中，我们直接在浏览器引入react库，来降低学习的复杂度。

## 浏览器直接引入

### 下载与安装React
下列两种方式，任选其一：

| 列表       | 方式                         |
|-----------|------------------------------|
| gitHub下载 | <a href="https://github.com/facebook/react/releases" target="\__blank">点击进入github下载</a> |
| npm安装    | `npm install react react-dom`|

### React库文件

| 库文件        | 作用                            | 版本                      | 安装大小 |
| :----------- | :----------------------------- |:----------------------- |:--------------|
| react.js     | 是 React 的核心库                |[![react][react]][react-url]   |  ![react-size] |
| react-dom.js | 是提供与 DOM 相关的功能           |[![react-dom][react-dom]][react-dom-url]   |  ![react-dom-size] |
| babel.js     | 是将 JSX 语法转为 JavaScript 语法 |[![babel][babel]][babel-url]   |  ![babel-size]|

[react]: https://img.shields.io/npm/v/react.svg
[react-url]: https://npmjs.com/package/react
[react-size]: https://packagephobia.now.sh/badge?p=react

[react-dom]: https://img.shields.io/npm/v/react-dom.svg
[react-dom-url]: https://npmjs.com/package/react-dom
[react-dom-size]: https://packagephobia.now.sh/badge?p=react-dom

[babel]: https://img.shields.io/npm/v/@babel/standalone.svg
[babel-url]: https://npmjs.com/package/@babel/standalone
[babel-size]: https://packagephobia.now.sh/badge?p=@babel/standalone

```
<!-- head标签引入 -->
<script src="js/react.development.js"></script>
<script src="js/react-dom.development.js"></script>

<!-- Babel 可以做很多很酷的事情，但是我们关心的是将 JSX 变成 JavaScript 的能力 -->
<script src="js/babel.min.js"></script>
```

### html模板示例
首先我们要下载React的核心资源库，我们可以从官方网站下载，其中包括很多Demo实例，还有React几个核心文件库。
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="js/react.development.js"></script>
    <script src="js/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="example"></div>

    <!--要使用JSX语法进行开发需要将type制定为txt/babel -->
    <script type="text/babel">
      // to do write some react code
    </script>
  </body>
</html>
```
