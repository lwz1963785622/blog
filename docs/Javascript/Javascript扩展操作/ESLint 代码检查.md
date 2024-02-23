# ESLint 代码检查
在协同开发过程中，每个人都有独立的编码习惯，虽然团队可以通过制定强制执行的规范来保持大家代码风格的尽量一致。但是，在实际编码过程中，个人可能会不经意地继续使用着自己的代码风格，而等到发现不一致再解决又未免有点迟。

> ESLint是一款当前应用十分广泛的JavaScript代码检查工具，使用 Node.js 编写。ESLint 的初衷是为了让程序员可以创建自己的检测规则，使其可以在编码的过程中发现问题而不是在执行的过程中。

### 安装 ESLint
如果仅仅想让 ESLint 成为你项目构建系统的一部分，我们可以在项目根目录进行本地安装：
```shell
$ npm install eslint --save-dev
```

如果想使 ESLint 适用于所有的项目，建议使用全局安装，使用全局安装 ESLint 后，你使用的任何 ESLint 插件或可分享的配置也都必须在全局安装。

```shell
$ npm install -g eslint
```


监测是否下载成功
```shell
$ eslint -v    # v4.15.0
```


### 配置
如果我们要使用ESLint来检查自己的日常JavaScript代码，而并非在项目中使用的话，可以使用`eslint --init`命令来在全局生成一个规则配置文件。

`eslint --init`命令会以命令行选择交互的方式来生成这个规则文件。在输入命令后，会得到如下的结果：
```shell
? How would you like to configure ESLint? (Use arrow keys)
> Answer questions about your style
  Use a popular style guide
  Inspect your JavaScript file(s)
```
1. Answer questions about your style* 通过回答问题来生成规则文件
2. Use a popular style guide* 使用已经配置好的流行的规则(别人推荐的最佳实践)
3. Inspect your JavaScript file(s)* 检查现有的JavaScript文件来自动生成


### 检查规则释义
.eslintrc.js文件生成后，rules部分整体是一个json对象。键是规则的名字，值是关于此规则的配置。

关于每条规则名称的具体含义，我们可以通过其中文意思进行理解，或者查看ESLint官方Rules介绍文档。

而配置则都由这些值开始：

    * "off" 或者0 - 代表关闭此条规则，即不做关于此规则的检测。
    * "warn" 或者 1 - 将此条规则设置为需要进行warning警告的规则，eslint程序的返回码不变。
    * "error" 或者 2 - 将此条规则设置为需要进行error报错的规则，eslint程序的返回码将变为1。


### 执行检查
**检测单个文件**
```shell
$ eslint yourfile.js
```
**检测多个文件**
```shell
$ eslint foo.js bar.js
```

**检测目录下所有文件**  
这里可以指定格式，因为ESLint不止可以检查js文件。
```shell
$ eslint your_directory/**.js
```

**检测目录**
```shell
$ eslint directory_name [directory_name2]
```


#### VSCode 中使用ESLint： [VScode格式化ESlint-方法](https://www.jianshu.com/p/23a5d6194a4b)

> 参考资料：[使用ESLint进行JavaScript代码检查](https://ntnyq.github.io/use-eslint-linter-js-code/)
