##  一. 网站开发流程

1. 项目规划
2. 平台规划
3. 程序开发
    - 前端web开发
    - 后端开发
4. 网站测试

##  二、开发工具

编辑器、浏览器

##  各种兼容的meta

```html

  <!-- 兼容ie -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 高速渲染页面 -->
    <meta name="renderer" content="webkit">

    <!-- seo:提高搜索度 -->
    <meta name="keywords" content="">

    <meta name="description" content="">
```

## . 适配iPhoneX

> 我们需要将顶部和底部合理的摆放在安全区域内，iOS11新增了两个CSS函数env、constant，用于设定安全区域与边界的距离。

函数内部可以是四个常量：

``` css

safe-area-inset-left：安全区域距离左边边界距离
safe-area-inset-right：安全区域距离右边边界距离
safe-area-inset-top：安全区域距离顶部边界距离
safe-area-inset-bottom：安全区域距离底部边界距离
```

::: warning
* 注意：我们必须指定viweport-fit后才能使用这两个函数：
:::

```js

<meta name="viewport" content="width=device-width, viewport-fit=cover">
复制代码
constant在iOS < 11.2的版本中生效，env在iOS >= 11.2的版本中生效，这意味着我们往往要同时设置他们，将页面限制在安全区域内：
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

当使用底部固定导航栏时，我们要为他们设置padding值：
{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

具体细节
aotu.io/notes/2017/…
4.关于横屏
js识别
window.addEventListener("resize", ()=>{
    if (window.orientation === 180 || window.orientation === 0) { 
      // 正常方向或屏幕旋转180度
        console.log('竖屏');
    };
    if (window.orientation === 90 || window.orientation === -90 ){ 
       // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
        console.log('横屏');
    }  
});
复制代码
css识别
@media screen and (orientation: portrait) {
  /*竖屏...*/
} 
@media screen and (orientation: landscape) {
  /*横屏...*/
}
```

##   二、HTML

### 1. 什么是html?

> 中文：超文本标记语言，由浏览器解释执行。

### 2. html框架

``` html
<!-- html版本号 ,告诉浏览器以某个(html5)版本解释执行该html文件-->
<!DOCTYPE html>
<html>
<!--头部标签-->

<head>
    <!-- 当前页面的字符编码格式，防止中文乱码 -->
    <meta charset="utf-8" />
    <title>标题部分</title>
</head>
<!--会经常编辑的标签，页面的结构全部都写在body里面-->

<body>
    写主体部分
</body>

</html>
```

### 3. 注释

ctrl+/ 作用：使代码无效

### 4. 语法

<标签名>内容</标签名>

### 5. 常用标签介绍

1. div

    <div class="box"></div>
    .box{}

``` html
    <div>这是一个div标签</div>
```

2. 图片标签

    <div class="box"></div>
    .box{}

``` html
    <img src="a.jpg" title="图片的标题" alt="图片找不到">
```

    - `src`=>引入图片的内容
    - `title`=>鼠标移入，图片设置的标题
    - `alt`=>图片加载失败，找不到时显示的内容
3. 超链接标签

    <div class="box"></div>
    .box{}

``` html
    <a href="https://www.baidu.com" target="_self" title="点我跳转">点我</a>
```

    - href=>跳转页面的地址
    - target=>跳转的方式
        - _blank: 在新的窗口跳转
        - _self:(默认)在当前窗口打开
    - title=>鼠标移入提示的内容

``` html

其实可以利用<img>图片标签的onerror事件对其处理的，要求其加载失败之后，马上加载一张默认图片，而不是显示为红叉叉。

其代码如下：

[html] view plain copy
<img src="s.png" onerror="javascript:this.src='xx.png';this.width=80;this.height=80;" />  
意为，如果加载s.png这张图片失败了，就马上去加载xx.png这张图片，同时xx.png这张图片要求其以80x80的方式加载。
当然，如果你要设置更多属性，完全可以写成这样：

[html] view plain copy
<img src="s.png" onerror="onErrorHandle(this)" />  
声明这个s.png加载失败的javascript处理函数是onErrorHandle，然后把自己，也就是这个img节点传过去，
然后在javascript中写一个这样的onErrorHandle函数：

[javascript] view plain copy
function onErrorHandle(obj){  
    obj.src="xx.png";  
    obj.width=80;  
    obj.height=80;  
    }  
xx.png。
但问题来了，如果xx.png 也不存在，则继续触发 onerror，导致循环，故会出现打开网页时提示 Stack overflow at line: 0错误。
特别说明：如果图片存在，但网络很不通畅，也可能触发 onerror。
解决方法：
第一种：去掉 onerror 代码；或者更改 onerror 代码为其它；或者确保 onerror 中的图片足够小，并且容易加载而存在。
第二种：控制它不循环，代码如下：
<script type="text/javascript">
<!–
function nofind(){
var img=event.srcElement;
img.src="images/xx.png";
img.οnerrοr=null; 控制不要一直跳动
}
//–>
</script> 

<img src="images/logo.png" οnerrοr="nofind();" />
```

