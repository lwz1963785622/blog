# React动画
动画就是使用页面局部的快速更新让人们产生动态效果的感觉。

动画可以帮助用户理解页面，增加应用的趣味性和可玩性，提高用户体验。有时候，一个好的加载动画甚至要比优化数据库、减少等待时间要有效得多。

React 通过 setState 让界面迅速发生变化，但动画的哲学告诉我们，变化要慢，得用一个逐渐变化的过程来过渡，从而帮助用户理解页面。

界面的变化可以分为 DOM 节点(或组件)的增与减以及 DOM 节点(或组件)属性的变化。 其中 React 提供的 TransitionGroup 能够帮助我们便捷地识别出增加或删除的组件，从而让我们能够专注于更加简单的属性变化的动画。

## React实现动画方式
React实现动画有两种方式：

1. CSS渐变组     
简化了将CSS动画应用于渐变的过程，在合适的渲染和重绘时间点有策略的添加和移除元素的class。
2. 间隔动画     
以牺牲性能为代价，提供更多的可扩展性和可控性。需要更多次的渲染，但同时也允许为css之外的内容（比如滚动条位置以及canvas绘图）添加动画。

### CSS渐变组
ReactCSStransitionGroup是在插件类ReactTransitionGroup这个底层API基础上进一步封装的高级API，来简单的实现基本的CSS动画和过渡。

#### 安装react-addons-css-transition-group
```npmignore
npm install react-addons-css-transition-group --save
```

#### 引用
```npmignore
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm
```
> 浏览器端使用：引入文件
`<script src="../libs/react-with-addons.min.js"></script>`


ReactCSSTransitionGroup组件常用属性介绍：
1. transitionName:关联CSS类，需要自己实现css动画实现的类。如`transitionName="box"`，那么你需要在css写以下类，分别是进入前后的状态和离开前后的状态
2. `transitionEnterTimeout` 进入动画执行的时间
3. `transitionLeaveTimeout` 离开的动画执行的时间

假设我们有一个需要淡入淡出的需求:
```css
//animate.less
.box-enter {
  opacity: 0.01;
}

.box-enter.box-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.box-leave {
  opacity: 1;
}

.box-leave.box-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}

//
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './animate.less'
class Animate extends React.Component{
	constructor(){
		super(...arguments);
		this.state = {
			show:false,
			lists:['海阔天空','在心里从此有个你','霸王别姬']
		}
	}
	render(){
		var items = this.state.lists.map((item,index)=>{
			return <div key={index} onClick={this.handleRemove.bind(this,index)}>{item}</div>
		})
		return <div>
			<button onClick={this.handleAdd.bind(this)}>切换</button>
			<ReactCSSTransitionGroup
				transitionName="box"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
			>
				{items}
			</ReactCSSTransitionGroup>

		</div>
	}
	handleAdd() {
	var newLists =this.state.lists.concat(['Enter some text']);
		this.setState({lists: newLists});
	}
	handleRemove(i) {
		var newLists = this.state.lists.slice();
		newLists.splice(i, 1);
		this.setState({lists: newLists});
	}
}
```
这样便轻松地实现了新增元素、删除元素的动画。

需要注意的地方是你要为 ReactCSSTransitionGroup 的子组件提供一个关键key，这个key是为了让React知道你添加了什么以及删除了什么。

> **禁止动画** 当你需要禁止动画时只需要设置 `transitionEnter={false}` 或者 `transitionLeave={false} `。
