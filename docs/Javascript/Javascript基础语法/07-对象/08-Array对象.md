# 数组方法和属性

## 属性

01. length: 数组中元素的个数
02. constructor: 返回对创建此对象的数组函数的引用（可以用来判断变量是否为数组）

## 方法

### 1. arr.push(); 向数组的末尾追加元素
    - 会修改原数组
    - 返回值：修改后的length值
    - 可以追加多个

    

``` js
    arr[1, 2, 3];
    arr1[4, 5, 6];
    arr2[...arr, ...arr1]; //  ...扩展运算符，将数组展开
```

### 2. arr.unshift(); 向数组的开头添加函数
    - 会修改原数组
    - 返回值：修改后的length值
    - 可以追加多个

### 3. arr.pop();   删除末尾的元素
    - 会修改原数组
    - 返回值：被删除的数据
    - 只能删除一个

### 4. arr.shift();  开头删除一个元素
    - 会修改原数组
    - 返回值：被删除的数据
    - 只能删除一个

### 5. arr.splice(位置，删除元素的个数，要追加的元素);   任意位置添加删除
    - 添加或者删除包含对应下标
    - 添加数据时：删除元素的个数写0；
    - 可以同时删除和添加（先删除，后添加）
    - 修改原数组

### 6. arr.join("分隔符") 使用分隔符将数组数据隔开变为字符串
    - 不修改原数组
    - 返回值是分隔好的字符串
### 7. arr.slice(截取的起始下标,结束下标) 数组的截取
    - 截取时，包含起始下标，不包含结束下标
    - 不修改原数组
    - 返回值是截取到的数组
    - 参数可以是负数，负数表示倒数，只传一个参数表示从起始下标截取到最后
### 8. arr.concat 多个数组的连接
    - 不修改原数组
    - 返回值是连接之后的新数组       

    

``` js
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];
    console.log(arr1.concat(arr2, [7, 8, 9]));

    // 控制台输出
    // (9) [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 9. arr.indexOf(值);   查找某个值在数组中第一次出现的下标
    - 返回值是数据的下标，没有找到则返回-1

    

``` js
    var arr = [1, 5, 6, 99, 52, 663, 22, 66, 552, 123, 6, 622];
    console.log(arr.indexOf(22)); //查找22在arr数组中的位置

    // 控制台输出
    // 6
```

### 10. arr.lastIndexOf(值);   倒叙查找某个值在数组中第一次出现的位置
### 11. arr.sort()     数组的排序 <Badge text="ES6" type="warning"/>
    - 如果没有参数，则从字符的编码开始按顺序排
    - 如果有参数，这个参数必须是一个函数（回调函数）这个回调函数有两个参数，分别是a，b
    - 修改原数组
    - 返回值是排序之后的数组                

    

``` js
    var arr3 = [1, 5, 6, 99, 52, 663, 22, 66, 552, 6, 622];
    arr3.sort(function(a, b) {
        //a-b 正序，
        //b-a 倒序，  
        return a - b;
    })
    console.log(arr3);
    // 控制台输出
    // (11) [1, 5, 6, 6, 22, 52, 66, 99, 552, 622, 663]
    //箭头函数
    arr.sort((a, b) => a - b) //正序，
    arr.sort((a, b) => b - a) //倒序，
```

### 12. arr.forEach()   遍历数组
    - 接收一个回调函数，回调函数第一个参数是 数组值
    - 第二个参数是 下标

    

``` js
    var arr3 = [1, 5, 6, 99, 52, 663, 22, 66, 552, 6, 622];
    arr3.forEach(function(value, index) {
        console.log(index, value)
    })
    // 箭头函数
    arr3.forEach((value, index) => {
        console.log(index, value)
    })
```

### 13. arr.filter()    过滤（根据条件筛选数组元素）
    - 根据回调函数的返回值进行元素筛选
        * 返回值是true，该元素会保留
        * 返回值是false，该元素跳过
    - 不修改原数组
    - 返回值是筛选之后的数组

    

``` js
    var arr = [1, 5, 6, 99, 52, 663, 22, 66, 552, 123, 6, 622];
    var newArr = arr.filter(function(value, index) {
        return value > 100; //筛选arr数组中值大于100的元素；
    })
    console.log(newArr);
    // 控制台输出
    // (4) [663, 552, 123, 622]
```

    

``` js
    var person = [{
            name: "张三",
            age: 20,
            sex: "男"
        },
        {
            name: "李四",
            age: 19,
            sex: "女"
        },
        {
            name: "王五",
            age: 22,
            sex: "男"
        },
        {
            name: "赵六",
            age: 21,
            sex: "女"
        }
    ];
    var x = person.filter(function(value, index) {
        return value.age > 20; // 筛选出年龄大于20岁的学生
        // return value.sex=="男";     //筛选出男同学
    })
    console.log(x);
    // 箭头函数
    arr.filter((value, index) => {
        return 判断条件
    })
```

### 14. arr.map()   映射 将数组中的所有数据按照条件改变，形成新数组
    - 将回调函数每次的返回值，组成一个新的数组
    - 返回值是映射改变之后的数组
    - 不修改原数组

    

``` js
    var arr = [1, 5, 6, 99, 52, 663, 22, 66, 552, 123, 6, 622];
    // var end=arr3.map(function(value,index){
    // 	return value*2;        //将数组中的所有元素都乘以2返回
    // });
    // 箭头函数
    var end = arr.map((value, index) => value * 2);
    console.log(end);
