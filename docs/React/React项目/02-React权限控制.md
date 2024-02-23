# React权限控制
权限控制是中后台系统中常见的需求之一。权限控制一般分为两个维度：**页面级别** 和 **页面元素级别**。

- 页面级别
- 页面元素级别
    - 模块权限-页面区块（组件）是否显示
    - 元件权限-组件内元素是否显示

## 页面级别
在这个方法里面，通过sessionStorage判断是否登录了，如果没有登录，就保存一下当前想要跳转的路由到redux里面。然后跳转到我们登录页。

### Route再封装实现
```jsx
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        const isLogged = sessionStorage.getItem("token") !== null ? true : false;
        return <Route {...rest} render={props => {
            return isLogged ? <Component {...props} /> : <Redirect to="/" />;
        }} />
    }
}

export default AuthRoute;
```
### 高阶组件实现
```jsx
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
const AuthRoute = (WrappedComponent) => {
    return class extends Component {
        render() {
            let { component: Component, ...rest } = this.props;
            let isLogged = sessionStorage.getItem("token") !== null ? true : false;
            return <WrappedComponent {...rest} render={props => {
                return isLogged ? <Component {...props} /> : <Redirect to="/" />;
            }} />
        }
    }
}
export default AuthRoute(Route);
```


## 页面元素级别
后端会将用户权限数据同步注入到VM模板中或者前端发送异步请求取到权限数据，数据消费场景一般都散落在代码的角角落落。
```jsx
// 伪代码
render(){
    return {window.permission?<Component/>:null}
}

render(){
    return <Component>{this.props.permission?<Button>删除</Button>: null}</Component>
}
```
用这种方式实现的代码，执行上没有问题，也达到了业务的需求。但是随着代码量的递增，代码变得难以维护，特别是新接手的同学，简直是一场噩梦。



- https://yq.aliyun.com/articles/609672?utm_content=m_1000006026
- https://segmentfault.com/a/1190000008829420?utm_source=tuicool&utm_medium=referral
- https://segmentfault.com/a/1190000014691570