**注意**

1. 属性与属性之间要有空格
2. 创建html主体的快捷方式  `！+tab`
3. 标签的快捷方式 `标签名+tab`

### 6. 标签的分类

* 1. 块标签 div（无意义的块标签）、h1~h6、p、ul li、ol li

特点：独占一行，能设置宽高
转换：display:block; 

* 2. 行内标签 a span(无意义) i

特点：不会独占一行，不可以设置宽高
转换：display:inline; 

* 3. 行内块标签 img

特点：不会独占一行，可以设置宽高
转换：display:inline-block; 

h1~h6 一级标题标签~六级标题标签
span   文本标签
p  段落标签
i 斜体标签
b 粗体
s 删除线  del
ul li 无序列表标签（成对使用）
ol li 有序列表标签（成对使用）

### 7. 路径问题

1. 绝对路径

> 从根目录或者盘符开始，依次往下找

2. 相对路径
* (1)参考文件与目标文件在同一级

``` html
<img src="a.jpg" alt="">
```

* (2)参考文件与目标文件所在的文件夹在同一级

```html  
<img src="img/a.jpg" alt="">

``` 

* (3)参考文件所在的文件夹与目标文件在同一级，向上返回一级一个../

```html
<img src="../../a.jpg" alt="">
```

##  三、css

### 1. 什么是css?

> 中文：层叠样式表，由浏览器解释执行。

### 2. 语法

``` 

选择器{
    属性:属性值;
    属性:属性值;
    属性:属性值;
}
```

* 选择器：选中html页面中的元素。
* 属性：宽、高、颜色
* 属性值：100px、red
* 标点符号必须为英文状态。

### 3. css引入方式

* 1. 外部引入

``` html
<!--在html文件的head标签中-->
<link rel="stylesheet" href="day.css">
```

* 2. 嵌入式(在html页面中通过style标签写样式)

``` css

<style>
    div{
        width:100px;
        height: 100px;
        background-color:red;
    }
</style>
```

* 3. 行内样式

给标签添加style属性

``` html
<div style="width:100px;height: 100px;background-color:yellow; ">好好听课</div>
```

* 4.@import

@import "day.css"; 

* 优先级
    1. 行内样式优先级最高
    2. 其他的样式表，优先级一样，按照导入的顺序来确定他们是否起作用。

### 4. 选择器

#### 1. 基础选择器

*（通用选择器）、标签选择器、类名选择器、id选择器、后代选择器、交叉选择器、群组选择器
浏览器默认样式<通用选择器<标签选择器<类名选择器<id选择器
 1. 标签选择器
 

``` html

    <div></div>
    div{}
 ```  
 2. 类名选择器
 ```html

    <div class="box"></div>
    .box{}

 

``` 

 3. id选择器（id名是唯一的）
 ```html

    <div id="box1"></div>
    #box1{}

 

``` 

 
 
    优先级
        id选择器>类名选择器>标签选择器
    权重  100       10       

4. 通用选择器（优先级最低）

```css
 *{
   margin:0;
   padding:0;
    
}
```

5. 后代选择器

``` html
<div class="box">
    <div class="small">
        </dic>
    </diV>
    .box .small{}
```

 6. 交叉选择器
 

``` css
  li.box {
      background: yellowgreen;

  }

  .box.box1 {
      background: pink;
  }
```

 7. 群组选择器
 

``` css
 .box,
 .box1 {
     background: blue;
 }
```

 #### 2 . 伪类选择器
 > 操作的是真实的dom元素和用户交互
 
 .box:nth-child(2) (父元素的所有子元素中，类名为box的并且为第二个的；否则失效)
 
 ：first-child（第一个）
 
 ：last-child（最后一个）
 
 ：nth-last-child（）（倒数第几个）
 
 .box:nth-of-type(2)
 
 
 (类名为box的元素，视其他元素而不见，在类名为box的元素中找第二个元素添加样式)
 
 ：first-of-type 这种类型的第一个
 
 ：last-of-type 这种类型的最后一个
 
 ：hover 鼠标移入
 
 ：focus 获取焦点
 

``` css

 Odd 和 even 是可用于匹配下标是奇数或偶数的子元素的关键词（第一个子元素的下标是 1）。

在这里，我们为奇数和偶数 p 元素指定两种不同的背景色：

p:nth-child(odd)
{
background:#ff0000;
}
p:nth-child(even)
{
background:#0000ff;
}
```

 #### 3. 伪元素选择器

