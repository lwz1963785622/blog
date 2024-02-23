# ReactAPI

React 中一切都是组件。我们通常将应用程序的整个逻辑分解为小的单个部分。元素是构成组件的一个部分。

## React.createElement()

`React.createElement()` 方法创建并返回一个给定类型的React元素。

``` js
React.createElement(
    type,
    [props],
    [...children]
)
```

| 参数               | 必选 | 描述                                 |
|-------------------|------|-------------------------------------|
| type              | 是   | 标签名（如'div'or 'span'）, React组件  |
| props             | 否   | 对象/null，该标签的属性                |
| ...children       | 否   | 该元素的子节点                        |

创建React元素

``` js
var li1 = React.createElement('li', {className:'text'}, 'First Text Content');
var li2 = React.createElement('li', null, 'Second Text Content');
var li3 = React.createElement('li', null, 'Third Text Content');
var uls = React.createElement('ul', { className: 'list' }, li1, li2, li3);
```

`React.createElement()` 方法的返回值是类似下面的一个简单JavaScript对象：

``` js
const element = {
    type: 'li',
    props: {
        className: 'text',
        children: 'First Text Content'
    }
}
```

## ReactDOM.render()方法

基本语法

``` js
ReactDOM.render(component | element, DOM, callback)
```

`ReactDOM.render()` 是 React 的最基本方法, 用于将组件或元素转为HTML, 并插入指定的 DOM 节点。

渲染组件到指定位置 render 方法带有三个参数：

| 参数               | 描述                    |
|-------------------|-------------------------|
| component/element | 要渲染的元素 或 组件       |
| DOM               | 组件或元素渲染到指定DOM位置 |
| function(){}      | 组件渲染完成后回调函数      |

示例

``` js
ReactDOM.render( <
    h2 > hello world! < /h2>,/ / html模板 document.getElementById('container'), //要插入到container这个节点中
    function() {
        console.log('渲染完成'); //渲染完成 输出此文本
    }
)
```


## 定义组件

> React组件和React元素关系密切，React组件最核心的作用是返回React元素。

在React中定义组件方式主要有两种：

* 函数式定义的无状态组件
* ES6 Class 定义的组件

### 函数定义组件

定义一个组件最简单的方式是使用JavaScript函数：

``` js
function Welcome(props) {
    return <h1 > Hello, {
        props.name
    } < /h1>;
}
```


该函数是一个有效的React组件，它接收一个单一的“props”对象并返回了一个React元素。我们之所以称这种类型的组件为函数定义组件，是因为从字面上来看，它就是一个JavaScript函数。

Welcome组件返回的React 元素为：

``` 
{
    type: 'h1',
    props: {
        children: 'Hello, React'
    }
}
```

### 类定义组件

``` js
# ES6语法
class Welcome extends React.Component {
    render() {
        return <h1 > Hello, {
            this.props.name
        } < /h1>;
    }
}
```


> ⚠️警告:<br>

1. 创建组件方法必写参数 render方法
* 返回组件名第一字母大写(驼峰)

在React V16中，render方法支持直接返回string，number，boolean，null，portal，以及fragments(带有key属性的数组)，这可以在一定程度上减少页面的DOM层级。

``` js
//element
render(){
	return <div></div>
}
//string
render(){
	return 'hello,world'
}

//number
render(){
	return 12345
}

//boolean
render(){
	return isTrue?true:false
}

//null
render(){
	return null
}

//fragments，未加key标识符，控制台会出现warning
render(){
	return [
    	<div>hello</div>,
    	<span>world</span>,
    	<p>oh</p>
	]
}
```

以上各种类型现在均可以直接在render中返回，不需要再在外层包裹一层容器元素，不过在返回的数组类型中，需要在每个元素上加一个唯一且不变的key值，否则控制台会报一个warning。

## 组件渲染

``` js
# ES6语法
class Welcome extends React.Component {
    render() {
        return <h1 > Hello, {
            this.props.name
        } < /h1>;
    }
}

# 渲染组件语法与普通dom一致
ReactDOM.render(<Welcome name='King'/>,document.querySelector('#app'))
```

这个例子中发生了什么：

1. 我们对`<Welcome name='King' />`元素调用了`ReactDOM.render()`方法。
* React将`{name: 'King'}`作为props传入并调用Welcome组件。
* Welcome组件将`<h1>Hello, King</h1>`元素作为结果返回。
* React DOM将DOM更新为`<h1>Hello, King</h1>`。

> ⚠️警告:<br>

组件名称必须以大写字母开头。<br>
例如，<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。

示例

``` js
class Title extends React.Component {
    render() {
        return ( <
            div >
            <
            h3 > Hello world! < /h3> <
            /div>
        )
    }
}
ReactDOM.render( < Title / > , document.querySelector('#app'))
```

