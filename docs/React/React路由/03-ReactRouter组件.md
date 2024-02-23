# 路由组件
 | 组件名         | 描述 |
 |---------------|--------------- |
 |BrowserRouter  | 基于History的高阶路由组件 |
 |HashRouter     | 基于Hash的高阶路由组件 |
 |Route          | 路由定义组件 |
 |Link           | 链接组件 |
 |NavLink        | 链接组件(可实现链接高亮) |
 |Redirect       | 重定向组件 |
 |Switch         | 只渲染所匹配到的第一个路由组件 |

## BrowserRouter 与 HashRouter
> BrowserRouter,HashRouter是React组件，它只是一个容器，真正的路由要通过Route组件定义。

BrowserRouter 与 HashRouter 容器组件用于决定我们所采用的路由方式。

| 组件            | 描述                             |
| :------------- | :------------------------------- |
| BrowserRouter  | HTML5 history API 的高阶路由组件   |
| HashRouter     | 基于hash 的高阶路由组件             |



### BrowserRouter
> 一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。

如果设为BrowserRouter，背后调用的是浏览器的History API，显示正常的路径`example.com/some/path`。
```
// JavaScript 模块导入（注：ES6 形式）
import { BrowserRouter } from 'react-router-dom'
```

> 注意：如果设为BrowserRouter，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。如果开发服务器使用的是`webpack-dev-server`，加上`--history-api-fallback`参数就可以了。

```
webpack-dev-server  --history-api-fallback
```

| 参数                 | 类型    | 描述                                            |
|---------------------|---------|------------------------------------------------|
| basename            | string  | 为所有位置添加一个基准URL                          |
| getUserConfirmation | function| 导航到此页面前执行的函数，默认使用 window.confirm    |
| forceRefresh        | bool    | 当浏览器不支持 html5 的 history API 时强制刷新页面  |
| keyLength           | number  | 设置它里面路由的 location.key 的长度。默认是6。     |
| children            | node    | 渲染唯一子元素。                                  |
#### basename: string
作用：为所有位置添加一个基准URL

使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。
```js
<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```
#### getUserConfirmation: func
作用：导航到此页面前执行的函数，默认使用 window.confirm

使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
```js
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```
#### forceRefresh: bool
作用：当浏览器不支持 html5 的 history API 时强制刷新页面。
```js
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```
#### keyLength: number
作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）

使用场景：按需设置。
```js
<BrowserRouter keyLength={12} />
```
#### children: node
作用：渲染唯一子元素。

使用场景：作为一个 React组件，天生自带 children 属性。

### HashRouter
> Hash history 不支持 location.key 和 location.state。另外由于该技术只是用来支持旧版浏览器，因此更推荐大家使用 BrowserRouter。
如果设为HashRouter，路由将通过URL的hash部分（#）切换，URL的形式类似`example.com/#/some/path`。

```js
import { HashRouter } from 'react-router'
```


## Route
> **Route** 的 **path** 属性表示路由组件所对应的路径，可以是绝对路径或相对路径，相对路径可以继承。**component** 属性指定组件，component指定单个组件。

- `<Route> `也许是 RR4 中最重要的组件了，重要到你必须理解它，学会它，用好它。它最基本的职责就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面。

- `<Route>` 自带三个 render方法 和三个属性。
### render方法
render methods 分别是：
- `<Route component>`
- `<Route render>`
- `<Route children>`

每种 render method 都有不同的应用场景，同一个`<Route>` 应该只使用一种 render method ，大部分情况下你将使用 component 。

### props
- match
- location
- history

所有的 render method 无一例外都将被传入这些 props。

## Link
Link组件用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是`<a>`元素的React 版本，可以接收Router的状态。

| 参数    | 类型   | 描述                                    | 示例                            |
|--------|--------|----------------------------------------|--------------------------------|
| to     | string | 需要跳转到的路径(pathname)或地址（location）|`'<Link to="/courses"/>'`        |
| to     | object | 需要跳转到的地址（location）               |`<Link  to={/{pathname: '/courses',search: '?sort=name',hash: '#the-hash',state: { fromDashboard: true }/}/}/>`  |
|replace | bool   |当设置为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址。当设置为 false 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。默认为 false。               |```<Link to="/courses" replace />``` |

```js
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
}
```

### to: string
作用：跳转到指定路径
使用场景：如果只是单纯的跳转就直接用字符串形式的路径。
```js
<Link to="/courses" />
```
### to: object
作用：携带参数跳转到指定路径
作用场景：比如你点击的这个链接将要跳转的页面需要展示此链接对应的内容，又比如这是个支付跳转，需要把商品的价格等信息传递过去。
```js
<Link to={{
  pathname: '/course',
  search: '?sort=name',
  state: { price: 18 }
}} />
```

## NavLink
<!-- `<NavLink>`是 `<Link>` 的一个特定版本, 会在匹配上当前 URL 的时候会给已经渲染的元素添加样式参数 -->

```
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```
|参数| 类型 | 描述 |
|-----------------|--------|------------------------------------------------------|
| activeClassName | string |当元素匹配上当前 URL 的时候, 这个类会被赋予给这个元素. 其默认值为`active`, 这个值会被添加到 className 属性的后面(追加) |
| activeStyle     | object | 当元素被选中时, 为此元素添加样式                          |
| exact           | bool   | 当值为 true 时, 只有当地址完全匹配 class 和 style 才会应用 |

### activeClassName
使用activeClassName指定当前路由的Class。

```js
<LinkNav to="/about" activeClassName="active">About</LinkNav>
<LinkNav to="/repos" activeClassName="active">Repos</LinkNav>
```
### activeStyle
如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的activeStyle属性。

```js
<LinkNav to="/about" activeStyle={{color: 'red'}}>About</LinkNav>
<LinkNav to="/repos" activeStyle={{color: 'red'}}>Repos</LinkNav>
```
### exact
```js
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```


## Redirect
**Redirect** 是一个重定向的组件，有from 和to 两个属性，渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。  

例如：当我们修改路径后，我们可以做个重定向，当用户访问原先的地址的时候(404)，可以重定向到新地址。

| 参数  | 类型   | 描述                                                               |
| :--- | :----- | :---------------------------------------------------------------- |
| to   | string | 重定向的 URL 字符串                                                  |
| to   | object | 重定向的 location 对象                                              |
| push | bool   | 若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。|
| from | string | 需要匹配的将要被重定向路径。                                           |

```js
<Redirect from="string" to="string" />
```
## param
**param** 通过 /:param 的方式传递参数  
<!-- URL的查询字符串`/foo?bar=baz`，可以用`this.props.location.query.bar`获取。 -->

```js
<Route path="new/:id" componet={News} />
```
## Switch组件
<!-- 它的特性是我们只渲染所匹配到的第一个路由组件( `<Route>` 或 `<Redirect>`)，一般界面渲染的时候，会渲染所有匹配到的路由组件。它的孩子节点只能是Route组件或者Redirect组件。 -->

使用方式：
```js
import { Switch } from "react-router-dom";

<Switch>
    <Route path="/" component={Test1} />
    <Route path="/Test" component={Test2} />
</Switch>
```
