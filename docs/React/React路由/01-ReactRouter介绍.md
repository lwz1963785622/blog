# React Router 
> React Router它遵循react的设计理念，即万物皆组件。所以 RR4 只是一堆 提供了导航功能的组件（还有若干对象和方法），具有声明式（引入即用），可组合性的特点。

组件是 React 的核心功能，其拥有非常强大的声明式编程模型。React Router 是导航组件的集合，可与你的应用程序进行声明式的组合。

React Router 是完整的 React 路由解决方案。
## 理解
### SPA的理解
- 单页Web应用（single page web application，SPA）。
- 整个应用只有一个完整的页面。
- 点击页面中的链接不会刷新页面，只会做页面的局部更新。
- 数据都需要通过ajax请求获取, 并在前端异步展现
### 路由的理解
#### 什么是路由?
> 1.一个路由就是一个映射关系(key:value)
> 2.key为路径, value可能是function或component
#### 路由分类
##### 后端路由：
> 理解： value是function, 用来处理客户端提交的请求。
> 注册路由： router.get(path, function(req, res))
> 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
#### 前端路由：
> 浏览器端路由，value是component，用于展示页面内容。
> 注册路由: `<Route path="/test" component={Test}>`
> 工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件
## 文档地址
名称 | 地址
---------|-------------
文档网址  | <a href="https://reacttraining.com/react-router/" target="\_blank">https://reacttraining.com/react-router/</a>
官方网站 | <a href="https://reacttraining.com/" target="\_blank">https://reacttraining.com/</a>
