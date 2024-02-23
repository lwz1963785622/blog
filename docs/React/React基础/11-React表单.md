# React表单
表单是应用必不可少的一部分，只要需要用户输入，哪怕是最简单的输入，都离不开表单。

React组件的核心理念就是可预知性和可测试性。给定同样的props和state，任何React组件都会渲染出异样的结果。表单也不例外。

## React两种类型表单组件
在React中，表单组件有两种类型：
- 约束组件
- 无约束组件

约束性组件，简单的说，就是由React管理了它的value，而非约束性组件的value就是原生的DOM管理的。

### 无约束表单
非约束性组件这么写：
```js
<input type="text" defaultValue="name" />
```
这个 defaultValue 其实就是原生DOM中的 value 属性。这样写出的来的组件，其value值就是用户输入的内容，React完全不管理输入的过程。

### 约束性组件
约束性组件是这么写的：
```js
<input type="text" value={this.state.name} onChange={this.handleChange} />

//...省略部分代码
handleChange: function(e) {
  this.setState({name: e.target.value});
}
```

这里，value属性不再是一个写死的值，他是 this.state.name，而 this.state.name 是由 this.handleChange 负责管理的。
这个时候实际上 input 的 value 根本不是用户输入的内容。而是onChange 事件触发之后，由于 this.setState 导致了一次重新渲染。不过React会优化这个渲染过程，实际它依然是通过设置input的value来实现的。

但是一定要注意，约束性组件显示的值和用户输入的值虽然很多时候是相同的，但他们根本是两码事。约束性组件显示的是 this.state.name 的值。你可以在handleChange中对用户输入的值做任意的处理，比如你可以做错误校验。

示例：输入值转换成大写
```js
class Name extends React.Component{
	constructor(){
    	super();
        this.state = {
        	name:'allcky'
            };
    }
    handleChange(event){
        this.setState({
            name:event.target.value.toUpperCase()
        })
    }
    render(){
        return <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} />
    }
}

ReactDOM.render(<Name/>,document.querySelector('#app'))
```


对比约束性组件和非约束性组件的输入流程：

非约束性组件： 用户输入A -> input 中显示A

约束性组件： 用户输入A -> 触发onChange事件 -> handleChange 中设置 state.name = “A” -> 渲染input使他的value变成A


## 表单控件
### Label
Label是表单元素中很重要的组件，通过label可以明确的向用户传达你的要求，提升单选和复选框的可用性。

但是label与for属性有一个冲突的地方。因为如果使用JSX，for 变成了htmlfor 。

### 文本框与Select
React对`<textarea/>` 和 `<select/>` 的接口做了一些修改，提升了一致性，让他们操作起来更容易。

#### textarea
`<textarea/>`被改的更像`<input/>`了，允许我们设置value 和defaultValue。

```
# 非约束的
<textarea defaultValue="hello world" />

# 约束的
<textarea value={this.state.helloTo} onChange={this.handleChange} />
```
#### select
`<select/>`现在接受value和defaultValue来设置已选项，我们可以更容易地对它的值进行操作。

```js
# 非约束
<select defaultValue="sw">
    <option value="ks">看书</option>
    <option value="wyx">玩游戏</option>
    <option value="dy">电影</option>
</select>

# 约束的
<select value={this.state.fav} onChange={this.handleChange}>
    <option value="ks">看书</option>
    <option value="wyx">玩游戏</option>
    <option value="dy">电影</option>    
</select>
```

### 复选框和单选框
复选框和单选框使用的则是另外一种完全不同的控制方式。
#### 单选框
约束的
```js
var Radio = React.createClass({
　　getInitialState: function() {
　　　　return {gender: '男'};
　　},
    render: function() {
　　　　return (<div>
　　　　　　　　　　<input type='radio' name='gender' value='男' checked={this.state.sex == '男'} onChange={this.handlerChange} />男
　　　　　　　　　　<input type='radio' name='gender' value='女' checked={this.state.sex == '女'} onChange={this.handlerChange} />女
　　　　　　　　</div>);   
　　},
　　handlerChange: function(event) {
　　　　this.setState({gender: event.target.value});
　　}
});
```
设置单选框的defaultChecked会使其变为无约束组件。
```
<input type='radio' defaultChecked='true' />
```
#### 复选框
约束的
```js
var CheckBox = React.createClass({
　　getInitialState: function() {
　　　　return {basketBall: false, swim: false, sing: false};
　　},
　　render: function() {
　　　　return (<div>
　　　　　　　　　　<p>爱好：</p>
　　　　　　　　　　<input type='checkbox' checked={this.state.basketBall} value='basketBall' onChange={this.handlerChange} />篮球
　　　　　　　　　　<input type='checkbox' checked={this.state.swim} value='swim' onChange={this.handlerChange} />游泳
　　　　　　　　　　<input type='checkbox' checked={this.state.sing} value='sing' onChange={this.handlerChange} />唱歌
　　　　　　　　</div>);   
　　},
　　handlerChange: function(event) {
　　　　var type = event.target.value,
　　　　　　 checked = event.target.checked,
　　　　　　 newState = {};
　　　　newState[type] = checked;
　　　　this.setState(newState);
　　}
});
```
设置复选框的defaultChecked会使其变为无约束组件。
```
<input type='checkbox' defaultChecked='true' />
```
### Focus
控制表单组件的focus可以很好地引导用户按照表单逻辑逐步填写，而且还可以减少用户的操作，增强可用性。

React实现了autoFocus属性，在组件第一次挂载时，如果没有其他表单域聚焦时，React就会把焦点放到这个组件对应的表单域中。

#### autoFocus
```
<input type='text' name='given_name' autoFocus="true" />
```
#### DOM操作方式
```js
var GetName = React.createClass({
    render:function(){
        return (<input type="text" name="given_name" ref="givenName" />)
    },
    componentDidMount:function(){
        var inputName = this.refs.givenName.getDOMNode();
        inputName.focus();
    }
})
```


## 表单事件
访问表单事件是控制表单不同部分的一个非常重要的方面。

React支持所有HTML事件，这些事件遵循驼峰命名的约定。这些事件是标准化的，提供了跨浏览器的一致接口。

所有的事件都提供了event.target来访问触发事件的DOM节点。
```js
handleEvent:function(event){
    var DOMNode = event.target;
    var newValue = DOMNode.value;
}
```
这是访问约束组件的值得最简单方式之一。
