# Redux安装


| 名称 |  版本 |安装 | 大小  |
|-----|-----|------|------|
| redux| [![redux-status]][redux-package] |  `npm install --save redux` | ![redux-size] |
| react-redux| [![react-redux-status]][react-redux-package] |  `npm install --save react-redux` | ![react-redux-size] |

[redux-status]: https://img.shields.io/npm/v/redux.svg
[redux-package]: https://npmjs.com/package/redux
[redux-size]: https://packagephobia.now.sh/badge?p=redux

[react-redux-status]: https://img.shields.io/npm/v/react-redux.svg
[react-redux-package]: https://npmjs.com/package/react-redux
[react-redux-size]: https://packagephobia.now.sh/badge?p=react-redux
### redux
redux是独立的应用状态管理工具。它是可以独立于react之外的。
```
npm install --save redux
```
### react-redux
如果我们需要在react当中运用它，那么我们需要手动订阅store的状态变化，来对我们的react组件进行更新。那么react-reudx这个工具：
```
npm install --save react-redux
```

我们可以使用Redux <a href="https://github.com/gaearon/redux-devtools" target="\__blank">开发者工具</a>。


```
npm install --save-dev redux-devtools
```
> 开发者工具：开发者可以用Redux的开发工具去实时追踪、回退和重放程序中action与state的每个变化。

### 引入
```
import {bindActionCreators, combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
```
