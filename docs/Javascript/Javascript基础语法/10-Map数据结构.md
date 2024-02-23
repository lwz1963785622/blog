# Map && WeakMap  <Badge text="ES6" type="warning"/>

## Map

### 概述

> javascript对象，本质上是键值对的集合。之前，只能用字符串当做键。<br/>
> Map数据结构类似于对象，也是键值对的集合，但是"键"的范围不限于字符串，各种类型的值（包括对象）都可以当作键。<br/>
> Object结构提供了"字符串—值"的对应，Map结构提供了"值—值"的对应，是一种更完善的Hash结构实现。<br/>
> 所以需要"键值对"的数据结构时，Map比Object更合适。<br/>

### 基本用法

  + Map 作为一个构造函数，可以接受一个数组当做参数。
  + Map 结构中，字符串"true" 和 布尔值true 是两个不同的键值。

```javascript
  var map = new Map([
      [true, 'one'],
      ['true', 'two']
  ]);

  console.log(map.get(true)) // 'one'
  console.log(map.get('true')) // 'two'
```

Map构造函数接受数组作为参数，实际上执行的是下面的算法。

```js
const items = [
    ['name', '张三'],
    ['title', 'Author']
];

const map = new Map();

items.forEach(
    ([key, value]) => map.set(key, value)
);
```

  + 只有对同一个对象的引用，Map结构才将其视为同一个键。所以下例中 set 和 get 中的 [1] 不是同一个键。
  + 虽然NaN不严格相等于自身，但Map将其视为同一个键。

  

```javascript
  var map = new Map();

  map.set([1], 111);
  map.set(NaN, 222);
  console.log(map.get([1])); // undefined
  console.log(map.get(NaN)); // 222
```

如果对同一个键多次赋值，后面的值将覆盖前面的值。

```js
const map = new Map();

map
    .set(1, 'aaa')
    .set(1, 'bbb');

map.get(1) // "bbb"
```

::: tip
注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
// 代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
```

:::

### Map 属性

* size 返回 Map结构的成员个数。
  

```javascript
  var map = new Map([
      [true, 'one'],
      ['true', 'two']
  ]);

  map.set([1], 111);
  console.log(map.size); // 3
```

### Map 操作方法

* set() 方法返回的是Map本身，因此也可以采用链式写法。
  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b');
  map.set(3, 'c')
  console.log(map) // Map {1 => "a", 2 => "b", 3 => "c"}
```

* get() 方法读取对应的键值，如果找不到传入的键值，返回undefined。
  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

  console.log(map.get(1)) //'a'
  console.log(map.get(2)) //'b'
  console.log(map.get(3)) //'c'
```

* has() 方法返回一个布尔值，表示该键值是否在 Map 结构中。
  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

  console.log(map.has(2)) //  true
  console.log(map.has(4)) //  false
```

* delete() 方法删除某个键，返回true。如果删除失败，返回false。
  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

  console.log(map.has(2)); //  true
  console.log(map.delete(2)); // true
  console.log(map.has(2)); // false
  console.log(map.delete(4)); // false
```

* clear() 方法清除所有成员，没有返回值。
  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

  console.log(map); // Map {1 => "a", 2 => "b", 3 => "c"}
```

  

```javascript
  var map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

  console.log(map.clear()); // undefined
  console.log(map); // Map {}
```

### Map 遍历方法

  + keys()：返回键名的遍历器。
  + values()：返回键值的遍历器。
  + entries()：返回所有成员的遍历器。
  + forEach(): 遍历 Map 的所有成员。

::: tip
Map 的遍历顺序就是插入顺序。
:::

```javascript
  var map = new Map([
      ['name', 'bob'],
      ['age', 18],
  ]);

  for (let key of map.keys()) {
      console.log(key);
      // name
      // age
  }

  for (let value of map.values()) {
      console.log(value);
      // bob
      // 18
  }

  for (let kv of map.entries()) {
      console.log(kv[0], kv[1]);
      // name bob
      // age 18
  }

  for (let [key, value] of map.entries()) {
      console.log(key, value);
      // name bob
      // age 18
  }

  for (let [key, value] of map) {
      console.log(key, value);
      // name bob
      // age 18
  }
```

### Map && 数组

* Map 转为 数组
  

```javascript
  var myMap = new Map().set(false, 0).set({
      aa: 1
  }, [2, 3]);
  var arr = [...myMap];
  console.log(arr)
  // [ [ false, 0 ], [ { aa: 1 }, [ 2, 3 ] ] ]
```

* 数组 转为 Map
  

```javascript
  var yMap = new Map([
      [false, 0],
      [{
              aa: 1
          },
          [2, 3]
      ]
  ]);
  console.log(yMap);
  // Map {false => 0, Object {aa: 1} => [2, 3]}
```

### Map && 对象

* Map 转为 对象
  >如果所有Map的键都是字符串，它可以转为对象。

  

```javascript
  function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k, v] of strMap) {
          obj[k] = v;
      }
      return obj;
  }

  var myMap = new Map().set('yes', true).set('no', false);
  strMapToObj(myMap)
  // { yes: true, no: false }
```

* 对象 转为 Map

  

```javascript
  function objToStrMap(obj) {
      let strMap = new Map();
      for (let k of Object.keys(obj)) {
          strMap.set(k, obj[k]);
      }
      return strMap;
  }

  objToStrMap({
      yes: true,
      no: false
  })
```

* Map 转为 JSON

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({
    foo: 3
}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

* JSON 转为 Map
JSON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

* WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名。
* 键名所指向的对象，不计入垃圾回收机制。
  

```javascript
  var map = new WeakMap()
  map.set(1, 2); // Uncaught TypeError: Invalid value used as weak map key
  map.set(Symbol(), 2); // Uncaught TypeError: Invalid value used as weak map key
```

