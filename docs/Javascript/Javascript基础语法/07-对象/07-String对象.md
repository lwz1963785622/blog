# 字符串(String)

> 字符串用于存储和处理文本。字符串对象是用来处理字符串

## 单引号和双引号的区别

1. 在js中单引号和双引号没有区别，都可以表示字符或字符串。
2. json格式的文件必须使用双引号

``` json
{
    "name": "张三",
    "age": 20
}
```
## 字符串的遍历接口  <Badge text="ES6" type="warning"/> 
> ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

```javascript
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

## 字符串与json对象之间的转换

1. JSON.stringify()             将对象转化为字符串
2. JSON.parse()                 将字符串转化为对象

## 字符串的解构赋值
> 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
> 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```javascript
let {length : len} = 'hello';
len // 5
```
## 模板字符串
传统的 JavaScript 语言，输出模板通常是这样写的。
```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```
上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。
```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);

// 模板字符串中嵌入变量，需要将变量名写在${}之中。
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

// 调用函数
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar


```


## 属性

### length : 字符串的长度
``` js
    var str = 'hello word';
    console.log(str.length) //10
```
## 方法

### str.charAt(index); 

* 功能：返回下标为index的子字符串
* 参数: 数字下标
* 返回值: 对应下标字符串

### str.charCodeAt(index); 

* 功能: 根据下标，返回对应下标的字符的ACSCII码
* 参数: 数字下标
* 返回值: 对应下表字符ACSCII码

### String.fromCharCode(97); 

* 功能: 将ACSCII码转化成字符串，涉及到数字与字母之间的转化可以使用该方法
* 参数: 十进制ACSCII码
* 返回值: ACSCII码对应字符串

### String.fromCodePoint() <Badge text="ES6" type="warning"/>
> ES5 提供`String.fromCharCode()`方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。

### String.raw()
> ES6 还为原生的 String 对象，提供了一个raw()方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
```javascript
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

```
### str.indexOf('a'); 

* 功能： 查找一个字符或者字符串在字符串中第一次出现的位置, **未找到则返回-1**、
* 参数： 要查找的字符串
* 返回值： 目标字符串的下标位置，未找到则未-1

``` js
var str = 'hello world';
str.indexOf('a'); //-1
str.indexOf('o'); //4
```

### str.lastIndexOf('a')     

* 功能： 倒序查找一个字符或者字符串在字符串中第一次出现的位置, 返回位置，, **未找到则返回-1**、

``` js
var str = 'hello world';
str.lastIndexOf('o'); //7
```

### str.replace("替换的内容", "替换后的内容")   

* 功能： 将指定的字符串替换，**只能替换第一个**
* 参数： 1. 要替换的内容； 2. 替换后的内容
* 返回值： 返回替换后的字符串
* 注意： 不修改原字符串，所以使用时需要将 `replace` 方法的返回值保存

``` js
var str = 'hello world';
str.replace('o', 'a'); //"hella world"
```

> `replace` 支持正则查找，str.replace(/正则/, "替换后的内容")  



### str.replaceAll("替换的内容", "替换后的内容") <Badge text="ES2021" type="warning"/>  
> 历史上，字符串的实例方法replace()只能替换第一个匹配。
* 返回值： 返回替换后的字符串
* 注意： 不修改原字符串，所以使用时需要将 replace 方法的返回值保存
 ```javascript
'aabbcc'.replace('b', '_')
// 'aa_bcc'
```
上面例子中，replace()只将第一个b替换成了下划线。

如果要替换所有的匹配，不得不使用正则表达式的g修饰符。

```javascript
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```


```javascript
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')
```

replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。

下面是一些例子。
```javascript
$&：匹配的字符串。
$` ：匹配结果前面的文本。
$'：匹配结果后面的文本。
$n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
$$：指代美元符号$。

// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
```


### str.slice(起始下标, 结束下标)      

* 功能：字符串截取，识别负数，跟数组相同
* 参数：1. 截取起始下标； 2. 截取结束下标。参数可以是负数，负数表示倒数，只传一个参数表示从起始下标截取到最后
* 返回值：返回值是截取到的字符串
* 注意： 截取时，包含起始下标，不包含结束下标； 不修改原字符串

