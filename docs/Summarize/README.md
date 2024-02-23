# 项目分享

[[toc]]

## 跨端技术评估 (uniapp ReactNative )

### 官网地址和介绍

[uni-app](https://uniapp.dcloud.io/)

> uni-app 是一个使用 `Vue.js` 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/快手/钉钉/淘宝）、快应用等多个平台。

[Reactnative](https://reactnative.cn/)

> 使用 `React` 来创建 Android 和 iOS 的原生应用

### 技术学习成本和难度

* ReactNative， React，要求精通Flex布局，要求原生开发协作。
* uni-app，Vue，了解小程序。

### 优势劣势

#### 性能

* uni-app 性能问题存在瓶颈，原生通信受限制，需要根据官方提供间接通信
* Reactnative 性能基本和原生应用无大差别

#### 多端

* uni-app 可打包为App(安卓、ios) 小程序 H5 (需要写条件编译)
* Reactnative 只可打包为App(安卓、ios)

#### UI

* uni-app 只需要写一套界面ui，就可以适应不同手机的用户
* Reactnative  在iOS和Android平台上，使用2套ui库

#### 生态

* uni-app 全端推送（UniPush集成了iOS、华为、小米、OPPO等众多原厂推送）、各种国内登陆、支付、分享SDK、各种国内地图、各种ui库、以及Echart图表等
* Reactnative facebook登陆分享、Google地图等

### 总结

* uniapp 速度要快一点，学习和开发效率稍高，文档稍乱，多端编译有小bug，小问题较多 或 条件编译处理。
* Reactnative 不支持小程序 h5 等。
* uniapp 推送 登录 支付 ui库等  生态较好。
* Reactnative 性能高、堪比原生。

> uniapp 开发较小项目较为合适，速度快 但与原生通信通信限制。开发基本的App uniapp封装的Api基本够用。

> ReactNative 开发效率没有uni-app高、要求懂点原生 但性能较好。

## 刷新Token实现

> 前端登录后，后端返回token rtoken 当token过期时要求用旧token根据rtoken去获取新的token，前端需要做到无痛刷新token，即请求刷新token时要做到用户无感知。

### 需求解析

当用户发起一个请求时，判断token是否已过期，若已过期则先调refresh接口，拿到新的token后再继续执行之前的请求。
这个问题的难点在于：当同时发起多个请求，而刷新token的接口还没返回，此时其他请求该如何处理？

### 实现思路

* 方法一：

  在请求发起前拦截每个请求，判断token的有效时间是否已经过期，若已过期，则将请求挂起，先刷新token后再继续请求。

    - 优点： 在请求前拦截，能节省请求，省流量。
    - 缺点： 需要后端额外提供一个token过期时间的字段；使用了本地时间判断，若本地时间被篡改，特别是本地时间比服务器时间慢时，拦截会失败。

::: tip
token有效时间建议是时间段，类似缓存的MaxAge，而不要是绝对时间。当服务器和本地时间不一致时，绝对时间会有问题。
:::

* 方法二：

  不在请求前拦截，而是拦截返回后的数据。先发起请求，接口返回过期后，先刷新token，再进行一次重试

    - 优点：不需额外的token过期字段，不需判断时间。
    - 缺点： 会消耗多一次请求，耗流量。

### 实现

####  先看一道面试题

```js
console.log('start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

new Promise((resolve) => {
        console.log('promise')
        resolve()
    })
    .then(() => {
        console.log('then1')
    })
    .then(() => {
        console.log('then2')
    })

console.log('end')

输出为
start
promise
end
then1
then2
setTimeout
```

#### Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### 代码实现

```js
let isRefreshing = false // 标记是否正在刷新 token 避免重新请求
let requests = [] // 存储待重发请求的数组

//HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.message || '未知错误';
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    //如果是401则跳转到登录页面
    if (status === 401 && res.data.code === 401) {
        if (res.data.message == 'token无效') {
            let {
                r_token
            } = getToken();
            let reftokenMethods = new reftokenRreq(res.config, r_token);
            return reftokenMethods.reftokenRreq();
        } else {
            store.dispatch('FedLogOut').then(() => router.push({
                path: '/login'
            }));
        }
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
        Message({
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }
    return res;
}, error => {
    NProgress.done();
    return Promise.reject(new Error(error));
})

class reftokenRreq {
    constructor(config, r_token) {
        this.config = config;
        this.r_token = r_token;
    }
    //重复执行请求操作
    repeatRequest({
        url,
        method,
        data,
        params,
        headers
    }) {
        return axios({
            headers,
            url,
            method,
            data,
            params
        })
    }
    // 刷新token 请求
    reftokenRreq() {
        if (!isRefreshing) {
            isRefreshing = true
            return reftoken(this.r_token).then((res) => {
                    if (res.data.code == 200) {
                        store.commit('SET_TOKEN', res.data.data);
                        requests.forEach((cb) => cb());
                        requests = [] // 重新请求完清空
                        return this.repeatRequest(this.config)
                    } else {
                        store.dispatch('FedLogOut').then(() => router.push({
                            path: '/login'
                        }));
                    }
                })
                .finally(() => {
                    // 设置请求是否成功设置为false
                    isRefreshing = false
                })
        } else {
            // 返回未执行 resolve 的 Promise
            return new Promise(resolve => {
                // 用函数形式将 resolve 存入，等待刷新后再执行
                requests.push(() => {
                    resolve(this.repeatRequest(this.config))
                })
            })
        }
    }

}
```

## 小程序登录

> 小程序可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序内的用户体系。

### 登录流程时序

::: warning
会话密钥 session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
临时登录凭证 code 只能使用一次
:::

![api-login](/img/Summarize/api-login.2fcc9f35.jpg)

### UnionID 机制说明

> 如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，UnionID是相同的。

### 流程开始

小程序登录  用户信息相关接口已在 `2021年4月` 已做出跳转，具体点击 [Link]( https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?highLine=login ) 

![api-login](/img/Summarize/0.png)

登录逻辑
1.  用户第一次登录 （旧逻辑）
 *    弹窗是否同意授权（调取接口获取是否已有注册）
 *    调用手机手机号授权直接注册登录、
1.  用户第一次登录 （新逻辑）
 *    调用login 登录后直接获取code  如果失败后获取后台给的unionId 通过手机号注册并登录（需要注意login 获取的code 是否过期 避免重复请求和 session_key 对应不上）
2. 用户不是第一次登录。共同逻辑
 *    本地有token 并且rtoken 未过期的情况直接换rtoken。
 *    本地有token  rtoken token 都过期的情况  判断rtoken 刷新失败 跳到我的页面，用户点击登录。
 *    本地没有token 重复第一步 检测用户授权后登录
 
一. 调用wx.login生成code （如果是老用户 直接登录成功）

```js
// 微信授权登录 封装
export const loginByOpenid = () => {
    return new Promise((resolve, reject) => {
        // https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801
        uni.login({
            success(login) {
                // login 返回 并存下 是因为 避免新用户进来 又不注册的特殊情况。（因为login 的 code 是有时间限制的）
                const code = login.code;
                uni.setStorageSync('code', code);
                //整合数据请求登录 
                /*
                wxlogin 接口是服务端 根据 code 以及小程序的 appid secret  grant_type 获取 UnionID  和  session_key
                UnionID 是 唯一的  可在数据库中查询出 用户是否存在 
                    存在    生成token 直接返回前端并登录
                    不存在  证明用户未登录 返回特殊编码（后续使用202判断）
                */
                wxlogin('/mall-cloud-system/authService/xcxLoginByUnionId', {
                    code
                }).then(res => {
                    resolve(res)
                }).catch((erro) => {
                    reject(erro)
                })
            },
            fail(erro) {
                reject(erro)
            }
        })
    })
}
// loginByOpenid 方法调用
loginByOpenid().then(res => {
    //  这里的 Promise 返回 请求 wxlogin 接口的数据
    if (res.code == 200) {
        // 如果200了 证明 login.code 正确 是老用户 并返回了token
        uni.showToast({
            title: '登录成功',
            icon: 'none'
        })
        //登录成功
        const token = {
                a_token: res.data.a_token,
                r_token: res.data.r_token,
            }
            ......
    } else if (res.code == 202) {
        // 如果是202（可与后台协商为注册的信息） 把当前用户唯一的 UnionID 存下来 后续手机号 注册登录 需要参数
        const unid = res.data;
        uni.setStorageSync('unionId', unid);
        // 这里后续应弹出 授权 用户信息  和 手机号 方法 
        ......
    } else if (res.code == 500) {
        uni.showToast({
            title: res.message,
            icon: 'none'
        })
    }
}).catch(error => {
    uni.showToast({
        title: '登录失败，请重新登录!',
        icon: 'none'
    })
})
```

二、wx.getUserProfile 获取用户资料  和  button 组件 `open-type="getPhoneNumber" ` 获取手机号。 （获取用户资料 和手 机号 顺序可根据需求自定义）

::: warning
`getUserProfile` 获取用户信息。页面产生点击事件后才可调用，每次请求都会弹出授权窗口，用户同意后返回 userInfo. 该接口用于替换 wx.getUserInfo

`getPhoneNumber` 需要将 button 组件 open-type 的值设置为 getPhoneNumber，当用户点击并同意之后，可以通过 bindgetphonenumber 事件回调获取到微信服务器返回的加密数据， 然后在第三方服务端结合 session_key 以及 app_id 进行解密获取手机号。

 在回调中调用 wx.login 登录，可能会刷新登录态。此时服务器使用 code 换取的 sessionKey 不是加密时使用的 sessionKey，导致解密失败。建议开发者提前进行 login；或者在回调中先使用 checkSession 进行登录态检查，避免 login 刷新登录态。

`checkSession` 检查登录态是否过期。 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。

登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)。

:::

```html
<u-button type="primary" @click="getuserinfo">使用微信授权登录</u-button>

<u-button open-type="getPhoneNumber" type="primary" @getphonenumber="getPhoneNumber">授权手机号登录</u-button>
```

```js
// 用户首次登录	 loginByOpenid 失败后处理的
export const loginByMobile = (callback) => {
    function mobileFun(code) {
        // 后台返回的unionId
        let unionId = uni.getStorageSync('unionId');
        // 获取手机获得的
        let iv = uni.getStorageSync('cashIv');
        let encryptedData = uni.getStorageSync('cashEncryptedData');
        let UserProfile = uni.getStorageSync('UserProfile');
        // xcxLoginByMobile 接口 向后台传参 解密手机号的字段 和 当前用户的资料 
        wxlogin('/mall-cloud-system/authService/xcxLoginByMobile', {
            unionId,
            iv,
            encryptedData,
            code,
            ...UserProfile
        }).then(res => {
            // 在参数回调 中传入 接口成功 或 失败 后的处理 
            callback(res)
        }).catch((res) => {
            callback(res)
        })
    }
    // 这个方法用于检测 检查登录态是否过期
    uni.checkSession({
        success(res) {
            // 没有过期的话 证明 存在的的code 可直接使用
            console.log(res, '没有过期')
            //session_key 未过期，并且在本生命周期一直有效
            let code = uni.getStorageSync('code');
            mobileFun(code)
        },
        fail(res) {
            console.log(res, '已过期')
            // session_key 已经失效，需要重新执行登录流程 获取code
            uni.login({
                success(res) {
                    mobileFun(res.code)
                },
                fail() {
                    uni.showToast({
                        title: '登录失败，请重试！',
                        icon: 'none'
                    })
                }
            })
        }
    })
}

// getUserProfile 获取用户资料 头像 昵称 性别 等信息
getuserinfo(res) {
    uni.getUserProfile({
        desc: '登录同步数据',
        success: (res) => {
            // 这里成功获取后 把用户信息存下来 调取手机号登录
            uni.setStorageSync('UserProfile', res.userInfo);
        },
        fail: (res) => {
            console.log(res)
            uni.showToast({
                title: '授权失败!',
                icon: 'none'
            })
        }
    })
}

// 用户手机号登录
getPhoneNumber(res) {
    if (res.detail.errMsg == "getPhoneNumber:fail user deny") {
        uni.showToast({
            title: '授权失败!',
            icon: 'none'
        })
        return;
    } else {
        //用户同意授权手机号
        //    iv 加密算法的初始向量，详细见加密数据解密算法
        uni.setStorageSync('cashIv', res.detail.iv);
        //    encryptedData  包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
        uni.setStorageSync('cashEncryptedData', res.detail.encryptedData);
        loginByMobile(res => {
            if (res.code == 200) {
                uni.showToast({
                    title: '登录成功',
                    icon: 'none'
                })
                this.show = false;
                //登录成功
                //登录成功
                let token = {
                        a_token: res.data.a_token,
                        r_token: res.data.r_token,
                    }
                    ......
            } else {
                uni.showToast({
                    title: '登录失败，请重试！',
                    icon: 'none'
                })
            }
        })
    }
}
```

## 微信相关开发常见问题 

### 微信小程序

#### 项目架构设置

:::  warning 
**合理使用分包加载**

> 整个小程序所有分包大小不超过 `20M` 单个分包/主包大小不能超过 `2M`

* 承载更多功能：小程序单个代码包的体积上限为 2M，使用分包可以提升小程序代码包总体积上限，承载更多的功能与服务。
* 降低代码包下载耗时：使用分包后可以显著减少启动时需要下载的代码包大小，在不影响功能正常使用的前提下，有效降低启动耗时。
* 降低小程序代码注入耗时：若未开启按需注入，小程序编译时会将所有 js 文件打包成同一个文件一次性的注入，并执行所有页面和自定义组件的代码。分包后可以降低注入和实际执行的代码量，从而降低注入耗时。
* 降低页面渲染耗时：使用分包可以避免不必要的组件和页面初始化。
* 降低内存占用：分包能够实现页面、组件和逻辑较粗粒度的按需加载，从而降低内存的占用。
此外，结合分包加载的几个扩展功能，可以进一步优化启动耗时

**避免非必要的全局自定义组件和插件**

> 如果不是公共组件 避免放入全局组件中。如果插件只在某个分包的中使用，请仅在分包中引用插件。

**控制代码包内的资源文件**

> 开发中的静态资源（静态图片、静态文件）尽量使用CDN , 例如阿里云oss。

:::

#### 支付 [文档](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)

::: warning

> wx.requestPayment(Object object) 需要注意后端返回的支付参数 大小写问题。必须和文档种的key值一一对应。

:::

####  [登录授权](#小程序登录) - [文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

#### [其他开放能力相关文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.openSetting.html)

#### 其他细节问题

* 使用`uniapp`开发，`uni.previewImage`会导致触发`App.vue`的`onShow`方法。
* 使用`web-view` 指向网页的链接。可打开关联的公众号的文章，其它网页需登录小程序管理后台配置业务域名。
* 体验者小程序 需要 打开开发调试 才能访问业务域名之外的接口，比如本地调试接口。

### [微信公众号](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)

#### 网页授权 [文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

::: warning
需要配置业务域名和更目录验证文件。
:::

#### JS-SDK 开发能力 [文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

:::warning
微信公众号的开放能力 需要统一引用、使用。
例如：

```js
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
});
```

**之前微信公众号暴露的方法 在文档中不体现。但是还可以继续使用。例如支付方法**

```js
window.WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    payData,
    (res) => {
        // 成功
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
            uni.$u.toast('支付成功!');
            uni.reLaunch({
                url: '/pages/paySuccess/index',
            });
            // 失败
        } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            // Toast('支付失败!')
            uni.$u.toast('取消支付!');
        }
    },
    (err) => {
        uni.$u.toast('支付失败!');
    }
);
```

**目前公众号v3支付成功后 不允许跳转到自定义页面了。只能关闭或者跳转微信自己的配置页面 [相关文档](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml)**
:::

## CSS动画集合

 - [https://lhammer.cn/You-need-to-know-css/#/zh-cn/](https://lhammer.cn/You-need-to-know-css/#/zh-cn/)

 - [https://chokcoco.github.io/CSS-Inspiration/#/](https://chokcoco.github.io/CSS-Inspiration/#/)

 - [https://qishaoxuan.github.io/css_tricks/](https://qishaoxuan.github.io/css_tricks/)

 - [https://tobiasahlin.com/spinkit/](https://tobiasahlin.com/spinkit/)

* [https://animista.net/](https://animista.net/)

* [https://animate.style/](https://animate.style/)

* [http://ianlunn.github.io/Hover/](http://ianlunn.github.io/Hover/)

* [http://kristofferandreasen.github.io/wickedCSS/#](http://kristofferandreasen.github.io/wickedCSS/#)

* [https://angrytools.com/css/animation/](https://angrytools.com/css/animation/)

* [https://elrumordelaluz.github.io/csshake/](https://elrumordelaluz.github.io/csshake/)

## 前端规范总结

### 项目管理

#### 项目介绍文件(README.md文件)

::: tip

#### 最佳实践

**助产空间后台管理**

```

## Project setup

npm install

### Compiles and hot-reloads for development

npm run serve

### Compiles and minifies for production (生产环境 build)

npm run build

### Compiles and minifies for uat (uat环境 build)

npm run uat

### Compiles and minifies for test (test环境 build)

npm run test

### Lints and fixes files

npm run lint

### Run your unit tests

npm run test:unit

### Run your end-to-end tests

npm run test:e2e
```

:::

### GIT管理

#### 分支管理

**每一个项目的分支都有两个基本分支 `master` (项目介绍文件)和 `dev` (开发分支)**

* `master`分支在项目创建之初只是起到介绍的作用，不再进行修改。

* `dev`分支是项目的开发分支，由负责人管理，在每次团队其他成员写了新的功能，由负责人进行分支合并和功能合并.

* 版本上线`dev`合并到`master`。版本迭代从`master`迁移 ，如：由`1.0`-> `dev2.0` `dev3.0`

#### git commit规范

> commit是为了每次提交都有相关的描述文字来解释每次提交的代码，为了其他成员能更好的看懂代码，更好的规范还是很有必要的。

**代码提交的话最好是每天都进行提交，能看到你每天完成了什么**

git提交推荐使用git官方的桌面应用[GitHub Desktop](https://desktop.github.com/)（更好的代码可视化和不再使用单一的命令行）

::: tip
**基本常用的几个**

feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动
:::
细的介绍在阮一峰大佬的[Commit message和Change log](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)编写指南
::: tip
**还有一些其他的**

build：编译相关的修改，例如发布版本、对项目构建或者依赖的改动

ci：自动化流程配置修改，例如持续集成脚本的修改

perf：性能优化相关，例如提升性能、体验

revert：回滚到上一个版本

style：代码风格相关，例如不影响代码逻辑的空格、格式、缩进等修改

workflow：工作流相关的改动，例如增加或者修改自动化流程配置文件等

test：测试用例相关，例如增加或者修改测试用例

:::

### 项目结构

基本的项目结构和文件说明就不说了， `/src` 路径下的文件得出一些结构

::: tip
**基本常用的几个**

 `src/assets`

静态文件存放地址，一般就只是图片文件

 `/src/components`

项目主要组件的文件夹

 `/src/util`

工具函数文件夹，存放项目中使用的工具函数，或者公共变量，公共接口。

 `/src/router`

路由配置项

 `/src/api`

这里主要存放一些接口配置

 `/src/views`

存放逻辑视图代码

 `/src/store`

vuex仓库管理文件

:::

### 代码规范

**先贴几个业内公认的几个比较好的规范**

> 代码规范是为了团队更好的开发制定的规范，其实就是在编辑器里面有更好的可读性，在打包上线之后谁还会看压缩后的代码，一切为了后期的维护和团队其他成员能更好的阅读代码

[腾讯团队前端命名规范](https://www.kancloud.cn/digest/code-guide/42600)

[Airbnb JS代码规范](https://github.com/airbnb/javascript/blob/master/README.md)[（中文版传送门）](https://segmentfault.com/a/1190000013040555)

### .vue模版内的html

**对于详细的vue代码风格大家可以去看一下官方的风格指南[传送门](https://cn.vuejs.org/v2/style-guide/)**

* 遵循HTML标准实现语义化，但是不应该以浪费实用性作为代价

* 任何时候都要用最小的复杂度和最少的标签来解决问题

* 无语义的装饰元素必须用伪元素来做，不要添加无意义的tag

* 例如：可以用background实现的用background，不允许单独的背景图文件（特殊需求除外），多个背景元素用background+伪元素，伪元素不够再加span
元素内纯装饰性的icon图片，左右箭头，尽量使用伪元素

* 不允许为了设置样式为而去使用带样式的标签，使用标签的唯一目的应该是语义化

* 无内容的标签必须自闭合

* 不允许出现h1，h1的内容放在title标签中，页面内的标题从h2开始。

* 不允许低级标题嵌套高级标题, 例如类似的代码

```html
<h3>
    <h2></h2>
</h3>
```

* 对于标签里面的属性值，大于两个的时候要进行换行处理

```vue
<statistics-list-item
    class="containerItem"
    v-for="item in statisticsListToShowWithCondition"
    :class="{isTotal}"
    :style2="!isTotal"
    :timeStart="item.startTime"
    :timeEnd="item.endTime"
    :coverURL="item.cover || item.bookCover"
    :title="item.name || item.bookName"
    :finishedCount="item.completeCount"
    :sumCount="item.allCount"
    :state="item.state"
    @goCurrentStatistic="goCurrentStatistic(item)"
  />
```

* 需要添加副标题的情况下，在`<hx>`后紧接着使用一个p标签表示副标题

* methods里面的函数一个和一个函数之间要空一行保证解构的清晰(需要标注的函数要在函数的头部进行注释处理)

### CSS/LESS/SASS规范

使用小驼峰命名，使用**双下划线**连接不同部分

```html
<div class="chapterStudy-bookReview">
    <ul class="reviewList-self"></ul>
    <ul class="reviewList-others" <!--独立的状态class-->
        :class="{progress, empty, error}"
        >
        <li class="reviewItem" :class="{readOnly}">
            ...
        </li>
    </ul>
</div>
```

**css属性的可读性编写**

参考腾讯的[css代码规范](https://www.kancloud.cn/digest/code-guide/42602)

相关的属性声明按右边的顺序做分组处理，组之间需要有一个空行。

基本顺序正确就行，空行是为了可读性

```css
.declaration-order {
    //div盒子本身的属性
    display: block;
    float: right;
    //div盒子的位置，
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    //div盒模型从外到内的尺寸
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    width: 100px;
    height: 100px;
    //div内的文本类型属性
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    text-align: center;
    //div本身可见区域的属性
    color: #333;
    background-color: #f5f5f5;
    opacity: 1;
}
```

* 不允许使用id

* 不允许使用标签选择器([以下的vue官方的解释](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8))

* 不允许无意义的选择器嵌套，能够同级使用的类不允许互相嵌套，即使是父子级的关系

* 选择器嵌套不允许超过三层

* 可以通过less class复用的样式必须复用，不允许多次重复

* 全局通用的常量，类必须单独管理引用，不允许重复声明

### JS规范

vue组件对象的属性顺序

```js
name,
components,
mixins,
props,
data,
computed,
watch,
filters,
directives,
methods,
beforeRouteEnter,
beforeRoureUpdate,
beforeRouteLeave,
beforeCreate,
created,
beforeMount,
mounted,
beforeDestroy,
destroied
```

* 变量函数使用小驼峰命名，命名必须有含义，不允许使用不明确、随意、或者有歧义的命名

* 与数据状态相关的dom更新必须通过数据控制，不允许直接操作dom。

* 超过一个参数的函数必须使用对象的赋值解构[对象赋值解构的解释](https://github.com/airbnb/javascript/blob/master/README.md#destructuring)

* 不允许出现多余的无效的操作

* 组件内手动注册的事件监听/定时器，必须在组件销毁前手动注销

* 对于重复的操作要避免代码的复制，相同的功能可以进行函数的封装

### 资源约束

* 可以使用css实现的不允许使用图片

* 所有图片必须压缩

* 同一内容的图片只允许有一张
