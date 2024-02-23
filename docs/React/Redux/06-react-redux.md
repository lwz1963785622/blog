# Redux与React结合
Redux 是独立的，它与React没有任何关系。React-Redux是官方提供的一个库，用来结合redux和react的模块。

React-Redux提供了两个接口Provider、connect。
```
import { Provider,connect } from 'react-redux';
```

## Provider
`<Provider/> `(是一个React组件)它是整个 Redux 应用的顶层组件，接受一个 store 作为 props，它的作用是保存store给子组件中的connect使用。

```jsx
import { Provider } from 'react-redux';
import { render } from 'react-dom';

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)
```

 > 注意：`<Provider>`只需要在渲染根组件时使用，可以让所有容器组件都可以访问 store，不需要每次使用的时候传递。

## connect
> connect() 函数提供了在整个 React 应用的任意组件中获取 store 中数据的功能。

connect 会把State和dispatch转换成props传递给子组件。它看起来是下面这样的：
```jsx
import { connect } from 'react-redux';

class App extends Component{
    render(){
        .....
    }
}

export default connect()(App);
```
connect方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`

### mapStateToProps
mapStateToProps是一个函数，它接受state作为参数，返回一个对象。

mapStateToProps需要负责的事情就是 返回需要传递给子组件的State,connect调用该函数后，在组件中就可以通过props读取到数据。
```jsx
var mapStateToProps = state=>{
  return { value: state }
}
export default connect(mapStateToProps)(App);
```
### mapDispatchToProps
mapDispatchToProps用于建立组件跟store.dispatch的映射关系。
```jsx
// actions.js
export var increment = ()=>{
    return {type:"INCREMENT"};
}
export var decrement = ()=>{
    return {type:"DECREMENT"}
}
// app.js
import {increment,decrement} from "./actions.js";

var mapDispatchToProps = dispatch =>{
    return {
        increment:()=>{ dispatch( increment() )},
        decrement:()=>{ dispatch( decrement() )}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
```

#### bindActionCreator
bindActionCreator，可以直接将action包装成可以被调用的函数。
```jsx
// actions.js
export var increment = ()=>{
    return {type:"INCREMENT"};
}
export var decrement = ()=>{
    return {type:"DECREMENT"}
}
// app.js
import {connect } from "react-redux";
import {bindActionCreators} from "redux";
import {increment,decrement} from "./actions.js";

//写法一
var mapDispatchToProps = dispatch =>{
    return {
        increment:bindActionCreators(increment,dispatch),
        decrement:bindActionCreators(decrement,dispatch)
    }
}
//写法二
var mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        increment:increment,
        decrement:decrement
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


//使用connect()()创建并暴露一个App的容器组件
自动调用dispatch react-redux 简写
export default connect(
	state => (value: state),
	{
		increment:increment,
		decrement:decrement,
	}
)(App)

```
## 示例

### 目录结构
```
├── src/                         # 项目开发文件目录
│      ├── actions/              # action目录 (Redux)
│      │      └── index.js
│      │
│      ├── canstants/            # 公共常量目录 (Redux)
│      │      └── index.js
│      │
│      ├── reducers/             # reducer目录 (Redux)
│      │      └── index.js
│      │
│      ├── App.js                # 组件
│      │
│      ├── index.js              # 整个程序的入口文件
│      │
```
### canstants/index.js
```jsx
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
```
### actions/index.js
```jsx
import {INCREMENT,DECREMENT} from "../canstants";

export function increment (){
    return {
        type:INCREMENT
    }
}

export function decrement(){
    return {
        type:DECREMENT
    }
}
```
### reducers/index.js
```jsx
import {INCREMENT,DECREMENT} from "../canstants";

const counter = (state = 0,action)=>{
    switch (action.type){
        case INCREMENT:
        return state+1;
        case DECREMENT:
        return state-1;
        default:
        return state;
    }
}

export default counter;
```
### src/index.js
```jsx
import { createStore } from "redux";
import { Provider,connect } from "react-redux";
import reducer from "./reducers";

var store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
```
### src/app.js
```jsx
import { connect} from "react-redux";
import {increment,decrement} from "./actions";
import {bindActionCreators} from "redux";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="number">{this.props.counter}</div>
        <div>
          <button onClick={this.props.increment}>+</button>
          <button onClick={this.props.decrement}>-</button>
        </div>
      </div>
    );
  }
}
//获取状态
const mapStateToProps = state=>{
  return {
    counter:state
  }
}
//获取方法
const mapDispatchToProps = dispath =>{
  return bindActionCreators({
      increment,
      decrement
      },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
```

https://zhuanlan.zhihu.com/p/20597452?refer=purerender
