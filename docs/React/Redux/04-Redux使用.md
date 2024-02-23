# Redux使用

类别    | 方法
------------|-----------------
redux核心 |  store, action, reducer
合并reducer | combineReducers
创建store | createStore
store方法  |  getState, dispatch, subscribe


## 导入Redux
```
import {bindActionCreators, combineReducers, createStore} from 'redux';
```
## 基本使用
通过一个示例介绍Redux基本用法：

计数案例：有一个容器显示当前数字，点击+按钮数字+1，点击-按钮数字-1。

### Action
> Action 是一个普通对象。redux约定 Action 内使用一个字符串类型的 type 字段来表示将要执行的动作。

#### Action对象
Action操作有2个: 加(INCREMENT)，减(DECREMENT)。
```
{
    type:"INCREMENT"
}

{
    type:"DECREMENT"
}
```
#### Action创建函数(Action Creator)
> Action Creator 是创建一个action的函数，函数返回一个对象。

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```jsx
//actions.js
export const increment = ()=>{
    return {type:"INCREMENT"};
}
export const decrement = () => {
    return {type:"DECREMENT"};
}
```
> increment和decrement 就是 Action Creator。

使用的时候直接`store.dispatch(increment());`就可以。

### Reducer
Reducer就是一个纯函数，根据传入的 当前state和action,返回一个新state：

```jsx
// 数据只是一个数值，默认定义为0:
const reducer = (state=0,action)=>{
    switch(action.type){
        case "INCREMENT":
        return state+1;
        break;
        case "DECREMENT":
        return state-1;
        break;
        default:
        return state;
    }
}
```

### Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供`createStore(reducer)`这个函数，用来生成 Store。
```
var store = createStore(reducer);
```
通过store的`getState()` 方法获取state:
```
let state = store.getState();
console.log(state); //0
```
通过store的`dispatch(action)`方法生成新的state:
```
store.dispatch({type:"INCREMENT"})   //1   0+1
store.dispatch({type:"INCREMENT"})   //2   1+1
store.dispatch({type:"INCREMENT"})   //3   2+1
store.dispatch({type:"DECREMENT"})   //2   3-1
```
通过store的`subscribe(listener)` 监听state变化:
```
store.subscribe(function(){
    let state = store.getState();
    console.log(state);
})
```

### 完整示例

```js
//reducer
const reducer = (state=0,action)=>{
    switch(action.type){
        case "INCREMENT":
        return state+1;
        break;
        case "DECREMENT":
        return state-1;
        break;
        default:
        return state;
    }
}

//store
var store = Redux.createStore(reducer);
store.subscribe(function(){
    let state = store.getState();
    console.log(state);
})

store.dispatch({type:"INCREMENT"})   //1   0+1
store.dispatch({type:"INCREMENT"})   //2   1+1
store.dispatch({type:"INCREMENT"})   //3   2+1
store.dispatch({type:"DECREMENT"})   //2   3-1
```
</script>
