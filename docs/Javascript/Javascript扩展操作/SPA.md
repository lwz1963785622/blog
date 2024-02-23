# SPA
单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。

## 前端路由
随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。 类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。

“更新视图但不重新请求页面”是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有两种方式：

* 利用URL中的hash（"#"）
* 利用History interface在 HTML5中新增的方法

### Hash 模式
在 2014 年之前，大家是通过 hash 来实现路由,url hash 就是类似于：
```
http://www.xxx.com/#/login
```

这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听hashchange来实现更新页面部分内容的操作：
```js
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', matchAndUpdate)
```

### History 模式
14年后，因为HTML5标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有popstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。
```js
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}

window.addEventListener('popstate', matchAndUpdate)
```

## 实现Hash路由模式步骤
1. 切换页面：路由的最大作用就是切换页面，以往后台的路由是直接改变了页面的url方式促使页面刷新。但是前端路由通过 # 号不能刷新页面，只能通过 window 的监听事件 hashchange 来监听hash的变化，然后捕获到具体的hash值进行操作
```js
//路由切换
window.addEventListener('hashchange',function(){
    //do something
    this.hashChange()
})
```
2. 注册路由：我们需要把路由规则注册到页面，这样页面在切换的时候才会有不同的效果。
```js
//注册函数
 map:function(path,callback){
   path = path.replace(/\s*/g,"");//过滤空格
   //在有回调，且回调是一个正确的函数的情况下进行存储 以 /name 为key的对象 {callback:xx}
   if(callback && Object.prototype.toString.call(callback) === '[object Function]' ){
       this.routers[path] ={
            callback:callback,//回调
            fn:null //存储异步文件状态，用来记录异步的js文件是否下载，下文有提及
        }
    }else{
    //打印出错的堆栈信息
        console.trace('注册'+path+'地址需要提供正确的的注册回调')
    }
 }
 //调用方式
 map('/detail',function(transition){
})
```
3. 异步加载js：一般单页面应用为了性能优化，都会把各个页面的文件拆分开，按需加载，所以路由里面要加入异步加载js文件的功能。异步加载我们就采用最简单的原生方法，创建script标签，动态引入js。
```js
var _body= document.getElementsByTagName('body')[0],
    scriptEle= document.createElement('script');
scriptEle.type= 'text/javascript';
scriptEle.src= xxx.js;
scriptEle.async = true;
scriptEle.onload= function(callback){
    //为了避免重复引入js，我们需要在这里记录一下已经加载过的文件，对应的 fn需要赋值处理
    callback()
}
_body.appendChild(scriptEle);   
```
4. 参数传递：在我们动态引入单独模块的js之后，我们可能需要给这个模块传递一些单独的参数。这里借鉴了一下jsonp的处理方式，我们把单独模块的js包装成一个函数，提供一个全局的回调方法，加载完成时候再调用回调函数。
```js
SPA_RESOLVE_INIT = function(transition) {
    document.getElementById("content").innerHTML = '<p style="color:#F8C545;">当前异步渲染列表页'+ JSON.stringify(transition) +'</p>'
    console.log("首页回调" + JSON.stringify(transition))
}
```
5. 以上我们已经完成了基本功能，我们再对齐进行扩展，在页面切换之前beforeEach和切换完成afterEach的时候增加2个方法进行处理。思路是，注册了这2个方法之后，在切换之前就调用beforeEach，切换之后，需要等待下载js完成，在onload里面进行调用 afterEach
```js
//切换之前一些处理
beforeEach:function(callback){
   if(Object.prototype.toString.call(callback) === '[object Function]'){
       this.beforeFun = callback;
   }else{
       console.trace('路由切换前钩子函数不正确')
   }
},
//切换成功之后
afterEach:function(callback){
   if(Object.prototype.toString.call(callback) === '[object Function]'){
       this.afterFun = callback;
   }else{
       console.trace('路由切换后回调函数不正确')
   }
}
```


