# Cordova 混合应用

## 1. 介绍

基于 Cordova 的 Vue 2.x 应用。

## 2. 参考

* [Cordova 官网](https://cordova.apache.org)
* [Webpack 插件](https://webpack.js.org/plugins/)
* [Cordova http 插件](https://www.npmjs.com/package/cordova-plugin-advanced-http)

## 3. 目录

```text
${root}/
  build/      # 构架配置：webpack 相关
  platforms/  # Cordova “dist” 目录
  server/     # nodejs 服务（测试服务器）
  src/        # Vue 源码
  www/        # Vue “dist” 目录
  package.json
  package-lock.json
  README.md
```

## 4. 准备

安装 cordova-cli ：

```shell
# 全局安装
$ npm install -g cordova

# 测试是否安装成功
$ cordova -v
8.1.2 (cordova-lib@8.1.1)
```

安装项目依赖：

```shell
npm install
```

## 5. npm run-script

查看 `${root}/package.json` ：

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=dev webpack --progress --config ./build/webpack.config.dev.js",
    "build": "cross-env NODE_ENV=prod webpack --progress --config ./build/webpack.config.prod.js",
    "serve": "cd server && node app.js",
    "build:android": "cordova build android",
    "build:browser": "cordova build browser",
    "emulator:android": "cordova run android --emulator"
  }
}
```

主要有三个 npm 脚本：

* `npm run dev`: 用于开发环境。会独占一个进程，需要单独开启终端执行。
* `npm run build`: 用于生产环境。
* `npm run serve`: 用于开发环境。会独占一个进程，需要单独开启终端执行。

>关于 shell 中的 `cross-env NODE_ENV=dev`：由于 Windows、Linux/OSX 中设置临时环境变量的语法不同，因此使用 [cross-env](https://www.npmjs.com/package/cross-env) 解决跨平台设置临时环境变量的问题。

### 5.1. `npm run dev`

此脚本用于开发环境。流程如下：

1. 源码（`${root}/src`）被更改
2. 使用 `${root}/build/webpack.config.dev.js` 配置进行编译，打包到 `${root}/www/`
3. webpack 编译完毕，会执行 `done` 钩子函数
4. 执行 `${root}/build/plugins/CordovaBroswerWebpackPlugin.js` 注册的 `done` 钩子函数：开启子进程执行 `$ cordova build browser`，构建到浏览器平台。

### 5.2. `npm run build`

使用 `${root}/build/webpack.config.dev.js` 配置进行编译，执行 `$ cordova build android`，构建到安卓平台。

### 5.3. `npm run serve`

此 npm 脚本对应的 shell 为：

```shell
# 切换到 ${root}/server 目录
$ cd server

# 启动 node.js 应用
$ node app.js
```

## 6. 环境变量

此项目涉及到两个级别的环境变量：

* node.js 环境变量
* 应用程序环境变量

### 6.1. node.js 环境变量

webapck-cli 是基于 node.js 开发的，也就是说 `webpack.config.js` 的执行环境是 node.js，`webpack.config.js` 是可以通过 `process.env` 访问到操作系统的环境变量的。如下：

```shell
# 设置环境变量（临时）NODE_ENV
$ NODE_ENV=123

# 打印环境变量 NODE_ENV
$ echo $NODE_ENV
123

$ webpack
```

```js
// webpack.config.js

console.log(process.env.NODE_ENV); // "123"

// ......
```

### 6.2. 应用程序环境变量

应用程序里需要一些全局变量，比如 `baseURL`：

* 在开发环境 `baseURL=http://localhost:8000`
* 在生产环境 `baseURL=https://www.fn1.top`

`baseURL` 根据构建环境的不同而不同，只能在 webpack 里定义：

```javascript
// webpack.config.js
module.exports = {
  // ...

  plugins: [
    new webpack.DefinePlugin({
      'process.env.baseURL': JSON.stringify('http://localhost:8000'),
    }),
  ]
}
```

>为什么要使用 `JSON.stringify()`？因为，webpack 在编译过程中对于字符串变量不会自动添加字符串界定符，跟后端模板渲染的字符串解析替换差不多。

在源码里，可以这样使用：

```javascript
// src/main.js

console.log(process.env.baseURL);
```

此项目中的环境变量在 [${root}/build/env.js](./build/env.js) 中定义：

```javascript
const internalIp = require('internal-ip');
const { PORT } = require('../server/configs/Var');

const env = {
  dev: {
    'process.env.baseURL': `http://${internalIp.v4.sync()}:${PORT}`,
    'process.env.platform': 'browser',
  },
  prod: {
    'process.env.baseURL': `http://${internalIp.v4.sync()}:${PORT}`,
    'process.env.platform': 'android',
  },
};

// ...
```