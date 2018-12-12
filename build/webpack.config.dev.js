const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const CordovaBroswerWebpackPlugin = require('./plugins/CordovaBroswerWebpackPlugin');

const env = require('./env');

module.exports = merge(baseConfig, {
  /**
   *  1. 开启 watch，一旦源码变化就重新打包
   *  2. 输出到 “www” 目录后，执行 shell `$ cordova build browser`（通过 CordovaBroswerWebpackPlugin）
   */
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },

  // 配置插件
  plugins: [
    // 构建完成后，执行 shell 命令
    new CordovaBroswerWebpackPlugin({
      cmd: `cordova build ${JSON.parse(env.dev['process.env.platform'])}`,
    }),
  ],
});