### str.substring(起始下标, 结束下标)        

* 功能： 字符串截取，同 `slice` 方法，但不识别负数

### str.substr(起始下标，截取的长度)          

* 功能：根据长度进行字符串截取
* 参数： 1. 起始下标； 2. 截取的长度

### str.split('')     

* 功能： 以某一字符串将目标字符串分割，可用于将特定格式的字符串转化如 `2018/10/20`
* 参数： 需要分割的字符串
* 返回值： 原字符串呗参数字符串分割之后的**数组**
* 注意： 返回值中传入的字符串会被删掉，不修改原字符串

``` js
var str = 'hello world';
console.log(str.split('o')); //["hell", " w", "rld"]
console.log(str.split('')); //["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

### str.toLowerCase()  

* 将str字符串中的字符转化为小写，不修改原字符串
### str.toLocaleLowerCase() 

* 方法根据本地主机的语言环境把字符串转换为小写,不修改原字符串
### str.toUpperCase()  

* 将str字符串中的字符转化为大写
### str.toLocaleUpperCase()  

* 方法根据本地主机的语言环境把字符串转换为小写,不修改原字符串

### str.trim()   

* 将字符串左右空格去除，可用于接收表单数据            IE9以下不识别
* 返回值： 去掉左右空格之后的字符串

``` js
var a = '   aa   bb   ';
a.trim(); //"aa   bb"
```

### str.match()     

* 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
* 参数： 可以是字符串或者正则表达式
* 返回值：检索到的结果

``` js
var str = 'hello world';
str.match('o'); //["o", index: 4, input: "hello world", groups: undefined]
str.match(/o/g); // (2) ["o", "o"]
```
### str.matchAll()   

### str.concat('a', 'b', 'c')        

* 功能： 用于连接两个或多个字符串, 与数组中的concat方法很象，不会修改原字符串
* 参数： 多个字符串
* 返回值：拼接之后的长字符串

### str.includes()  startsWith(), endsWith()   <Badge text="ES6" type="warning"/>
> 传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法,方法区分大小写。
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

> 查找字符串是否包含 "Runoob": 如果找到匹配的字符串则返回 true，否则返回 false。
```
var str = "Hello world, welcome to the Runoob。";
var n = str.includes("world");
```
### str.repeat()
* repeat方法返回一个新字符串，表示将原字符串重复n次。
```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 参数如果是小数，会被取整。
'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError


```


### str.padStart() 、str.padEnd()   <Badge text="ES2017" type="warning"/>  

* 功能： 向字符串开头(padStart)或结尾(padEnd)添加字符，使字符串达到指定的长度。返回在原字符串开头或末尾填充指定的填充字符串直到目标长度所形成的新字符串
* 参数1: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
* 参数2: （可选）填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。
* 注意事项
    - 不写第二个参数填充字符串，则默认用空格填充
    - 填充字符串会自动重复直到达到目标长度
    - 如果原字符串长度已经大于等于目标长度，则直接返回原字符串

``` js
'abc'.padStart(10); // "       abc"
'abc'.padStart(10, "123"); // "1231231abc"
'abc'.padStart(6, "123465"); // "123abc"
'abc'.padStart(8, "0"); // "00000abc"
'abc'.padStart(1); // "abc"

'abc'.padEnd(10); // "abc       "
'abc'.padEnd(10, "123"); // "abc1231231"
'abc'.padEnd(6, "123465"); // "abc123"
'abc'.padEnd(8, "0"); // "abc00000"
'abc'.padEnd(1); // "abc"
```

* 使用场景：得到具有固定长度的数据 （时间、二进制数、十六进制数）

``` js
// 获取时间，如果只有一位则前面用0填充
var time = new Date();
var h = String(time.getHours()).padStart(2, '0')
var m = String(time.getMinutes()).padStart(2, '0')
var s = String(time.getSeconds()).padStart(2, '0')
console.log( `${h}:${m}:${s}` ) // 18:09:03
```

### 实例方法：trimStart()，trimEnd()  <Badge text="ES2019" type="warning"/>  
> ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
```javascript
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