> 操作的是页面中非真实的dom元素；有标签 的叫真实的dom元素，没有标签的是非真实的dom元素

* 文本标签中（例如p）

：：first-letter 选中第一个字母
：：first-line选中第一行文本

* 在div中（可解决浮动的bug）

：：before 插入到玄素内部，作为第一个元素出现
：：after 插入到元素的内部，作为最后一个元素的出现

``` css
.box::before,
.box::after {
    content: "";
    display: block;
}
```

#### 4. 属性选择器（css3新增选择器）

html属性

1. [class] 为页面中有class 属性的元素添加样式
2. [class="box"]选中页面中有class属性的，并且属性值只能为box（属性值代表引号内部的）
3. [class*="b"]选中页面中有class属性的，并且包含字母b的元素
4. [class~="box"]选中页面中有class属性的，并且属性值中有空格，box代表其中一个单词，它本身也会被选中
5. [class|="box"]选中页面中有class属性的，并且属性值中有连字符，box代表连字符前面那个单词，它本身也会被选中。
6. [class^="b"]选中页面中有class属性的，并且属性值以b开头的元素
7. [class$="ox"] 选中页面中有class的，并且属性值以ox结尾的元素

#### 子代选择器

.box>div 子代选择器，只选择子代
.box div 后代选择器，全部的孩子，包括子类及子类的子类

### 计算器

``` 

calc
```

### 5. 文字属性

``` css

    /*字体的大小*/
    font-size: 30px;
    /*字体的颜色*/
    color:red;
    /*字体粗细*/
    font-weight:bolder;
    /*设置字体*/
    font-family: "宋体";
    /*水平居中*/
    text-align: center;
    /*垂直居中*/
    line-height:300px;
    /* 斜体 */
    font-style: italic;
    /* 字间距 */
    letter-spacing:10px; 
    /*首行缩进 1em表示文字的大小 */
    text-indent: 2em;
    /*自动换行*/
    word-break:break-all;
    /*禁止用户选中文本*/
    user-select：none；
    
    /*单行文本溢出*/
    .box{
        /*限制换行*/
        white-space:nowrap;
        /*超出影藏*/
        overflow:hidden;
        *将超出的文本内容显示为圆点
        text-overflow:ellipsis;
    }
    /*文字分散
    text-align: justify;
   text-justify: distribute-all-lines; //兼容ie浏览器
    margin: 0 auto;
    text-align-last: justify;
    /*
    
    /*多行文本溢出（谷歌）
    .box{
        /*定义为盒子显示*/
        display:-webkit-box;
        /*定义框内元素的排列方式为垂直排列*/
        -webkit-box-orient:vertical;
        /*限制一个块元素显示的文本行数*/
        -webkit-line-clamp:2;
        /*超出隐藏*/
        overflow:hidden;
        /*超出的文本内容变为圆点*/
        text-overflow：ellipsis;  
        
        文字垂直一行显示
        >放文字的盒子的宽<2em；
        1em表示一个文字的大小，等于font-size
        
        *文字的渐变
        把文本内容之外的背景给裁剪掉（谷歌）
        div{
    /*将背景设为渐变色（兼容性）
       background:linear-gradient(to right,red,blue);
       background:-webkit-linear-gradient(to right,red,blue);
    /*规定背景的绘制区域
       -webkit-background-clip:text;
    /*将文字设置为透明色*/
        color：transparent;
         }
    @font-face{
    font-family: "名字随便起"；
    src:url('../font/字体的名称.eot');
    src:url('../font/字体的名称.woff')format("woff"),
    url('../font/字体的名称.ttf')format("truetype"),
    uer('../font/字体的名称.svg')format("svg"),
}

.box{
      -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
box里的文字将不被选中复制

html中的代码加一个h1或者其他的，里面写你自己想要的特殊文字
```

> 注意：写在background属性下面，正常；写在background上面clip不生效

<!-->放文字的盒子的宽<2em-->

### 6. 颜色的表示方法

``` css

	/* 关键字 */
	background: red;
	/* 十六进制 0~f */
	background: #ff0000;
	/* rgb 0~255 */
	background: rgb(255,0,0);
	/* rgba 0~255  0~1*/
    background: rgba(255,0,0,0.5);
    /* opacity 0~1 */
    background: rgb(255,0,0);
    opacity:0.5;
```

**rgba和opacity的区别**

> rgba只作用在背景颜色，其他内容不会变透明。

opacity作用在全部的地方，其他内容也会变透明。

## 四、盒子模型

文档流：页面中的元素默认的从左往右、从上往下排列。

### 1. 组成：

> 内容、padding(填充)、border(边框)、margin(间距)

### 2. 内容 

   宽高

### 3.padding(内填充)

> 盒子与内容之间的距离

