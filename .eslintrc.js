const IS_DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  env: {
    'browser': true,
    'node': true,
  },
  globals: {
    "cordova": true
  },
  rules: {
    'no-console': IS_DEV_MODE ? 'warn' : 'error',
    'no-debugger': IS_DEV_MODE ? 'warn' : 'error',

    // 修复使用 webpack 路径别名引起的问题
    'import/no-unresolved': 'warn',
    'import/extensions': 'warn',
    //
  },

  parser: 'babel-eslint',

  parserOptions: {
    //parser: 'babel-eslint',
  },
};
