# JavaScript动画
网页动画实现方式：  
1. CSS3: 过渡transition 、 帧动画@keyframes
2. Web Animations API
3. JQuery的animate函数
4. 引用gif图片


## Web Animations API

### 设置动画
web Animations API可以让我们用JavaScript写动画并且控制动画。

语法：
```js
element.animate(keyframes, timing)
```

参数：  
* **keyframes**: 关键帧对象数组，代表原始css的每个帧
* **timing**: 动画时间属性对象，规定运动时间、运动方式等属性

以此css3动画为例，使用animate api来实现：
```css
div{
    animation: turn 3s linear infinite ;
}
@keyframes turn {
    0%{
        background-color: #000;
        transform: rotate(0);
    }
    100%{
        background-color: #ccc;
        transform: rotate(360deg);
    }
}
```

#### 参数1: keyframes

```js
var keyframes = [
  { backgroundColor: '#000', transform: 'rotate(0)', offset:0},
  { backgroundColor: '#ccc', transform: 'rotate(360deg)', offset:1},
];
```

keyframes参数使用一个包含多个对象的数组，每个对象代表原始CSS中的一个帧。

与CSS不同的是，Web动画API不需要指定每个帧出现的时间百分比，会根据给出帧的个数自动进行时间等分。
如果需要设置某一个帧的时间时，可以使用`offset`属性，在30%的时间点则写`offset: 0.3`。


**必须至少指定两个关键帧**（表示动画序列的开始和结束状态），否则会报错。


#### 参数2: timing
```js
var timing = {
  duration: 3000,
  iterations: Infinity,
}
```
运动方式配置：

| 属性 | 值 | 说明 |
|---|---|---|
| duration | ms | 一次动画持续的毫秒时间，只支持毫秒，不写单位 |
| iterations | number | 动画次数. `Infinity`表示无数次。默认值 1 |
| delay | number | 动画延迟时间，以ms计,不写单位。 默认值 0 |
| direction | normal / reverse</br>alternate / alternate-reverse| 动画运动方向，reverse反向，alternate一次运动结束后逆向播放。 默认值 `normal` |
| easing | cubic-bezier | 动画运动方式，"linear"，"ease"，"ease-in"，"ease-out"，和"ease-in-out"等。 默认值 'linear' |
| fill | none / backwards / forwards / both | 保留动画状态，backwards保留播放前状态，forwards保留播放结束状态，both全部保留。 默认值 'none' |
| delay | number | 动画延迟时间，以ms计,不写单位, 默认值 0 |




动画参数整合：
```js
var keyframes = [
  { backgroundColor: '#000', transform: 'rotate(0)', offset:0},
  { backgroundColor: '#ccc', transform: 'rotate(360deg)', offset:1},
]
var timing = {
  duration: 3000,
  iterations: Infinity,
}

var div = document.querySelector("div");
div.animate(keyframes, timing);
```
如果只需要指定动画的持续时间，可以单独传递毫秒:
```js
var div = document.querySelector("div");
div.animate([
  { backgroundColor: '#000', transform: 'rotate(0)', offset:0},
  { backgroundColor: '#ccc', transform: 'rotate(360deg)', offset:1},
], 3000);
```


### 动画播放控制
`Element.animate()`方法执行会会返回一个动画对象，动画对象中还提供了一些控制播放的有用方法：

 属性 | 功能
---|---
playbackRate | 动画播放速度。取一个可以是0、负数或正数的数字。负值反转动画。该值是缩放因子，因此例如值2将使播放速度加倍


 方法 | 功能
---|---
pause() | 动画暂停
play() | 动画播放
reverse() | 播放方向。如果在未播放的动画上调用，则向后播放整个动画。如果在暂停的动画上调用，则动画将反向继续
finish() | 立即完成动画
cancel() | 立即关闭动画


`Element.animate()` 方法会在调用后立即执行进行运动，为了在启动运动时加一写限制(例如点击开始运动),可以调用`Animation.pause()`，点击事件中调用`Animation.play()`：

```js
var div = document.querySelector("div");
var turn = div.animate([
  { backgroundColor: '#000', transform: 'rotate(0)', offset:0},
  { backgroundColor: '#ccc', transform: 'rotate(360deg)', offset:1},
], 3000);
turn.pause();  
// 动画默认暂停，点击后开始运动
div.onclick = function(){ turn.play() }

```


### 动画事件

事件名 | 功能
---|---
 onfinish | 动画播放完成后触发该事件 （播放完成或通过`finish()`完成动画）
 oncancel | 动画被关闭时触发该事件 （通过`cancel()`可关闭动画）








## 原生js动画
由于`Web Animations API`兼容性较差，所以在设置JavaScript动画时会使用插件或使用原生js封装动画：

```js
function linear(t, b, c, d) {
    return c / d * t + b
}

function animate(element, target, duration, callback) {
    let change = {};
    let begin = {};
    for (let key in target) {
        begin[key] = getCss(element, key);
        change[key] = removeUnit(target[key]) - begin[key];
    }

    let time = 0;
    let timing = setInterval(() => {
        time += 20;
      if (time >= duration) {
          clearInterval(timing);
          for (let key in target) {
              setCss(element, key, target[key]);
          }
          callback && callback.call(element);
          return;
      }
      for (let key in target) {
          let current = linear(time, begin[key], change[key], duration);
          setCss(element, key, current);
      }
  }, 20)
}

function getCss(ele, attr) {
    let value = window.getComputedStyle(ele)[attr];
    return removeUnit(value);
}

function removeUnit(value) {
    let reg = /^[-+]?([1-9]\d+|\d)(\.\d+)?(px|pt|em|rem)$/;
    if (isNaN(value) && reg.test(value)) return parseFloat(value);
    if (isNaN(value)) return Number(value);
    return value
}

function setCss(ele, attr, val) {
    let reg = /^(width|height|top|bottom|left|right|(margin|padding)(Top|Left|Bottom|Right)?)$/;
    if (!isNaN(val) && reg.test(attr)) {
        ele.style[attr] = val + "px";
        return;
    }
    ele.style[attr] = val;
}
```
使用：
```js
let box = document.querySelector("#box");
animates(box, {left: 500}, 3000);
```
### window.requestAnimationFrame
window.requestAnimationFrame()告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

```
var rid = window.requestAnimationFrame(callback);
```
#### 参数
callback 下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。
#### 返回值
一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

```
window.cancelAnimationFrame(rid)
```

动画设置多长时间合适？
```
window.setInterval(function(){},1000/60)

rid = window.requestAnimationFrame(callback)
window.cancelAnimationFrame(rid)

function raf(callback){
    if("requestAnimationFrame" in window){
        return window.requestAnimationFrame(callback)
    }else{
        return setTimeout(callback,1000/60)
    }
}
var id = raf(callback)
```