## 完整
```js
/*
**使用方法
*       1：注册路由 : spaRouters.map('/name',function(transition){
                        //异步加载js
                        spaRouters.asyncFun('name.js',transition)
                        //或者同步执行回调
                        spaRouters.syncFun(function(transition){},transition)
                    })
        2：初始化      spaRouters.init()
        3：跳转  href = '#/name'           
*/
var util = {
    //获取路由的路径和详细参数
    getParamsUrl:function(){
        var hashDeatail = location.hash.split("?"),
            hashName = hashDeatail[0].split("#")[1],//路由地址
            params = hashDeatail[1] ? hashDeatail[1].split("&") : [],//参数内容
            query = {};
        for(var i = 0;i<params.length ; i++){
            var item = params[i].split("=");
            query[item[0]] = item[1]
        }       
        return  {
            path:hashName,
            query:query
        }
    }
}
function spaRouters(){
    this.routers = {};//保存注册的所有路由
    this.beforeFun = null;//切换前
    this.afterFun = null;
}
spaRouters.prototype={
    init:function(){
        var self = this;
        //页面加载匹配路由
        window.addEventListener('load',function(){
            self.urlChange()
        })
        //路由切换
        window.addEventListener('hashchange',function(){
            self.urlChange()
        })
        //异步引入js通过回调传递参数
        window.SPA_RESOLVE_INIT = null;
    },
    refresh:function(currentHash){
        var self = this;
        if(self.beforeFun){
            self.beforeFun({
                to:{
                    path:currentHash.path,
                    query:currentHash.query
                },
                next:function(){
                    self.routers[currentHash.path].callback.call(self,currentHash)
                }
            })
        }else{
            self.routers[currentHash.path].callback.call(self,currentHash)
        }
    },
    //路由处理
    urlChange:function(){
        var currentHash = util.getParamsUrl();
        if(this.routers[currentHash.path]){
            this.refresh(currentHash)
        }else{
            //不存在的地址重定向到首页
            location.hash = '/index'
        }
    },
    //单层路由注册
    map:function(path,callback){
        path = path.replace(/\s*/g,"");//过滤空格
        if(callback && Object.prototype.toString.call(callback) === '[object Function]' ){
            this.routers[path] ={
                callback:callback,//回调
                fn:null //存储异步文件状态
            }
        }else{
            console.trace('注册'+path+'地址需要提供正确的的注册回调')
        }
    },
    //切换之前一些处理
    beforeEach:function(callback){
        if(Object.prototype.toString.call(callback) === '[object Function]'){
            this.beforeFun = callback;
        }else{
            console.trace('路由切换前钩子函数不正确')
        }
    },
    //切换成功之后
    afterEach:function(callback){
        if(Object.prototype.toString.call(callback) === '[object Function]'){
            this.afterFun = callback;
        }else{
            console.trace('路由切换后回调函数不正确')
        }
    },
    //路由异步懒加载js文件
    asyncFun:function(file,transition){
       var self = this;
       if(self.routers[transition.path].fn){
            self.afterFun && self.afterFun(transition)  
            self.routers[transition.path].fn(transition)
       }else{
           console.log("开始异步下载js文件"+file)
           var _body= document.getElementsByTagName('body')[0];
           var scriptEle= document.createElement('script');
           scriptEle.type= 'text/javascript';
           scriptEle.src= file;
           scriptEle.async = true;
           SPA_RESOLVE_INIT = null;
           scriptEle.onload= function(){
               console.log('下载'+file+'完成')
               self.afterFun && self.afterFun(transition)   
               self.routers[transition.path].fn = SPA_RESOLVE_INIT;
               self.routers[transition.path].fn(transition)
           }
           _body.appendChild(scriptEle);        
       }        
    },
    //同步操作
    syncFun:function(callback,transition){
        this.afterFun && this.afterFun(transition)
        callback &&　callback(transition)
    }
}
//注册到window全局
window.spaRouters = new spaRouters();
```
