# ReactRouter示例

## 基本使用

``` jsx
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, //BrowserRouter 与 HashRouter 使用其中一个
    Route,
    Link,
} from 'react-router-dom';

class App extends Component{...}
class Home extends Component{...}
class About extends Component{...}
class News extends Component{...}

React.render(
	<Router>
        <App>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/news">News</Link>
            </nav>
            <div>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/news" component={News} />
            </div>
        </App>
	</Router>
	,document.querySelector('#app')
)
```

App组件中可以添加一些，所有页面共有的组件或内容。

路由容器组件

``` js
< Router >
    ...
    <
    /Router>
```

路由

``` html
<div>
    # 当路径为 / 加载 Home组件
    <Route path="/" component={Home} />

    # 当路径为 /about 加载 About组件
    <Route path="/about" component={About} />

    # 当路径为 /news 加载 News组件
    <Route path="/news" component={News} />
</div>
```

## 向路由组件传递参数

```js 

<div>
  <ul>
    {
      messageArr.map((msgObj)=>{
        return (
          <li key={msgObj.id}>
            {/* 向路由组件传递params参数 */}
            {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}

            {/* 向路由组件传递search参数 */}
            {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

            {/* 向路由组件传递state参数 */}
            <Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
          </li>
        )
      })
    }
  </ul>
  <hr/>
  {/* 声明接收params参数 */}
  {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

  {/* search参数无需声明接收，正常注册路由即可 */}
  {/* <Route path="/home/message/detail" component={Detail}/> */}

  {/* state参数无需声明接收，正常注册路由即可 */}
  {/* <Route path="/home/message/detail" component={Detail}/> */}
</div>
/**detail 组件**/
export default class Detail extends Component {
  render() {

  // 接收params参数
  // const {id,title} = this.props.match.params 

  // 接收search参数
  // const {search} = this.props.location
  // const {id,title} = qs.parse(search.slice(1))

  // 接收state参数
  const {id,title} = this.props.location.state || {}
    const findResult = DetailData.find((detailObj)=>{
      return detailObj.id === id
    })
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{findResult.content}</li>
      </ul>
    )
  }
}


```

##  withRouter 
::: warning
//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
//withRouter的返回值是一个新组件
:::

```js
export default withRouter(Header)
```
