# Math对象
>Math（算数）对象的作用是：执行常见的算数任务。
>没有构造函数 Math()，在使用Math上的方法和属性时无需创建，把 Math当作对象使用就可以调用其所有属性和方法就就可以。

## Math上的属性
| 属性 |  属性描述 |
| ---- | ---- |
|PI	|返回圆周率（约等于3.14159）。|
|E	|返回算术常量 e，即自然对数的底数（约等于2.718）。|
|LN2|	返回 2 的自然对数（约等于0.693）。|
|LN10	|返回 10 的自然对数（约等于2.302）。|
|LOG2E|	返回以 2 为底的 e 的对数（约等于 1.414）。|
|LOG10E|	返回以 10 为底的 e 的对数（约等于0.434）。|
|SQRT1_2|	返回返回 2 的平方根的倒数（约等于 0.707）。|
|SQRT2|	返回 2 的平方根（约等于 1.414）。|

## Math的常用方法
| 方法 |  方法描述 |
| ---- | ---- |
| Math.abs(x)	|返回x的绝对值。|
| **Math.round(x)** |	返回x四舍五入之后的整数值 |
| **Math.ceil(x)** |	返回x的近似值，向上取整  |
| **Math.floor(x)**	| 返回x的近似值，向下取整 |
| **Math.max(x,y)** |	返回x,y中的最大值 |
| **Math.min(x,y)** |	 返回x,y中的最小值 |
| **Math.random()**	| 返回一个0~1之间的数字|
|Math.trunc(x)	| 将x的小数部分去除，返回整数部分(ie不能使用) |
|**Math.pow(x,y)**	|  取x的y次幂|
|Math.sqrt(x)	|  返回x的平方根  |
|Math.cbrt(x)	|  计算一个数的立方根  |
|Math.sin(x)|	 返回x的正弦值 |
|Math.cos(x)|	返回x的余弦值 |
|Math.tan(x)	| 返回x的正切值 |
|Math.asin(x)	| 返回x的反正弦值|
|Math.acos(x)	| 返回x的反余弦值|
|Math.atan(x)|	返回x的反正切值|
|Math.sign() | 用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。|
|Math.clz32() |将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。|
|Math.imul() |Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。|
|Math.fround() |返回一个数的32位单精度浮点数形式。|
|Math.hypot() |Math.hypot方法返回所有参数的平方和的平方根。|
|NumberObject.toFixed(num) | 可把 Number 四舍五入为指定小数位数的数字|

### toFixed() 方法

toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。

语法
```
NumberObject.toFixed(num)
```
参数|	描述
-----|-------
num	 | 必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。


### 小技巧
1. 取x的y次方根
```js
Math.pow(x,1/y)
```
2. 查找数组中最大和最小的数字
```js
var arr=[23,4,651,461,1231,411];
var maxArr=Math.max(...arr);    //  arr数组中的最大值
var minArr=Math.min(...arr);   //  arr数组中的最小值
```

3. **取x-y的随机数、随机整数**
```js
Math.floor( Math.random() * (y - x) + x )      // 包含x不包含y
Math.floor( Math.random() * (y - x + 1) + x  )      // 包含x包含y
```
    > 注：取随机整数必须使用`Math.floor`取整， `Math.ceil`和`Math.round`会导致两端的值取到几率变小
