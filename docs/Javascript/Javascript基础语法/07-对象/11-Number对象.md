# Number扩展 <Badge text="ES6" type="warning"/> 

## Number.isFinite() 与 Number.isNaN()

> Number.isFinite()用来检查一个值是否为有限的。<br/>

Number.isNaN()用来检查一个值是否是NaN。

```javascript
console.log(isFinite('15')); // true
console.log(isFinite(true)); // true
console.log(Number.isFinite('15')); // false
console.log(Number.isFinite(true)); // false

console.log(isNaN('true')) // true
console.log(Number.isNaN('true')) // false
```

## Number.isInteger()  用来判断一个值是否为整数。

> 需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

## Number.parseInt(), Number.parseFloat() 

> ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

```javascript
console.log(Number.isInteger(25)) // true
console.log(Number.isInteger(25.0)) // true
console.log(Number.isInteger(25.1)) // false
console.log(Number.isInteger("15")) // false
console.log(Number.isInteger(true)) // false
```

## Number.isSafeInteger() 

> JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

```javascript
Math.pow(2, 53) // 9007199254740992

9007199254740992 // 9007199254740992
9007199254740993 // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
```

> ES6 引入了Number. MAX_SAFE_INTEGER和Number. MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