``` css
        /*上下左右*/
        /*padding:20px;*/
        /*上下  左右*/
        /*padding:20px 30px;*/
        /*上 左右  下*/
        /*padding:20px 30px 40px;*/
        /*上  右   下  左*/
        /*padding:20px 30px 40px 50px;*/
        分开设置 padding-top:20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom:0;
```

**问题：使盒子变大**

* 解决：
1. 减少内容的宽高
2. box-sizing:border-box;//目的也是让内容的宽高减少

### 4.border(边框)

    四个方向
     border:5px         double        #000;
          边框的粗细    边框的样式    边框的颜色
     分开设置
     border-top:5px solid #000;
     边框样式：solid  dashed  dotted  double 
     border-left:none;
     border-right-color: red;

**问题：盒子变大**
解决：

* 1. 减少内容的宽高
* 2.box-sizing:border-box; 

    盒子的宽=内容的宽+左右的padding+左右的border
    盒子的高=内容的高+上下的padding+上下的border   

### 5.margin(外间距)

> 盒子与盒子的间距

``` css
        /*上下左右*/
        /*margin:20px;*/
        /*上下  左右*/
        /*margin:20px 30px;*/
        /*上 左右  下*/
        /*margin:20px 30px 40px;*/
        /*上  右   下  左*/
        /*margin:20px 30px 40px 50px;*/
        分开设置 margin-top:20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom:0;
```

* 问题1：给子元素添加margin-top, 好像作用在父元素身上。
* 解决：
    - 1.给父元素添加padding,去代替子元素的margin。
    - 2.给父元素添加 overflow:hidden;
    - 3.破坏条件
* 满足条件（五个缺一不可，都满足才会发生）
    - 1.父元素没有上边框。
    - 2.父元素没有上填充。
    - 3.该子元素是父元素的第一个子元素。
    - 4.父元素没有浮动
    - 5.子元素没有浮动
* 问题2：上下盒子的上下margin会进行叠加。
* 问题3：水平居中

    <div class="box"></div>
    .box{}

``` 

    margin:0 auto;
    ```

* 问题4：去掉浏览器的默认样式

``` css
/* 通用选择器 */

* {

    /* 去掉浏览器的默认样式 */
    margin: 0;
    padding: 0;
    /* 去掉列表的样式 */
    list-style: none;
}

/* 去掉a链接的下划线 */
a {
    text-decoration: none;
}
```

## 五、浮动

### 1. 什么时候使用？

元素需要横排的时候。

### 2. 浮动分类

* 左浮动=>float:left; 
* 右浮动=>float:right; 

### 3. 浮动什么时候停止?

父元素的宽不足以容纳下浮动的子元素，放不下的子元素按照浮动的类型去排列。

### 4. 卡顿

> 子元素的高度不相同的时候

* 左浮动：掉下来的子元素从左往右，以最右边的初始位置水平向左移动。
* 右浮动：掉下来的子元素从左往右，以最左边的初始位置水平向右移动。

### 5. 注意

* 浮动的元素脱离文档流
* 浮动的元素撑不开父元素的高度
* 1. 直接给父元素设置高度
* 2. 给父元素添加overflow：hidden；（自动给父元素添加高度）
* 3. 添加伪元素清楚浮动

``` css

.box::after{
    content:"";
    display:block;
    clear:both;
}
```

* 4. 创建最后一个子元素（比如.box）, 清除浮动

``` 

<div class="box"></div>
.box{
    clear:both;
}
```

-浮动的元素必须有一个不添加浮动的父元素包裹。

## 补充

1.icon图标的使用
  
  <1>. 在阿里巴巴矢量图标库中找到对于的icon图标；
  
  <2>点击添加购物车->加入到项目中（没有的话自己新建项目）->在我的项目中选择font class，
  
  点击生成在线的css地址->在html页面中通过link标签引入（记得加上 httpp：）->
  
  在页面中需要引入图标的位置通过i标签使用
  
  <i class="iconfont icon-daohanggouwuche"</i>
  
  <3>. 在线地址要时刻更新
 ## 六、定位
  ### 1. 什么时候用？
  页面中的元素需要层叠的时候，或者页面中的元素固定不动的时候。
  ### 2. 定位是什么？
  元素可以放在页面的任意位置，并且不会影响页面中的其他元素。
  ### 3. 定位分类
  -没有脱离文档流，相对于自身去进行定位。
  

``` css
  div {
      position: relative;
      top: 50px;
  }
```

  2. 绝对定位

  脱离文档流
-相对于离他最近的父元素定位，并且这个父元素身上有position定位属性；如果所有的父辈都没有定位属性，相对于body定位。

``` caa
父元素选择器{
    position:absolute;
}
```

3. 固定定位

