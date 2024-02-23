## Ajax 封装
```js
// 兼容实例化一个ajax对象
function newAjax(){
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Miscrosoft.XMLHTTP")
    return xhr;
}

//ajax函数
  //1. type:方式 "get" "post"
  //2. url:地址 url "demo.php"
  //3.data:数据  "id=0&name=zhangsan"
  //4.asynch:是否异步  true  false
  //5.dataType:返回数据的格式 "text" "json" "xml"
  //6.success返回数据之后进行的操作  function(){}
function ajax(options){
    //没有url 直接退出
    if(!options.url){
        alert('请输入URL');
        return;
    }
    var type = options.type || 'GET';
    var async = options.async==undefined?true:options.async;
    var dataType = options.dataType || 'text';
    var dataStr = "";
    if(options.data){
        if(typeof options.data=='string'){
            dataStr = options.data;
        }else{
            //{user:123,pwd:456}
            for(var i in options.data){
                 dataStr+= i+'='+options.data[i]+'&'
                //user=123&pwd=456&
            }
            dataStr = dataStr.slice(0,-1)
        }
    }
    //dataStr = "user=123&pwd=456"

    var xhr = new XMLHttpRequest();

    if(type.toUpperCase() =='GET'){
        if(dataStr){
            xhr.open('GET',options.url+'?'+dataStr,async);
        }else{
            xhr.open('GET',options.url,async);
        }
        xhr.send();
    }
    if(type.toUpperCase() =='POST'){
        xhr.open('POST',options.url,async);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(dataStr);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                if(dataType=='text'){
                    options.success&&options.success(xhr.response);
                }else if(dataType=='xml'){
                    options.success&&options.success(xhr.responseXML);
                }else if(dataType=='json'){
                    options.success&&options.success(JSON.parse(xhr.response));
                }
            }else if(xhr.status ==404){
                alert('请求失败');
            }
        }
    }
}
```


## ajax大规模数据处理
> 假设ajax要请求一条长度10000的数据并渲染,首先由于数据量大ajax请求花费事件会很长,并且前台在处理该数据时也会花费大量事件导致页面长时间留白。所以在请求大规模数据时有以下几种处理方法：

### 1. 数据分页
将大量的数据进行分页展示，每次只获取当前页的数据，则数据的请求和处理会更快。

所以在发送ajax请求时就需要携带分页的参数，一个分页器一般包含`数据总条数`、`总页数`、`当前页码`、`每页数据条数`等数据。其中**当前页码**、**每页条数**需要在发送请求时携带，每当切换页码时重新携带当前页码和每页条数发送请求。

而后台需要返回**当前页数据**，以及**数据总条数**，前台即可根据`数据总条数`及`每页数据条数`计算出`总页数`进行页面渲染。

```js
var currentPage = 2,   // 当前页码
    pageSize = 20;     // 每页数据条数   
ajax({
    url: "",
    data:{
        currentPage,  
        pageSize,   
    },
    success(data){
        var pageCount = Math.ceil(data.total / pageSize)   // 总数据条数total / 每页数据数pageSize   向上取整，即可求出总页数pageCount
    }
})
```

### 2. 分批次请求
当前台不能进行分页时，大规模数据的请求可采用分批次的请求。如10000条数据，第一次请求100条数据（这样用户就很快看到有页面出来），剩余的数据，通过ajax分多次请求给客户端。（这里相当于：用户的一个请求结果，被切割成多次请求来完成）

例如先展示100条数据，剩余数据按需(上拉或者触底)加载



## 文件上传
### 1. form文件上传
> 上传图片必须为`POST`方式，并且设置编码方式`enctype="multipart/form-data"`，否则会默认对文件进行编码则无法使用                
enctype这个属性管理的是表单的MIME编码，有三个值，默认为`application/x-www-form-urlencoded`，是传递html代码的编码类型。`text/plain`,是纯文本传输的意思。`multipart/form-data`,是用来指定传输数据的特殊类型的，主要就是我们上传的非文本的内容，比如图片或者mp3等等。    

```html
<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="file">
</form>
```

### 2. Ajax上传文件
> Ajax上传文件需要依靠表单对象`FormData`，在表单对象中添加数据进行上传    

表单对象`FormData`的作用
* 将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
* 异步上传文件    
兼容性：Chrome 7+、Firefox 4+、IE 10+、Opera 12+、Safari 5+。

#### formData对象
实例化formData，来得到这个对象                             

参数为form，一个HTML表单元素，可以包含任何形式的表单控件，包括文件输入框，是一个可选参数

```js
var formData = new FormData();   
```
通过HTML表单创建FormData对象
```js
var formData = new FormData(document.querySelector("form"));   //包含了form表单里的数据
```
##### 方法
* 通过append(name,value,filename)在数据末尾追加数据，参数值有三个,第三个为可选参数
```js
formdata.append("name","laoliu");   //通过append()方法在末尾追加key为name值为laoliu的数据
```
* 通过get(name)来获取相对应的值
```js
// 获取key为age的值
formdata.get("age");
```
* 通过set(key, value)来设置修改数据（key的值不存在，会添加一条数据）
```js
formdata.set("name","laoli");     
```
* 通过has(key)来判断是否存在对应的key值   返回一个布尔值
```js
formdata.has("name")     
```
* 通过delete(key)可以删除数据
```js
//删除key为name的值
formdata.delete("name");
```

#### Ajax+FormData对象上传文件
```js
var fileTag = document.querySelector("input[type=file]");
 file.onchange=function(){
    // 图片会保存到 标签的files属性中，并且可读取文件的名称、大小等信息
    var fd = new FormData();
    // 添加图片，字段名叫 files
    fd.append('files', fileTag.files[0]);
    // 添加普通字段
    fd.append("user", "zhangsan");
    fd.append("age", 22); //数字22会被立即转换成字符串 "22"
    // ...ajax代码
    xhr.send(fd)
    // ...ajax代码
 }
```

## 轮询
> 原理： 每隔一段时间执行ajax请求，获取实时数据

例：访问实时金价、实时停车等数据

实现方式：在时间函数`setInterval`中进行ajax请求
