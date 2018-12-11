const path = require('path');
const notifier = require('node-notifier');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const platform = JSON.stringify(process.env.platform);
const baseURL = JSON.stringify(process.env.baseURL);
const isWatch = Boolean(process.env.isWatch);



console.log(baseURL);

module.exports = {

  watch: isWatch,

  watchOptions: {
    ignored: /node_modules/,
  },

  // 入口。指定要打包文件的位置
  entry: path.join(__dirname, '../src/main.js'),

  // 出口。输出文件相关的配置
  output: {
    // 指定打包好的文件，输出的位置
    path: path.join(__dirname, '../www'),

    // 指定输出文件的名称
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  // 配置第三方模块加载器
  module: {

    /*
     * 文件的匹配规则和对应处理器
     * webpack 要处理的文件不是 JS 文件时，会在这里匹配相应的 loader 进行处理，
     * 处理的结果直接交给 webpack 进行打包合并，最终输出到 bundle.js
     */
    rules: [
      {
        // 匹配规则
        test: /\.css$/,

        /*
         * 匹配到了使用哪些 loader 来处理
         * loader 从右到左调用，以管道的方式
         */
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,

        /*
         * url-loader 依赖 file-loader
         * 默认转 base64，可通过设置 limit 参数，当小于该值时才转 base64
         */
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位 B
              limit: 3000,

              /*
               * 设置打包后的文件名称，默认为 hash 值名称
               * [hash:8] 取前 8 位 hash 值
               */
              name: '[name].[ext]',
            },
          },
        ],
      },
      // 处理字体文件
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位 KB
              limit: 1024 * 2,

              /*
               * 设置打包后的文件名称，默认为 hash 值名称
               * [hash:8] 取前 8 位 hash 值
               */
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  // 配置插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env.baseURL': baseURL,
      'process.env.platform': platform,
    }),

    new VueLoaderPlugin(),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation'],
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
        });
      },
    }),

    // 启动页
    new HtmlWebpackPlugin({
      // 指定模板页面：将此模板编译到内存中
      template: path.join(__dirname, '../src/index.html'),

      // 指定编译后的文件名称
      filename: 'index.html',
    }),
  ],
};