-脱离文档流
-相对于body（浏览器窗口）去进行定位，即使页面滚动，它还是固定在页面上不动的。

``` css
. div {
    position: fixed;
    right: 0;
    top: 200px;

}
```

4. 调整层级z-index

> 只有在定位属性的情况下，可以调整层级。层级默认是0，值越大，层级月噶。

5. 居中效果

``` css

. css
   div{
       水平居中
        方法1
    position: absolute;
    right: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
        方法2
    position: absolute;
    left：50%；
    margin-left：-**px（一般的高）
    
       
        垂直居中
          方法1
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
          方法2
    position: absolute;
    top:50%
    margin-top:-**px(一半高)
    
        水平垂直居中
          方法1
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
         方法2
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -60px;
}
```

2. 鼠标移入

``` css
.box:hover {
    color: white;
    鼠标移入类名为box的盒子，字体颜色变为白色
}
```

**鼠标变小手**

 ` cursor:pointer;`

3. 变圆角

``` 

 border-radius:50%
 ```

4. 输入框

 

``` html
 <input type="text"="请输入想要的内容">
```

 - placeholder=> 输入框的默认提示内容
 - 去掉输入框的默认边框和选中边框样式
 

``` css

 .input{
     border:none;
     outline:none;
 }
 ```

 -改变placeholder默认提示内容的样式
 

``` css

     .input::-webkit-input-placeholder{
     color:red;
 }
 ```

 - 获取焦点
 

``` css
 input:focus {
     outline: none;

 }
```

 ## ·补充内容介绍
 1. display
 - display:none; 隐藏
 - display:block; 显示
 
 2. overflow
 - overflow:hidden; 超出隐藏
 - overflow：auto；超出内容出现滚动条，否则不会
 - overflow:scroll；始终出行滚动条
 

``` css
 去掉滚动条 选择器：：-webkit-scrollbar {
     widht: 0;
     height: 0;
     隐藏 display: none;
     去掉
 }
```

 3. 2D动画效果
 4. （1）. 平移
 

``` css
 水平方向平移，正值向右平移，负值向左 transform:translatex(-20px);
 垂直方向平移，正值向下平移，复制向上平移 transform:translatey(-20px);
 第一个值表示水平方向，第二个值表示垂直方向；一个值表示水平方向 transform:translate(-20px);
```

 (2). 旋转
 

``` css
 deg角度 transform:rotate(-360deg) 正值表示顺时针方向选装，负值表示逆时针旋转
```

（3）. 缩放

``` css
transform: scaleX(-1);
transform: scaleY(2);
transform: scale(1, 2);
/* 大于1的正值表示放大，0表示缩小为没有，负值表示反方向缩放;一个参数值表示水平和垂直等比例缩放 */
``` （4）.斜切 ```css transform: skewX(60deg);
transform: skewY(60deg);
transform: skew(30deg, 30deg);
```

**过渡时间**
 `transition: 1s;`

5. 阴影内容

``` css
box-shadow: 0 0 15px 10px #666 inset;
第一个参数：水平方向的偏移量，正右 负左 0左右 第二个参数：垂直方向的偏移量，正下 负上 0上下 第三个参数：阴影的模糊程度，值越大越模糊 第四个参数：阴影的大小，值越大阴影越大 第五个参数：阴影的颜色 第六个参数：内阴影（一般不用）
```

7. 标题前面加logo

在head标签中

``` html
<link rel="shortcut icon"> href="favicon.ico"
type="image/x-icon">
```

href=>引入图标的地址
图片大小设置为16*16

8. 多媒体标签（h5新标签）

视频

``` html
<video src="audion.mp4" controls="controls"></video>
```

音频

``` html
<audio src="背影.mp3" controls="controls"><audio>
```

* border: 表格边框
* cellspacing="0"; 去掉边框于边框之间的间距。
* cellpadding="0"; 去掉边框内部的间隔。
* colspan="2": 跨列合并表格单元格
* rowspan="2": 跨行合并表格单元格



## 七、渐变

1. 分类
* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
* 径向渐变（Radial Gradients）- 由它们的中心定义
2. 浏览器内核（兼容性）

-webkit- 谷歌
-moz- 火狐
-ms- ie
-o- 欧鹏

2. 线性渐变
* 简单渐变，方向从上向下

``` css
#box {
    background: -webkit-linear-gradient(red, blue);
    /* 谷歌 */
    background: -o-linear-gradient(red, blue);
    /* 欧鹏*/
    background: -moz-linear-gradient(red, blue);
    /* 火狐*/
    background: linear-gradient(red, blue);
    /* 标准的语法 */
}
```

* 简单方向渐变

