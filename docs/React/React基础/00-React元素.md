# React元素
> 元素是构成 React 应用的最小单位。

## 什么是React元素
> React元素与DOM元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。

React 元素其实就是一个简单JavaScript对象，一个React 元素和界面上的一部分DOM对应，描述了这部分DOM的结构及渲染效果。

一般我们通过JSX语法创建React 元素，例如：
```jsx
const element = <h1 className='greeting'>Hello, world</h1>;
```
element是一个React 元素。在编译环节，JSX 语法会被编译成对`React.createElement()`的调用，从这个函数名上也可以看出，JSX语法返回的是一个React 元素。上面的例子编译后的结果为：
```js
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```
最终，element的值是类似下面的一个简单JavaScript对象：
```js
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
}
```

## React 元素分类
React 元素可以分为两类：

| 序号 | 类型     | 描述 |
| :---| :------------- |:------------- |
| 1 | DOM类型的元素 | DOM类型的元素使用像h1、div、p等DOM节点创建React 元素，前面的例子就是一个DOM类型的元素 |
| 2 | 组件类型的元素 | 组件类型的元素使用React 组件创建React 元素 |

例如：
```jsx
const ButtonElement = <Button color='green'>确认</Button>;
```
ButtonElement就是一个组件类型的元素，它的值是：
```js
const ButtonElement = {
    type: 'Button',
    props: {
        color: 'green',
        children: '确认'
    }
}
```

对于DOM类型的元素，因为和页面的DOM节点直接对应，所以React知道如何进行渲染。但是对于组件类型的元素，如buttonElement，React是无法直接知道应该把buttonElement渲染成哪种结构的页面DOM，这时就需要组件自身提供React能够识别的DOM节点信息，具体实现方式在介绍组件时会详细介绍。

有了React 元素，我们应该如何使用它呢？其实，绝大多数情况下，我们都不会直接使用React 元素，React 内部会自动根据React 元素，渲染出最终的页面DOM。更确切地说，React元素描述的是React虚拟DOM的结构，React会根据虚拟DOM渲染出页面的真实DOM。
