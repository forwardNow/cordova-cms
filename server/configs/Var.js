module.exports = {
  /** Json Web Token 加密盐值 */
  JWT_SECRET: 'salt',

  /** API 前缀 */
  PREFIX: '/api',

  /** 服务端口号 */
  PORT: 8000,

  /** 默认用户，初始用 */
  DEFAULT_USER: {
    LOGIN_NAME: 'admin',
    LOGIN_PASSWORD: '123456',
  },
};