``` css
#box {
    background: -webkit-linear-gradient(left top, red, blue);
    /* 谷歌 */
    background: -o-linear-gradient(to right, red, blue);
    /* 欧鹏*/
    background: -moz-linear-gradient(30deg, red, blue);
    /* 火狐*/
    background: linear-gradient(to right, red, blue);
    /* 标准的语法 */
}
```

第一个参数：渐变开始的方向
关键字：left、 top 、right、 to bottom、
角度：30deg
第二个参数：渐变开始的颜色
关键字、十六进制、rgb、rgba

* 不均匀的线性渐变：

``` css
background:内核+linear-gradient(left, red 10%, yellow, green 20%);
background:linear-gradient(left, red 10%, yellow, green 20%);
```

> 可以使用百分比或者像素值

* 重复性的线性渐变：

``` css
background:内核+repeating-linear-gradient(45deg, red, yellow 30%);
background:repeating-linear-gradient(45deg, red, yellow 30%);
```

3. 径向渐变
* 简单径向渐变

background: 内核+radial-gradient(red, yellow); 

* 不均匀的径向渐变：

background: 内核+radial-gradient(red 10%, yellow 20%, pink); 

* 重复性的径向渐变：

background: 内核+-repeating-radial-gradient(red, yellow, pink 50%); 

## 九、 语义化标签（html5）

*  1. 为什么使用？

> 可以更好地理解网页的框架。

* 2.header(头部)`nav(导航栏)`aside（侧边栏）`section（一部分）·footer(底部)

``` html

    Header：

    不用多说，就是定义头部，可以多个。
    Footer：

    底部，不一定是文档最底部，可以多个。
    Nav：

    导航栏标签，定义导航栏。
    Article：

    独立内容区域，与session类似，用于文章等。
    Aside：

    页面侧边栏所使用。
    Time:

    时间标签，主要用于搜索引擎和其它一些内容引擎特殊的解析和展示。
    Ruby：

    注释标签，跟rt和rp一起使用，可以看一下效果
    <ruby>
    张 <rt>Zhang</rt><rp>不显示</rp>
    </ruby>

    Details：

    点击展开详情，可以试一下，可能在很多场景下可以使用
    <details>
    <summary>更多</summary>
    <p>详细内容</p>
    </details>

    Mark:

    会给这个字段添加一个背景色，那个颜色还改不了。
    Progress：

    进度条，当做简易进度条使用，不够美观。
    <progress value="50" max="100"></progress>

    Section：

    节的意思，主要是区分开内容，文档中的节或者是文章的节。
    Video：

    视频，现在大部分不支持自动播放了，微信能处理，其他还没见过能自动播放。
    Audio：

    音频，也就是音乐，也不支持自动播放。
    Datalist:

    强烈推荐，在我看来就是模糊查询，除了样式之外，非常好用。
    <input type="text" list="carsd">
    <datalist id="carsd">
    <option value="wf"></option>
    <option value="wg"></option>
    <option value="dre"></option>
    <option value="sdhjfgh"></option>
    <option value="dfgsdw"></option>
    <option value="fdgwfdg"></option>
    <option value="dfgtyr"></option>
    <option value="dfgwdfg"></option>
    </datalist>
    Embed：

    插入多媒体内容，小小试了试，可以播放视频，但是那些属性都不生效。待研究。
    Canvas：

    画布，很强大很强大，值得研究。
    Main：

    主要内容。

```

## 十，背景图片

* 引入背景图片

``` css
background-image:url(图片地址)；
```

* 禁止重复

``` css
background-repeate:no-repeat;
```

* 背景图片的大小；

``` css
background-size：20px 14px； 宽 高 background-size:cover;
按照宽高中的较小者占满盒子，较大者按照比例缩放，盒子不会出现空白。图片无法完全显示。 background-size:contain;
按照宽高中的较大者占满盒子，较小者按照比例缩放，盒子会出现空白，图片可以完全显示。
```

* 位置

``` css
background-position:center bottom;
第一个参数：水平方向 50% left right center 第二个参数：垂直方向 30% top bottom center 分开设置 background-position-x:20%;
background-position-y:center;
```

**总设置**

``` css
background:url(../img/bannerl.jpg) no-repeat center center /100% auto;
```

* 前提是定义了background-image属性，然后用background-attachment来指明背景图的位置是固定于视口的，还是随着包含块移动的。可简单理解为定义背景图片随滚动轴的移动方式。

* 取值：

**如果轮播图是全屏的话设置设置方法**
**使用最多1920*1080  2160*1440**
安全可视区，一般设置为1200

**显示图片的容器是固定宽高，但上传的图片是不确定的，要引入背景图片**

* scroll: 默认值，背景图相对于元素固定，背景随页面滚动而移动，即背景和内容绑定。

* fixed：背景图相对于视口固定，所以随页面滚动背景不动，相当于背景被设置在了body上。

* local：背景图相对于元素内容固定，

* inhert: 继承，没什么说的。

* 该属性可以应用于任何元素。

* nth选择器

``` 