```

### 15. arr.some()    判断  根据回调函数的判断条件来选择真假
    - 只要有一个回调函数返回值是true，最终some结果是true；

    

``` js
    var arr3 = [1, 5, 6, 99, 52, 663, 22, 66, 552, 123, 6, 622];
    var end = arr3.some(function(value, index) {
        return value < 500;
    });
    console.log(end); //true
```

### 16. arr.every()    判断   根据回调函数的判断条件来选择真假(与some比较记忆)
    - 只要有一个回调函数返回值是false，最终every结果是false；

    

``` js
    var arr3 = [1, 5, 6, 99, 52, 663, 22, 66, 552, 123, 6, 622];
    var end = arr3.every(function(value, index) {
        return value < 500;
    });
    console.log(end); //false
```

### 17. arr.reverse() 数组倒序
    - 返回修改后的数组
    - 改变原数组

    

``` js
    var arr = [1, 5, 8, 6, 9, 4, 2, 3];
    console.log(arr.reverse()); // (8) [3, 2, 4, 9, 6, 8, 5, 1]
    console.log(arr); // (8) [3, 2, 4, 9, 6, 8, 5, 1]
```


### 18. arr.includes() <Badge text="ES6" type="warning"/>
    - 用于检查数组是否包含某元素，包含返回true，否则返回false
    - 无法检测对象是否存在
    - 假如只想知道某个值是否在数组中而并不关心它的索引位置，建议使用 `includes()` 。如果想获取一个值在数组中的位置，那么你只能使用 `indexOf` 方法。并且 `includes()` 可以识别NaN

    

``` js
    var arr = [1, 2, {
        name: "张三"
    }]
    arr.includes(2) // true
    arr.includes(4) // false
    arr.includes({
        name: "张三"
    }) // false
```

    - 可接收俩个参数：**要搜索的值, 搜索的开始索引**

    

``` js
    ['a', 'b', 'c', 'd'].includes('b') // true
    ['a', 'b', 'c', 'd'].includes('b', 1) // true
    ['a', 'b', 'c', 'd'].includes('b', 2) // false
```

    - 此方法为 ES7新增，兼容性

    

![arr.includes兼容性](/img/javascript/08-1545037228000.png)

### 19. arr.copyWithin() 将指定位置的成员复制到其他位置 <Badge text="ES6" type="warning"/>

`Array.prototype.copyWithin`(target, start = 0, end = this.length)
- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

这三个参数都应该是数值，如果不是，会自动转为数值。
```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
```
- 改变原数组

### 20. arr.find() 和 findIndex() <Badge text="ES6" type="warning"/>
> 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```
> 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
### 21. arr.fill() 方法使用给定值，填充一个数组。<Badge text="ES6" type="warning"/>
 - 原数组填充指定值
 - 改变原数组
 ```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

### 22. arr.entries(),keys() 和 values()  <Badge text="ES6" type="warning"/>
> ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
```javascript
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### 23. arr.flat(),flatMap()  <Badge text="ES6" type="warning"/>
- 返回修改的数组
- 不修改原数组

> `Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
```javascript
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1。
```javascript
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
```

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。
```javascript
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```
flatMap()只能展开一层数组。

flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
```javascript
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```
flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。



  `Array.from` <Badge text="ES6" type="warning"/>
- `Array.from` 方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map）

    

``` js
    var a = {
        length: 2,
        0: 'aaa',
        1: 'bbb'
    };
    Array.from(a); //['aaa','bbb']
    // 原理：Array.prototype.slice.call(a);
    var b = {
        length: 2
    };
    Array.from(b); //[undefined.undefined]
```

  `Array.of` <Badge text="ES6" type="warning"/>
- `Array.of` 方法用于将一组值，转换为数组。
- `Array.of` 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

    

``` js
    Array.of() // []
    Array.of(undefined) // [undefined]
    Array.of(1) // [1]
    Array.of(1, 2) // [1, 2]
```

# 数组的空位
> 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位
```javascript
Array(3) // [, , ,]
```
上面代码中，Array(3)返回一个具有 3 个空位的数组。

:::warning
注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
:::
```javascript
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```
## 空位处理
ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
- forEach(), filter(), reduce(), every() 和some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串
```javascript
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a#"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```
ES6 则是明确将空位转为undefined。
```javascript
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
// 扩展运算符（...）也会将空位转为undefined。

[...['a',,'b']]
// [ "a", undefined, "b" ]
// copyWithin()会连空位一起拷贝。

[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
// fill()会将空位视为正常的数组位置。

new Array(3).fill('a') // ["a","a","a"]
// for...of循环也会遍历空位。

let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
// 上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
// 由于空位的处理规则非常不统一，所以建议避免出现空位
```

## 数组乱序

> 将数组顺序打乱：例如不重复随机选取数组内容，可将数组打乱后按顺序取出

`arr.sort(()=>Math.random()-0.5)` 数组乱序排列

``` js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.sort(() => Math.random() - 0.5)
console.log(arr);
```

* 案例： 抽奖，有1等奖一名，2等奖1名，3等奖2名，未中奖5名，要求每次点击抽取一个奖项
