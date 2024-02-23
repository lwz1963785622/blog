# Redux介绍
> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

Redux最主要是用作应用状态的管理。

**官方网站**

|名称| 地址|
|-------|-------------------------------------------------|
|官网    | [http://redux.js.org](http://redux.js.org)     |
|中文官网 |[http://cn.redux.js.org](http://cn.redux.js.org)|


## 为什么需要Redux？
> 项目较小，人员较少，数据管理不复杂不需要Redux

### 为什么需要Redux？

![why](/img/React/why.png)

### 什么时候使用Redux？
![useRedux](/img/React/useRedux.png)


无论是移动端还是 pc 端，当你使用 React 或者 vue 开发组件化的 SPA 程序时，组件之间共享信息是一个非常大的问题。例如，用户登录之后客户端会存储用户信息（如userid、头像等），而系统的很多个组件都会用到这些信息，例如收藏、点赞、评论等。这些组件在用到用户信息时，难道每次使用都重新获取一遍？———— 自然不是这样。因此每个系统都需要一个管理多组件使用的公共信息的功能，这就是 Redux 的作用。


如果你的应用有以下场景，可以考虑使用 Redux:
1. 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据
- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态


## Redux 三大原则
想要理解Redux，必须要知道Redux设计和使用的三大原则。
### 1. 单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
### 2. 状态是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
### 3. 状态的修改均由纯函数完成
为了描述 action 如何改变 state tree ，你需要编写 reducers。


## 基本概念
redux中有三个基本概念，**Action**，**Reducer**，**Store**。

类型   |  描述
-------|----------------------------------------
Action | 是个对象，必须包含type这个属性，reducer将根据这个属性值来对store进行相应的处理。除此之外的属性，就是进行这个操作需要的数据。
Reducer | 是个函数。接受两个参数：要修改的数据 state 和 action 对象。根据 action.type 来决定采用的操作，对state进行修改，最后返回新的state。
Store | 是个对象，贯穿你整个应用的数据都应该存储在这里。

### Action
> Action 的任务是描述“发生了什么事情？”

Action 是一个普通对象。redux约定 Action 内使用一个字符串类型的 type 字段来表示将要执行的动作。
```
{
  type: 'ADD_ITEM'
}
```
除了 type 之外，Action可以存放一些其他的想要操作的数据。例如：
```
{
  type: 'ADD_ITEM',
  text: 'Hello King'
}
```
但在实际应用中，我们需要一个函数来为我们创建Action。这个函数叫做actionCreator。它看起来是这样的：
```
function addItem(text) {
  return {
    type: types.ADD_ITEM,
    text
  }
}
```

### Reducer
> Reducer 是一个普通的回调函数。它的任务是根据传入的Action对象去修改状态树。

当它被Redux调用的时候会为他传递两个参数State 和 Action。

Reducer会根据 Action 的type来对旧的 State 进行操作。返回新的State。

或者简单地讲 Reducer就是一个纯函数，根据传入的 当前state和action,返回一个新state：
```
(state,action) => newState
```

比如我们这个例子中的Reducer应该是这样的：
```
const initialState = {
	text:'hello world'
}

function Reducer(state=initialState,action){
	switch(action.type){
		case 'CHANGE_TEXT':
			return {
				text:'Hello Stark'
			}
		default:
			return state;
	}
}
```
### Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供createStore这个函数，用来生成 Store。
```
# 创建Store非常简单。createStore 有两个参数，Reducer 和 initialState。

import {createStore} from 'redux';
const store = createStore(rootReducers, initialState);
```

```
const store = createStore(fn);
```
> **注意**：一个应用只有一个Store。

## React 与 Redux结合
Redux是一款状态管理库，并且提供了`react-redux`库来与React亲密配合，下图对其关系进行很好的展示：

![reactvsredux](/img/React/reactvsredux.png)


## 参考

名称   |  地址
--------------|--------------
Redux 关系图解| https://segmentfault.com/a/1190000011473973
