# React样式

React 组件最终会生成 HTML，所以你可以使用给普通 HTML 设置 CSS 一样的方法来设置 样式。如果我们想给组件添加类名，为了避免命名冲突，React 中需要设置 className prop。此外， 也可以通过 style prop 来给组件设置行内样式，这里要注意 style prop 需要的是一个对象。
```
# className prop
<Component className="btn" />


# style prop
const style = {
    color: 'white',
    backgroundImage: `url(${imgUrl})`,
    transition: 'all'
};
const component = <Component style={style} />;
```

## React使用样式两种方式
- className prop
- style prop

### 绑定样式到style属性


```
class RectBox extends React.Component {
   render() {
  	var RectBoxStyle = {
    	width:100,
        height:100,
        backgroundColor:"#4B8BF4"
    }
    return (
      <div style={RectBoxStyle}></div>
    )
  }
}
ReactDOM.render(<RectBox />, document.querySelector("#app"))
```

### 类名方式添加样式


```
//index.css
.box{
    color:#009494;
    border:1px solid #fa0;
    text-align:center;
    line-height:30px;
}
//绑定该类名
ReactDOM.render(<div className='box'>风萧萧雨兮兮 </div>,document.body);
```



## React样式技巧

### 样式中的像素值
当设置 width 和 height 这类与大小有关的样式时，大部分会以像素为单位，此时若重复输入 px，会很麻烦。为了提高效率，React 会自动对这样的属性添加 px。比如:
```
// 渲染成 height: 10px
const style = { height: 10 };
ReactDOM.render(<Component style={style}>Hello</Component>, mountNode);
```
> 注意，有些属性除了支持 px 为单位的像素值，还支持数字直接作为值，此时 React 并不添 加 px，如 lineHeight
