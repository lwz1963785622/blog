# React项目目录结构

## 基本目录结构
```
/
 ├── dist/                          # 构建后自动生成
 │
 ├── src/                           # 项目开发目录
 │      ├── components/             # 组件
 │      ├── pages/                  # 页面
 │      └── main.js                 # 项目入口
 │
 ├── config/                        # 工程配置
 │      │
 │      ├── webpack.development.config.js # webpack开发环境配置文件
 │      │
 │      └── webpack.production.config.js  # webpack生产环境配置文件
 │
 ├── test/                          # 测试代码
 │
 ├── docs/                          # 项目文档
 │
 ├── static/                        # 库文件等，不会被webpack的loader处理,手动管理
 │      │
 │      ├── favicon.ico             # 站标
 │      │
 │      └── index.html              # 项目入口
 │
 ├── node_modules/                  # 自动生成 包含生产依赖及开发依赖
 │
 ├── package.json                   # 项目配置文件
 │
 └── README.md                      # 项目说明
```
### package.json
任何一个项目都需要该配置文件，基本我们所有的依赖库都保存在该文件中，对于该文件的参数主要有：

| 参数            | 作用     |
| :------------- | :------------- |
| dependencies    | 开发环境依赖库  |
| devDependencies |  开发环境依赖库 |
| scripts         | 执行脚本，比如通过启动开发环境，启动构建，项目测试等。 |
| private         | true ，确保我们安装包是私有的(private)，并且移除 main 入口，防止意外发布你的代码。 |

### 项目开发目录结构
```

 /
  ├── dist/                          # 构建后自动生成
  │
  ├── src/                           # 项目开发目录
  │      │
  │      ├── actions/                # action目录 (Redux)
  │      │
  │      ├── canstants/              # 公共常量目录 (Redux)
  │      │
  │      ├── reducers/               # reducer目录 (Redux)
  │      │
  │      ├── components/             # 展示组件 通用部分作为组件
  │      │      ├── Header/
  │      │      ├── Footer/
  │      │      └── index.js         # 组件集合
  │      │
  │      ├── pages/                  # 容器组件 存放容器列表
  │      │      ├── Home/
  │      │      ├── About/
  │      │      └── index.js         # 页面集合
  │      │
  │      ├── router/                 # 路由目录 (route)
  │      │
  │      ├── static/                 # 公共静态资源目录 (css、font、images)
  │      │
  │      ├── util/                   # 工具目录 (localStorage)
  │      │
  │      └── index.jsx               # 整个程序的入口文件
  │
  ├── config/                        # 工程配置
  │      │
  │      ├── webpack.development.config.js # webpack开发环境配置文件
  │      │
  │      └── webpack.production.config.js  # webpack生产环境配置文件
  │
  ├── test/                          # 测试代码
  │
  ├── docs/                          # 项目文档
  │
  ├── static/                        # 库文件等，不会被webpack的loader处理,手动管理
  │      │
  │      ├── favicon.ico             # 站标
  │      │
  │      └── index.html              # 项目入口
  │
  ├── node_modules/                  # 自动生成 包含生产依赖及开发依赖
  │
  ├── package.json                   # 项目配置文件
  │
  └── README.md                      # 项目说明
```
### 代码分离
```
├── src/                         # 项目开发文件目录
│      │
│      ├── components/           # 展示组件 通用部分作为组件
│      │
│      ├── pages/                # 容器组件 存放容器列表
│      │
│      └── index.jsx             # 整个程序的入口文件
```

### 代码分层
#### pages
```
├── src/                         # 项目开发文件目录
│      │
│      ├── components/           # 展示组件 通用部分作为组件
│      │
│      ├── pages/                # 容器组件(页面组件) 存放页面列表
│      │      ├── index/         # 首页
│      │      ├── list/          # 列表
│      │      ├── category/      # 栏目页
│      │      ├── login/         # 登录页
│      │      ├── register/      # 注册页
│      │      ├── search/        # 搜索页
│      │      └── index.js       # 页面集合
│      │
│      └── index.jsx             # 整个程序的入口文件
```
#### page
```
├── src/                         # 项目开发文件目录
│      │
│      ├── components/           # 展示组件 通用部分作为组件
│      │
│      ├── pages/                # 容器组件 存放容器列表
│      │      ├── index/         # 首页
│      │      │      ├── index.jsx  # 页面入口
│      │      │      ├── list.jsx
│      │      │      ├── banner.jsx
│      │      │      ├── comment.jsx
│      │      │      ├── index.less
│      │      │      ├── index.css
│      │      │      └── images/
│      │      ├── list/          # 列表
│      │      ├── category/      # 栏目页
│      │      ├── login/         # 登录页
│      │      ├── register/      # 注册页
│      │      ├── search/        # 搜索页
│      │      └── index.js       # 页面集合
│      │
│      ├── index.jsx             # 整个程序的入口文件
│      │

```
#### components
```
├── src/                         # 项目开发文件目录
│      │
│      ├── components/           # 展示组件 通用部分作为组件
│      │      │
│      │      ├── Header/        # 头部
│      │      │      ├── index.jsx     # 组件
│      │      │      ├── header.less   
│      │      │      ├── header.css
│      │      │      └── images/
│      │      ├── NavBar/
│      │      │
│      │      ├── SearchBar/
│      │      │
│      │      └── index.js       # 组件集合
│      │
│      ├── pages/                # 容器组件 存放容器列表
│      │
│      └── index.jsx             # 整个程序的入口文件
```
