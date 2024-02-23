# Npm的常用命令

## 一、镜像源链接切换
```npmignore
全局切换镜像源：npm config set registry http://registry.npm.taobao.org
查看镜像源使用状态：npm get registry
全局切换官方镜像源：npm config set registry http://www.npmjs.org
```
## 二、使用 nrm 切换镜像源
```npmignore
下载 nrm：npm install -g nrm
是否安装成功 nrm -V
查看可切换的镜像源： nrm ls (*表示正在使用的镜像源)
```
## 三，快速完全删除node_modules
```npmignore
npm install rimraf -g
rimraf node_modules

```
## 四、npm -v :版本查询
## 五、安装依赖
```npmignore
npm install 包名 --save-dev(npm install 包名 -D) ：安装的包只用于开发环境，不用于生产环境

npm install 包名 --save (npm install 包名 -S)：安装的包需要发布到生产环境的

```
## 其他指令
```npmignore
安装/卸载
全局安装/卸载
npm install ** -g
npm uninstall ** -g
npm un 同上，别名

npm update -g 更新全部包


npm list -g --depth 0 查看全局的包

查看所有全局安装的模块 npm ls -g
查看npm默认设置（部分） npm config ls
查看npm默认设置（全部） npm config ls -l


修改默认安装目录
npm config set prefix “D:\ProgramFiles\npm_global_modules\node_modules”


npm-check检查更新
npm install -g npm-check
npm-check

npm-upgrade更新
npm install -g npm-upgrade
npm-upgrade

更新生产环境依赖包：
npm update --save

更新开发环境依赖包：
npm update --save-dev

npm link [<@scope>/][@] 将npm包创建快捷方式到全局npm的路径下

npm outdated 查看当前安装的包里版本是否过期的信息

npm deprecate [@] 添加对某个包的某个版本的反对信息。只有owner才可以，安装此包能看到这些反对信息

npm pack 将当前npm包文件打成一个压缩包

npm prune 移除没有定义在package.json 依赖配置上的包


npm adduser 添加用户
npm login 登陆用户
npm logout 退出当前登陆的npm账号

npm unpublish [<@scope>/][@] 取消发布包, 将发布的包从远程仓库中删除
npm publish [|] [–tag ] [–access <public|restricted>] 发布一个包

查看当前npm包的依赖包列表
npm ls
npm list
npm la
npm ll


```
## git 秘钥
### 设置秘钥
```npmignore
ssh-keygen -t rsa -C '1963785622@qq.com' -f ~/.ssh/gub_id_rsa
```
### 查看路径
```npmignore
where git
```
### 查看公钥

```npmignore
cat gub_id_rsa.pub

```
### 新建config
```npmignore
touch config


#github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gub_id_rsa.pub
```
## yarn 的使用

### yarn 的版本
```npmignore
yarn --version
```
### yarn 的安装
```npmignore
npm install -g yarn

```
### 初始化一个新项目
```
yarn init

```

### 添加依赖
```npmignore
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]-（比如beta,next或者latest）

```

### 安装依赖的位置
```npmignore
yarn add [package] --dev  devDependencies
yarn add [package] --peer  peerDependencies
yarn add [package] --optional optionalDependencies
```
### 升级依赖

```npmignore
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

```
### 安装包

### 移除依赖包
```npmignore
yarn remove [package]
```
```npmignore
安装包：
yarn install //安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
yarn install --flat //安装一个包的单一版本
yarn install --force //强制重新下载所有包
yarn install --production //只安装dependencies里的包
yarn install --no-lockfile //不读取或生成yarn.lock
yarn install --pure-lockfile //不生成yarn.lock

```
