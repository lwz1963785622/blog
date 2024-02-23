# DOM 操作
多数情况下，React的虚拟DOM足以满足我们的需求，不需要直接操作底层真实的DOM。通过将组件组合使用，满足我们的需求。

在某些特殊情况下，为了某些需求不得不去操作底层的DOM。最常见的场景使用一些插件、或要执行一个React没有支持的操作。

### 获取DOM元素
获取DOM节点的引用,我们可以通过以下两种方式获取：
- refs
- ReactDOM.findDOMNode()

## Refs
Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。

下面是几个适合使用 refs 的情况：
- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库

如果可以通过声明式实现，则尽量避免使用 refs。

> 注意：不能在函数式组件上使用 ref 属性。

Refs使用方式有三种类型：
- String 类型的 Refs [旧版API] (不推荐使用)
- 回调 Refs
- React.createRef()API[v16.3]。

### String 类型的 Refs
> 注意：不建议使用，已过时并可能会在未来的版本被移除.

react可以允许我们通过 ref 来定位一个组件。具体的做法是：
先给一个组件设置一个 `ref='xxx'` 的属性，注意这个ref的值必须是全局唯一的。


```js
class Test extends React.Component{
    handleInput(){
        //拿到的是虚拟DOM
        var input = this.refs.city;
        alert(input.value)
    }
    render(){
        return (<div>
            <input ref='city' />
            <button onClick={this.handleInput.bind(this)}>获取Input文本</button>
        </div>);
    }
    componentDidMount(){
        //componentDidMount是在render方法后执行 拿到的是原生DOM元素
        var input = this.refs.city;
        input.focus(); //获取焦点
    }
}

```
</script>

> 注意：可以通过 this.refs.city 来访问这个组件，组件为装载未完成，这里拿到的只是虚拟DOM。

> 注意：只有在render方法执行之后，并且react已经完成了DOM的更新，才能通过 this.refs.city 来拿到原生的DOM元素。


### 回调 Refs
ref属性接收一个回调函数，这个回调函数在组件挂载或者卸载的时候被调用。
当ref用于一个HTML元素的时候，ref指定的回调函数在调用的时候会接收一个参数，该参数就是指定的DOM元素。
```
ref={ el => this.textInput = el }
```
如下面的例子使用ref回调函数来保存对DOM节点的引用：

```js
class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.FocusTextInput = null;
    }
    handleFocus(){
        this.FocusTextInput.focus();
    }
    render(){
        return <div>
            <input type="text" ref={el=>this.FocusTextInput = el} />
            <button onClick={this.handleFocus.bind(this)}>获取焦点</button>
        </div>
    }
}
```
</script>


### React.createRef()
使用 `React.createRef()` 创建 refs，通过 ref 属性来获得 React 元素。当构造组件时，refs 通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们.
```js
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        return <input ref={this.textInput} />;
    }
    componentDidMount(){
        //divDOM
        var div = this.textInput.current
    }
}
```
当一个 ref 属性被传递给一个 render 函数中的元素时，可以使用 ref 中的 current 属性对节点的引用进行访问。
```
const node = this.textInput.current;
```
React 会在组件加载时将 DOM 元素传入 `current` 属性，在卸载时则会改回 `null`。ref 的更新会发生在`componentDidMount` 或 `componentDidUpdate` 生命周期钩子之前。

示例：

```js
class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.FocusTextInput = React.createRef();
    }
    handleFocus(){
        this.FocusTextInput.current.focus();
    }
    render(){
        return <div>
            <input type="text" ref={this.FocusTextInput} />
            <button onClick={this.handleFocus.bind(this)}>获取焦点</button>
        </div>
    }
}
```
</script>



## findDOMNode
当组件渲染到页面上之后(mounted)，你都可以通过 react-dom 提供的 `findDOMNode()` 方法拿到组件对应的 DOM 元素。
```
ReactDOM.findDOMNode(component);
```
> 注意：component 为当前组件 this.findDOMNode() 只能用于组件已经被渲染到DOM中情况。

示例：

```js
class Test extends React.Component{
	constructor(props){
		super(props);
		this.el = null;
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return <div>
			<input type="text" />
			<button>获取焦点</button>
		</div>
	}
	handleClick(){
		var input = this.el.querySelector('input[type=text]');
		input.focus();
	}
	componentDidMount(){
		this.el = ReactDOM.findDOMNode(this);
		var button = this.el.querySelector('button');
		button.addEventListener('click',this.handleClick)
	}
}
```
</script>
