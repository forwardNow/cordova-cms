const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

const CordovaBroswerWebpackPlugin = require('./plugins/CordovaBroswerWebpackPlugin');

const env = require('./env');

module.exports = merge(baseConfig, {
  // 配置插件
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),

    // 构建完成后，执行 shell 命令
    new CordovaBroswerWebpackPlugin({
      cmd: `cordova build ${JSON.parse(env.prod['process.env.platform'])}`,
    }),
  ],
});
