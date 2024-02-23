# ReactRouter项目案例

在目录 src/route.js 定义路由：
```js
//导入页面
import { Login, Main, Dashboard, ExamOnline, ExamMine, System, Password, Personal, NotFound } from "pages";

//定义路由
export default [
	{
		path: '/',
		exact: true,
		component: Login
	},
	{
		path: '/main',
		component: Main,
		children: [
			{
				path: '/main/',
				exact: true,
				component: Dashboard,
				meta: {
					icon: 'icon-dashboard2',
					title: '仪表盘',
					visible: true
				}
			},
			{
				path: '/main/examonline',
				component: ExamOnline,
				meta: {
					icon: 'icon-icon-kaoshijilu',
					title: '在线考试',
					visible: true
				}
			},
			{
				path: '/main/exammine',
				component: ExamMine,
				meta: {
					icon: 'icon-bishi',
					title: '我的考试',
					visible: true
				}
			},
			{
				path: '/main/system',
				component: System,
				meta: {
					icon: 'icon-weixiu',
					title: '系统设置',
					visible: true
				},
				children: [
					{
						path: '/main/system/password',
						component: Password,
						meta: {
							icon: 'icon-yuan',
							title: '修改密码'
						}
					},
					{
						path: '/main/system/personal',
						component: Personal,
						meta: {
							icon: 'icon-yuan',
							title: '个人信息'
						}
					}
				]
			},
			{
				component: NotFound,
				meta: { visible: false }
			}
		]
	},
	{
		component: NotFound
	}
]
```

在src/index.js入口页面：
```js
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

ReactDOM.render(
	<Router>
		<App />
	</Router>
	, document.getElementById('root')
);
```

在src/App.js下遍历路由：
```js
import React, { Component } from 'react';
// Switch 匹配唯一路由
import { Route, Switch } from "react-router-dom";
// AuthRoute 页面登录权限验证
import { AuthRoute } from "components"
import routes from "./route";

import "./assets/css/index.scss";
class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					{routes.map(v => {
						if (v.path) {
							return v.path === '/' ? <Route path={v.path} exact={v.exact ? true : false} component={v.component} key={v.path} /> : <AuthRoute path={v.path} exact={v.exact ? true : false} component={v.component} key={v.path} />
						} else {
							return <Route component={v.component} key={'NotFound'} />
						}
					})}
				</Switch>
			</div>
		);
	}
}

export default App;
```