.box1:nth-child(){}
```

## 十一、 响应式布局

媒体查询

``` css
@media screen and (min-width:1200px) {
    .box8 {
        background-color: red;
    }
}

@media screen and (max-width:1200px) {
    .box8 {
        background-color: antiquewhite;
    }
}

@media screen and (max-width:992px) {
    .box8 {
        background-color: aqua;
    }
}

@media screen and(max-width:768px) {
    .box8 {
        background-color: black;
    }
}
```

## 十二、移动端布局准备工作 

* 添加修改适口 ```html <meta name="viewport

content="width=device-width, user-scalable=no, initial-scale=1.0; 
maximum-scale=1.0, 
minimum-scale=1.0">

``` 

user-scalable=no (禁止用户调整窗口大小)
initial-scale=1.0 （窗口的初始缩放比例为1）
 maximum-scale=1.0, （最大调整比例为1）
  minimum-scale=1.0 （嘴小调整比例为1）

2. 兼容不同的屏幕大小（响应式布局）

``` css
html {
    font-size: 100px;
    （以标准widht=750px）
}

先定位font-sieze的大小，建议为100 好算/ @media screen and(min-width:320px) {
    html {
        font-size: 42.6667px;
    }
}

@media screen and(min-width:360px) {
    html {
        font-size: 48px;
    }
}

@media screen and(min-width:375px) {
    html {
        font-size: 50px;
    }
}

@media screen and(min-width:411px) {
    html {
        font-size: 54.8px;
    }
}

@media screen and(min-width:414px) {
    html {
        font-size: 55.2px;
    }
}
```

**注意***
使用 min-widht 时，屏幕尺寸从小往大排，使用max-widht时，屏幕尺寸从大到小排；

3. rem介绍

> rem 是相对于根元素html

rem其实就是一个单位，1rem=1*html字体大小

``` css
     html {
         font-size: 100px;
     }

     div {
         widht: 2rem;
         height: 2rem: 那么这里的实际值，其实就是2*100px=200px*/
     }
```

##  十三弹性布局

### 1. 概念

* 容器 ：父元素
* 项目： 子元素
* 两根轴： 主轴=>默认水平方向。

            交叉轴=>默认垂直方向
            display:flex;(转换为弹性布局)
            

### 2. 容器（写在父元素身上）的属性

1.flex-direction : 确定主轴的方向
   * row（默认值）：主轴为水平方向，从左往右
   * row-reverse: 主轴在水平方向，从右往左
   * column: 主轴在垂直方向，从上往下。
   * column-reverse: 主轴在垂直方向，从下到上。
   
2 .flex-wrap: 子元素的换行
 * wrap：换行，从上到下
 * nowrap：不换行（默认值）

* wrap-reverse：换行，从下到上
3. justify-content：子元素在主轴方向的对齐方式
* flex-start: 主轴的起点
* center 主轴的中点
* flex-end 主轴的终点
* space-between 两端对齐，子元素之间的间隔都相等
* space-around  每个子元素左右两边的距离都相等
4. align-items 子元素在交叉轴方向的对齐方式（适用于一根轴线和多根轴线）
* flex-start 交叉轴的起点。
* flex-end 交叉轴的终点
* center 交叉轴的中点

5. align-content 子元素在交叉轴方向的对齐方式（适用于多根轴线）
* flex-start 交叉轴的起点。
*   flex-end 交叉轴的终点
* center 交叉轴的中点

### 3. 项目（写在子元素身上）的属性

1.order

order 的值是整数，默认为0，整数越小，项目的排列越靠前，
 2. flex-grow
  父元素有多余的空间时，子元素是否放大。
  默认值为0，即有多余的空间也不进行放大；可能的值为整数，表示放大的比例
  

3. flex-shrink

父元素空间不足时，子元素是否缩小。默认值为1，即空间不足时，子元素会自动缩小。

4. flex-basis

表示子元素在主轴上占据的空间，默认值为auto

5.align-self 
允许子元素有自己独特的在交叉轴上的对齐方式，默认值为auto

* auto：和父元素在交叉轴上的值一致。
* flex-start： 顶端对齐
* flex-end：底部对齐
* center：竖直方向上居中对齐。
* baseline： 子元素第一行文字的底部对齐
* stretch：当子元素未设置高度时，子元素将和父元素登高对齐。

## 十四、表单from

1. 作用

> 通过表单，浏览器能从web服务器中获取信息，而且还能向web服务器反馈信息。

2. form 表单标签
* action 内容提交的位置 PHP sap jsp
* method 提交的方式

     get不安全 内容多
     post 安全 内容少

``` html
<form action="aa.php" method="post" enctype="multipart/from-data<from>
```

3. 表单控件

（1）输入框

``` html
<input type="text" placeholder="输入默认提示内容" maxlength="10" name="username">
```

 placeholder:
 
 size: 输入框的长度
 
value：指定默认值

maxlength：输入最多的字符数

name：和后台进行数据交互的，用于数据库获取信息

readonly：只读

disabled：禁用

type: 控件类型

（2） 密码框

``` html
<input type="password" name="psd">
```

(3) 单选按钮（name值相同实现单选）

``` html
 男<input type="radio" name="sex">
 女<input type="radio" name="sex">
