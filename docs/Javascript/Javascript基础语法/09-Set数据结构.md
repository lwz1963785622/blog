# Set && WeakSet  <Badge text="ES6" type="warning"/>


## set 基本用法
该数据结构，类似于数组，但是，它的成员都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 `Set` 数据结构。


```javascript
// 上面代码通过add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
var s = new Set();
[2, 3, 3, 5, 4, 5].map(x => {
s.add(x);
console.log(s);
});
// Set {2}
// Set {2, 3}
// Set {2, 3}
// Set {2, 3, 5}
// Set {2, 3, 5, 4}
// Set {2, 3, 5, 4}
```

在Set()函数中可以传入一个数组`（或者具有 iterable 接口的其他数据结构）`类型的参数。
```javascript
var set = new Set([3,5,1,1,4]);
console.log([...set]);    // [3,5,1,4]
console.log(set.size);    // 4
```

在set中，判断是否重复，使用的是"Same-value equality",类似于"===",但是有例外，其中NaN不等于NaN。
```javascript
var set = new Set();
set.add(NaN);
set.add(NaN);
set.add("1");
set.add(1);
console.log(set) // Set {NaN, "1", 1}
```

```js
// 去除数组的重复成员
[...new Set(array)]
// 去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
```

Array.from方法可以将 Set 结构转为数组。
```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);


function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

## Set 实例的属性和方法

### 属性
* `Set.prototype.constructor`：构造函数，默认是 Set 函数。
* `Set.prototype.siz`e：返回 Set 实例的成员总数。

### 方法
#### 操作方法

| 方法     | 描述    |
| :------------- | :------------- |
| add(value)      | 添加某个值，返回Set结构本身。       |
| delete(value)| 删除某个值，返回一个布尔值，表示删除是否成功。|
| has(value)| 返回一个布尔值，表示该值是否为Set的成员。|
| clear()| 清除所有成员，没有返回值。|

```javascript
var set = new Set();
set.add(1).add(2).add(2);

console.log(set.size) // 2

console.log(set.has(1)) // true
console.log(set.has(2)) // true
console.log(set.has(3)) // false
console.log(set.delete(2)); // true
console.log(set.delete(3)); // false
console.log(set) // set {1}
set.clear()
console.log(set) // set {}
```

#### 遍历方法 (Set 的遍历顺序就是插入顺序)
| 方法     | 描述    |
| :------------- | :------------- |
| keys()| 返回键名的遍历器|
| values()| 返回键值的遍历器|
| entries()| 返回键值对的遍历器|
| forEach()| 使用回调函数遍历每个成员|
>由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法完全一致。

```javascript
var set = new Set([1, 2, 3]);

console.log(set.keys());   // SetIterator {1, 2, 3}
console.log(set.values());   // SetIterator {1, 2, 3}
console.log(set.entries());   // SetIterator {[1,1],[2,2],[3,3]}
set.forEach((value, key) => console.log(value) )   // 1 2 3
```

#### 遍历的应用
扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```
扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
```js
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
```
而且，数组的map和filter方法也可以间接用于 Set 了。
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
```


## WeakSet
WeakSet的成员只能是对象，而不能是其他类型的值。也是不重复的值的集合.

WeakSet中的对象都是弱引用，垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

### 语法
> WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
```js
const ws = new WeakSet();
```

### 操作方法

| 方法     | 描述    |
| :------------- | :------------- |
| add(value)      | 向 WeakSet 实例添加一个新成员 |
| delete(value)| 清除 WeakSet 实例的指定成员|
| has(value)| 返回一个布尔值，表示某个值是否在|
```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false
```

 WeakSet 的另一个例子。
 ```js
 const foos = new WeakSet()
  class Foo {
    constructor() {
      foos.add(this)
    }
    method () {
      if (!foos.has(this)) {
        throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
      }
    }
  }
```