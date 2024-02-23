# Navigator 对象
Navigator 对象包含有关浏览器的信息,是window对象的属性，中文是"导航器"的意思

## Navigator的属性
| 属性 | 描述 | 值 |
| ---- | ---- | ---- |
| language  |	返回当前浏览器的语言 | "zh-CN"、"en"等 |
|cookieEnabled | 返回指明浏览器中是否启用 cookie 的布尔值 | true,false |
|onLine	| 返回指明系统是否处于联网状态的布尔值 | true,false |
|platform	| 返回运行浏览器的操作系统平台。|  "Win32", "Linux i686", "MacPPC", "MacIntel", 等 |
|userAgent |	返回由客户机发送服务器的 user-agent 头部的值 | userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36" |


### 检测浏览器
检测浏览器版本：
```js
 function getExplorerInfo() {
    var explorer = window.navigator.userAgent.toLowerCase();
    //ie
    if (explorer.indexOf("msie") >= 0) {
        var ver = explorer.match(/msie ([\d.]+)/)[1];
        return { type: "IE", version: ver };
    }
    else if (explorer.indexOf("edge") >= 0) {
        var ver = explorer.match(/edge\/([\d.]+)/)[1];
        return { type: "Edge", version: ver };
    }
    //firefox
    else if (explorer.indexOf("firefox") >= 0) {
        var ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return { type: "Firefox", version: ver };
    }
    //Chrome
    else if (explorer.indexOf("chrome") >= 0) {
        var ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return { type: "Chrome", version: ver };
    }
    //Opera
    else if (explorer.indexOf("opera") >= 0) {
        var ver = explorer.match(/opera.([\d.]+)/)[1];
        return { type: "Opera", version: ver };
    }
    //Safari
    else if (explorer.indexOf("safari") >= 0) {
        var ver = explorer.match(/safari\/([\d.]+)/)[1];
        return { type: "Safari", version: ver };
    }
}
```

检测浏览器是否为PC端
```js
function getExplorerType(){
    var explorer = window.navigator.userAgent.toLowerCase();
    return explorer.indexOf('mobile') === -1
}
```
结果：true PC , false 为 Mobile

检测当前网络状态
```js
//浏览器在线
window.ononline = function(){
    console.log(window.navigator.onLine)
}

//浏览器离线
window.onoffline = function(){
    console.log(window.navigator.onLine)
}
```


h5相机拍照
```html
<!DOCTYPE html>
<html>
    <head lang="en">
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="jquery.min.js"></script>
        <script>
            window.addEventListener("DOMContentLoaded", function () {
                var canvas = document.getElementById("canvas"),
                    context = canvas.getContext("2d"),
                    video = document.getElementById("video"),
                    videoObj = {
                        "video": true
                    },
                    errBack = function (error) {
                        console.log("Video capture error: ", error.code);
                    };
                $("#snap").click(function () {
                    context.drawImage(video, 0, 0, 330, 250);
                })
                if (navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia(videoObj)
                    .then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    })
                    .catch(errBack)
                } else if (navigator.webkitGetUserMedia) {
                    navigator.webkitGetUserMedia(videoObj, function (stream) {
                        video.src = window.webkitURL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                }
            }, false);
        </script>
    </head>    
    <body>
        <div id="contentHolder">
            <video id="video" width="320" height="320" autoplay></video>
            <input type="button" id="snap" style="width:100px;height:35px;" value="拍 照" />
            <canvas style="" id="canvas" width="320" height="320"></canvas>
        </div>
    </body>
</html>
```



## Vibration（震动）
```js
// 可以传入一个大于0的数字，表示让手机震动相应的时间长度，单位为ms
navigator.vibrate(100)

// 也可以传入一个包含数字的数组，比如下面这样就是代表震动300ms，暂停200ms，震动100ms，暂停400ms，震动100ms
navigator.vibrate([300,200,100,400,100])

// 也可以传入0或者一个全是0的数组，表示暂停震动
navigator.vibrate(0)
```

### 用途
使手机震动，用来给用户一个提示，例如说数据校验失败。



<!--
![震动兼容性](assets/002/05-1545359841000.png) -->
