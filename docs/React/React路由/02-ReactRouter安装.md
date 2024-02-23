# ReactRouter安装

| 库名称 | 描述 | 版本  |
|-------|------| -----|
| <a href="https://www.npmjs.com/package/react-router-dom" target="\_blank">react-router-dom</a> |用于浏览器端 React Router| [![npm](https://img.shields.io/npm/v/react-router-dom.svg?style=flat-square)](https://www.npmjs.com/package/react-router-dom)  |
| <a href="https://www.npmjs.com/package/react-router-native" target="\_blank">react-router-native</a> |用于 React Native 的 React Router|  [![npm](https://img.shields.io/npm/v/react-router-native.svg?style=flat-square)](https://www.npmjs.com/package/react-router-native)|

### 安装 react-router-dom

首先通过 npm 安装(ReactRouterV4)：
```
npm install --save react-router-dom
```
然后使用一个支持 CommonJS 或 ES6 的模块管理器，例如 webpack：
```
# CJS
const ReactRouter = require("react-router-dom")
const {BrowserRouter,Route,Link} = ReactRouter;

# ES6
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
```
