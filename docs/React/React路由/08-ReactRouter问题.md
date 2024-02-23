# ReactRouter问题
### 路由变了页面没变
错误的地方就在类似这样的代码

写法1
```js
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppContainer));
```
应该写成

写法2
```js
export default withRouter(connect(mapStateToProp, mapDispatchToProp)(AppContainer));
```
原因
connect内是进行shallow comparison浅比较的。它重写了组件的shouldComponentUpdate方法

写法1中，connect重写了withRouter的shouldComponentUpdate方法，导致其不能够响应location的变化（仅仅响应mapStateToProps里面的变化）

写法2中，将withRouter提到外层，withRouter的shouldComponentUpdate不会被重写，就会响应location的变化