```

 (4)复选框
 

``` html
 默认选择：checked
 篮球<input type="checkbox" name="hobby" checkend>
 学习
 <input type="checkbox" name="hobby">
 唱歌
 <input type="checkbox" name="hobby" 跳舞 <input type="checkbox" name="hobby"
```

 (5) 下拉框
 

``` html
 <select name="" id="" multiple size="2">
     <option value="" selected>学士</option>
     <option value="">学士</option>
     <option value="">学士</option>
     <option value="">学士</option>
     <option value="">学士</option>
     <option value="">学士</option>
 </select>
```

size 控制option显示的个数

multiple 表示可以多选，按ctrl可以多选。默认单选

value  属性的参数值是当该项被选中并提交后，web浏览器传送给服务器的数据。缺少时，浏览器将传送选项的内容。

selected 用来指定选项的初始状态，表示该选项在初始时是被选中的。

(6)上传文件

``` html
<input type="file">
```

(7)文本域

``` html
<textarea name="" id="" cols="30" rows="10"><textarea>
```

``` css
 textarea {
     禁止调整 resize：none； 默认的 resize：both； 垂直方向调整 resize：vertical； 水平方向调整 resize：horizontal；
 }
```

 (8)h5中的表单新功能
 

``` html
 颜色板
 <input type="color">
 邮箱
 <input type="email">
 日期
 <input type="datetime-local">
 数值
 <input type="number" max="10" min"1">
 时间日期
 <input type="datetime-local">
 搜索
 <input type="search">
 时间
 <input type="time">
```

 (9)按钮
 

``` html
 提交按钮
 <input type="submit">
 重置按钮
 <input type="reset">
 自定义按钮
 <input type="button" value="返回">
 <button>提交</button>
```

4. 获取焦点

``` css
  input:focus {
      outline: none;

  }
```

### 滚动条

``` 

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
```

 ### table
 

``` html

 <table>
    <thead>
        <tr>
            <td>aaa</td>
            <td>aaa</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>aaa</td>
            <td>aaa</td>
        </tr>
    </tbody>
</table>

为表格设置合并边框模型：
table
  {
  border-collapse:collapse;
  }
  
规定相邻单元的边框之间的距离。使用 px、cm 等单位。不允许使用负值。
如果定义一个 length 参数，那么定义的是水平和垂直间距。
如果定义两个 length 参数，那么第一个设置水平间距，而第二个设置垂直间距。
border-spacing
 ```

 

``` html

 colspan和rowspan这两个属性用于创建特殊的表格。

colspan用来指定单元格横向跨越的列数：colspan就是合并列的，colspan=2的话就是合并两列。

rowspan用来指定单元格纵向跨越的行数:rowspan就是用来合并行的，比如rowspan=2就是合并两行，

rowspan通常使用在td和th标签中
row:行,span:跨度,跨距,范围
col:列,span:跨度,跨距,范围

带有 thead、tbody 以及 tfoot 元素的 HTML 表格：
<table border="1">
  <thead>
  <!--头部-->
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
  <!--中间-->
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
  <tfoot>
  <!--尾部-->
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
</table>

    
```
```css
  table {
            border: 1px solid #aaaaab;
            width: 100%;
            background-color: #25242a;
            max-width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            font-size: 12px;
            color: #aaaaab;
            tr > td:nth-child(odd) {
              width: 150px;
            }
            tr > td:nth-child(even) {
              width: 450px;
            }
            td {
              padding: 8px;
              line-height: 1.42857;
              vertical-align: top;
              box-sizing: border-box;
              color: #ddd;
              border: 1px solid #aaaaab;
            }
          }
```

## 容易混淆的几个css属性

|属性|含义|
|:----:|:----:|
|animation（动画）	|用于设置动画属性，他是一个简写的属性，包含6个属性|
|transition（过渡）	|用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同|
|transform（变形）	|用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”|
|translate（移动）	|translate只是transform的一个属性值，即移动。|

mysql> SELECT User, Host FROM mysql.user
转自中国存储网，原文链接：http://www.chinastor.com/yw/04293QK2018.html
