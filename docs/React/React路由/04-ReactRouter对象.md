# ReactRouter对象
## history
history 对象通常具有以下属性和方法：

| 参数 | 类型     | 描述  |
| :------------- | :------------- |:------------- |
| length  |  number |  浏览历史堆栈中的条目数|
| action  |  string | 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP|
| location| object | 当前访问地址信息组成的对象，具有如下属性：|
| location.pathname| string | URL路径|
| location.search  |  string|  URL中的查询字符串|
| location.hash    |  string | URL的 hash 片段|
| location.state   |  string | 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state 只有在 browser 和 memory history 有效。|
| push(path, [state])   | function | 在历史堆栈信息里加入一个新条目。|
| replace(path, [state])| function | 在历史堆栈信息里替换掉当前的条目|
| go(n)         | function | 将 history 堆栈中的指针向前移动 n。|
| goBack()      | function | 等同于 go(-1) |
| goForward()   | function | 等同于 go(1)  |
| block(prompt) | function | 阻止跳转      |


在组件中使用js跳转
```js
class ToHomeButton extends React.Component{
    render(){
        return <button onClick={this.handleClick.bind(this)}>首页</button>
    }
    handleClick(){
        //使用 this.props.history.push(path) 进行跳转
        this.props.history.push('/');
    }
}
```
## location
location 是指你当前的位置，将要去的位置，或是之前所在的位置
```js
{
  key: 'sdfad1'
  pathname: '/about',
  search: '?name=minooo'
  hash: '#sdfas',
  state: {
    price: 123
  }
}
```
router 将在这几个地方为您提供一个 location 对象：
- Route component as `this.props.location`
- Route render as `({ location }) => ()`
- Route children as `({ location }) => ()`
- withRouter as `this.props.location`

## match
match 对象包含了 `<Route path>` 如何与 URL 匹配的信息，具有以下属性：

| 参数 | 类型     | 描述  |
| :------------- | :------------- |:------------- |
| params| object | 路径参数，通过解析 URL 中的动态部分获得键值对|
| isExact| bool | 为 true 时，整个 URL 都需要匹配|
| path| string | 用来匹配的路径模式，用于创建嵌套的 `<Route>`|
| url| string | URL 匹配的部分，用于嵌套的 `<Link>`|
