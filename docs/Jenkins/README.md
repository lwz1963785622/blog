# Jenkins
![docker](/img/Jenkins/jenkins.png)

> Jenkins是一款开源 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。
Jenkins 支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。

## Jenkins 主要作用
- l 持续、自动地构建/测试软件项目。
- l 监控一些定时执行的任务。

## Jenkins 安装

### 机器要求：
- 256 MB 内存，建议大于 512 MB
- 10 GB 的硬盘空间（用于 Jenkins 和 Docker 镜像）

### 需要安装以下软件：
- Java 8 ( JRE 或者 JDK 都可以)
- Docker [dockerhub](https://hub.docker.com/r/jenkins/jenkins)
### 基于docker 安装并启动
::: tip docker命令
[jenkins/jenkins:lts](https://hub.docker.com/r/jenkins/jenkins) 这个版本是长期维护的。

安装docker后直接运行此命令即可，没有安装镜像会自动安装并启动。

卷挂载的`/home/datajenkins` 可自定义

Jenkins的配置目录默认在 `/var/jenkins_home`

暴露Jenkins默认8080端口给宿主机

:::
```   {2}

docker run -id --name jenkins -p 8080:8080 -v /home/data/jenkins:/var/jenkins_home jenkins/jenkins:lts

```
> 如果发现jenkins 镜像未启动，但是以存在。可能是文件权限的问题 `chown -R 1000 /home/data/jenkins `

## Jenkins 配置

![docker](/img/Jenkins/docker.png)
![dockerps](/img/Jenkins/dockerps.png)


::: tip 

此时 docker 的 Jenkins 的镜像已经启动。

可以访问 一下8080端口测试一下。

:::
> 使用`docker logs Jenkins` 或  进入Jenkins 镜像的目录中 查看下图路径。 `cat /var/lib/jenkins/secrets/initialAdminPassword`

![dockerps](/img/Jenkins/jenkinsstart.png)

![dockerps](/img/Jenkins/jenkinskey.png)
## 安装插件 并 创建用户

::: tip 

启动后安装插件`建议安装推荐`

:::
![jenkinscj](/img/Jenkins/jenkinscj.png)

> 这里由于网络的原因，可能会出现部分失败。点击重试就好了。或者构建成功后可自行安装。

![jenkinsset](/img/Jenkins/jenkinsset.png)

> 插件安装后会跳到创建用户名，密码 邮箱等信息。

## 配置  nodejs ssh gitee 插件。
- nodejs 为了我们构建前端项目。
- ssh 方便打包后连接服务器进行一些操作。
- gitee 插件方便使用webhooks 触发自动化部署。（这里我的代码存放在gitee，可自行安装其他插件）
### nodejs安装
> 进入系统管理->插件管理->选择`可选插件`-> 搜索nodejs 直接安装即可。

![jenkinsaz1](/img/Jenkins/jenkinsaz1.png)
![jenkinsaz2](/img/Jenkins/jenkinsaz2.png)
![jenkinsaz3](/img/Jenkins/jenkinsaz3.png)

### 配置nodejs
> 进入系统管理->全局工具配置->选择`可选插件`-> 搜索nodejs 直接安装即可。

![jenkinsaz1](/img/Jenkins/jenkinsaz1.png)
![jenkinsaz2](/img/Jenkins/jenkinsglo.png)
![jenkinsnode](/img/Jenkins/jenkinsnode.png)
::: tip 

node 的版本建议安装[官网](https://nodejs.org/zh-cn/)的长期支持版本，避免出现其他意料之外的问题

:::

### ssh安装
> 进入系统管理->插件管理->选择`可选插件`-> 搜索Publish Over SSH直接安装即可。

![jenkinsssh](/img/Jenkins/jenkinsssh.png)

::: tip 

安装和node一样，上图为已安装后的示例。

:::
### ssh配置
> 进入系统管理->系统配置->选择`Publish over SSH`-> 填写自己服务器的主机名 ip 等信息。-> 保存信息
![jenkinsxt](/img/Jenkins/jenkinsxt.png)

![jenkinsserve](/img/Jenkins/jenkinsserve.png)

### gitee安装
> 安装过程同上。

### gitee配置密钥
> 进入系统管理->系统配置->选择`gitee`-> 填写自己gitee密钥。-> 保存信息
- 参考[https://gitee.com/help/articles/4193#article-header0](https://gitee.com/help/articles/4193#article-header0)

- 获取[gitee密钥](https://gitee.com/profile/personal_access_tokens)
 - 在 Connection name 中输入 Gitee 或者你想要的名字
 - Gitee host URL 中输入 Gitee 完整 URL地址： https://gitee.com （Gitee 私有化客户输入部署的域名）
 -  Credentials 中如还未配置 Gitee APIV5 私人令牌，点击 Add - > Jenkins
 -  Domain 选择 Global credentials
 -  Kind 选择 Gitee API Token
 -  Scope 选择你需要的范围
 -  Gitee API Token 输入你的 Gitee 私人令牌，获取地址：https://gitee.com/profile/personal_access_tokens
 -  ID, Descripiton 中输入你想要的 ID 和描述即可。
 -  Credentials 选择配置好的 Gitee APIV5 Token
 - 点击 Advanced ，可配置是否忽略 SSL 错误（视您的Jenkins环境是否支持），并可设置链接测超时时间（视您的网络环境而定）
 - 点击 Test Connection 测试链接是否成功，如失败请检查以上 3，5，6 步骤。


::: tip 

使用gitee 是为了配合webhooks 使用，如果你打算手动构建项目或者定时发布项目，个人感觉可以不配置gitee

:::

## 新建任务
> 点击主界面左侧的 新建任务，选择 构建一个自由风格的软件项目，填写任务名字。
::: tip 

创建工程后会直接进入配置页面，按照自己的需求配置（如下图） 基本选项就可以成功构建项目了。

:::

![pz1](/img/Jenkins/pz1.png)

![pz2](/img/Jenkins/pz2.png)

![pz3](/img/Jenkins/pz3.png)
::: tip 

上图的配置中gitee webhook 的连接地址要放入gittee 的配置中。如下图

Gitee WebHook 密码可不填 也可自动生成或自定义  复制到下图的WebHook 密码中即可。

:::
![pz4](/img/Jenkins/pz4.png)

![pz5](/img/Jenkins/pz5.png)
::: tip 

上图我们把已经配置好的node 环境版本选上，并执行shell脚本。

:::

![pz6](/img/Jenkins/pz6.png)

::: tip 

最后直接保存构建 或者 gitee push 代码测试一下。

:::


![success](/img/Jenkins/success.png)
