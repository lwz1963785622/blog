# Redux-thunk
Redux本身只能处理同步的Action，但可以通过中间件来拦截处理其它类型的action，比如函数(Thunk)，再用回调触发普通Action，从而实现异步处理，在这点上所有Redux的异步方案都是类似的。

## 异步 Action
比如 action 中有`setTimeout`或者通过`fetch`通用远程API这些场景，那么就应该使用 redux-thunk 了。

当调用异步 API 时，有两个非常关键的时刻：
- 发起请求的时刻
- 接收到响应的时刻（也可能是超时）。

这两个时刻都可能会更改应用的 state；为此，你需要 dispatch 普通的同步 action。一般情况下，每个 API 请求都需要 dispatch 至少三种 action：

- 一种通知 reducer 请求开始的 action。   
对于这种 action，reducer 可能会切换一下 state 中的 isFetching 标记。以此来告诉 UI 来显示加载界面。

- 一种通知 reducer 请求成功的 action。   
对于这种 action，reducer 可能会把接收到的新数据合并到 state 中，并重置 isFetching。UI 则会隐藏加载界面，并显示接收到的数据。

- 一种通知 reducer 请求失败的 action。   
对于这种 action，reducer 可能会重置 isFetching。另外，有些 reducer 会保存这些失败信息，并在 UI 里显示出来。

为了区分这三种 action，可能在 action 里添加一个专门的 status 字段作为标记位：
```
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```
又或者为它们定义不同的 type：
```
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

## redux-thunk
> redux-thunk 是一个比较流行的 redux 异步 action 中间件。

redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响。

### 安装
```
npm install redux-thunk --save
```
### 使用
```
import { createStore ,applyMiddleware } from "redux";
import thunk from "redux-thunk";
const store = createStore(reducer,applyMiddleware(thunk))
```
### 异步的方法
```js
//同步action
const increment = ()=>{
    return {
        type:INCREMENT
    }
}
//异步action
const incrementAsync = ()=>{
    return dispatch=>{
        setTimeout(function(){
            dispatch(increment())
        },3000)
    }
}

```

## 异步
```js
export const getUser = () =>{
    return dispatch=>{
        //触发加载 action
        dispatch({type:GET_USER_REQUEST})
        fetch('https://randomuser.me/api/')
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            //加载成功 action
            dispatch({type:GET_USER_SUCCESS,data:data.results[0]})
        })
        .catch(error=>{
            //加载失败 action
            dispatch({type:GET_USER_ERROR,error})
        })
    }
}
```

## 附录
类型    | 地址
--------|------------------------
测试API | https://randomuser.me/api/
redux-thunk源码分析 | https://segmentfault.com/a/1190000010154828
https://segmentfault.com/a/1190000017055752

https://segmentfault.com/a/1190000007248878
https://blog.csdn.net/liwusen/article/details/80980987
https://www.jianshu.com/p/759a3b7b9a3f
