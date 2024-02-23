# Date对象
>Date对象是用来处理日期和时间，Date 对象基于1970年1月1日（世界标准时间）起的毫秒数。

## 创建日期对象
通过实例化Date来创建日期对象，传入参数的形式有以下几种

```js
new Date()   
new Date(1543299465541);    //参数为时间戳返回时间戳对应的时间对象   (时间戳是从1970年1月1日开始的毫秒数 )
new Date('December 17, 1996 03:24:00');   //传入日期的字符串形式
new Date('1995-12-17T03:24:00');      
new Date(1996, 02, 07);           //传入年月日，不用加引号
new Date(1996, 02, 07, 3, 24, 0);   //  穿入年，月，日，时，分，秒


new Date();           //  不传参数返回当前时间对象 Tue Nov 27 2018 14:12:40 GMT+0800 (中国标准时间)
new Date(value);      //参数为时间戳返回时间戳对应的时间对象   (时间戳是从1970年1月1日开始的毫秒数 )
new Date(dateString);    //表示日期的字符串值。该字符串应该能被 Date.parse() 方法识别
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
// year代表年份的整数值 month代表月份值（从0-11） day代表一个月中第几天  其余依次分别代表小时，分钟，秒，毫秒
```

## Date上的方法
* Date.now()        返回自1970-1-1 00:00:00 UTC (世界标准时间)至今所经过的毫秒数。
* Date.parse()    解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。

### 获取日期信息的方法

|方法|含义|
|:----|:----|
|getDate()|从 Date 对象返回一个月中的某一天 (1 ~ 31)|
|getDay()| 从 Date 对象返回一周中的某一天 (0 ~ 6)|
|getMonth()| 从 Date 对象返回月份 (0 ~ 11)|
|getFullYear() |从 Date 对象以四位数字返回年份|
|getHours()| 返回 Date 对象的小时 (0 ~ 23)|
|getMinutes() |返回 Date 对象的分钟 (0 ~ 59)|
|getSeconds() |返回 Date 对象的秒数 (0 ~ 59)|
|getMilliseconds()| 返回 Date 对象的毫秒(0 ~ 999) |
|getTime()| 返回 1970 年 1 月 1 日至今的毫秒数|
|getTimezoneOffset() |返回本地时间与格林威治标准时间 (GMT) 的分钟差|

### 设置日期的方法

|    方法  |     含义  |
|:--------|:---------|
|setDate()| 设置 Date 对象中月的某一天 (1 ~ 31)|
|setMonth() |设置 Date 对象中月份 (0 ~ 11)|
|setFullYear()| 设置 Date 对象中的年份（四位数字）|
|setHours()| 设置 Date 对象中的小时 (0 ~ 23)|
|setMinutes()| 设置 Date 对象中的分钟 (0 ~ 59)|
|setSeconds() |设置 Date 对象中的秒钟 (0 ~ 59)|
| setMilliseconds() |设置 Date 对象中的毫秒 (0 ~ 999)|
|setTime()| 以毫秒设置 Date 对象|
| setUTCDate() |根据世界时设置 Date 对象中月份的一天 (1 ~ 31)|
| setUTCMonth()| 根据世界时设置 Date 对象中的月份 (0 ~ 11)|
| setUTCFullYear() |根据世界时设置 Date 对象中的年份（四位数字）|  
| setUTCHours()| 根据世界时设置 Date 对象中的小时 (0 ~ 23)|
| setUTCMinutes()| 根据世界时设置 Date 对象中的分钟 (0 ~ 59)|
| setUTCSeconds()| 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)|
| setUTCMilliseconds()| 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)|

## 获取时间戳的方法
```
var timestamp1 = Date.parse(new Date()); // 结果：1477808630000 不推荐这种办法，毫秒级别的数值被转化为000

var timestamp2 = (new Date()).valueOf(); // 结果：1477808630404 通过valueOf()函数返回指定对象的原始值获得准确的时间戳值

var timestamp3 = new Date().getTime(); // 结果：1477808630404 ，通过原型方法直接获得当前时间的毫秒值，准确

var timetamp4 = Number(new Date()) ; //结果：1477808630404 ,将时间转化为一个number类型的数值，即时间戳

Date.now()           //返回当前时间的时间戳
```

## 课堂实例
    * 网页动态显示当前时间
    * 倒计时
    * 网页版闹钟的实现
    * 根据日期的不同时间段，做问候语：早上8:00-12:00 :“早上好！欢迎登陆系统” 中午12:00-14:00：“中午好！该休息了” 下午14:00-18:00：“下午好！欢迎登陆系统” 晚上19:00-00:00：“晚上好！XXXXXXXXX”
    * 网页中实现一个计算当年还剩多少时间的倒数计时程序，要求网页上实时动态显示“××年还剩××天××时××分××秒”
