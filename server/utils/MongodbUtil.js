const mongoose = require('mongoose');

const { dbLogger } = require('../utils/LogUtil');
const { URI, OPTIONS } = require('../configs/MongodbConfig');

const MongodbUtil = {};
let mongodbClient = null;

/**
 * 获取客户端
 * @return {*}
 */
MongodbUtil.getClient = () => {
  if (mongodbClient !== null) {
    return mongodbClient;
  }

  mongodbClient = mongoose.createConnection(URI, OPTIONS);


  /*
   * 连接成功回调
   */
  mongodbClient.on('connected', () => {
    dbLogger.debug(`connected to ${URI}`);
  });

  /*
   * 连接失败回调
   */
  mongodbClient.on('error', (err) => {
    dbLogger.debug(`connection error:  ${err}`);
    throw err;
  });

  /*
   * 关闭连接回调
   */
  mongodbClient.on('disconnected', () => {
    dbLogger.debug('disconnected');
  });

  return mongodbClient;
};

/**
 * 断开连接
 */
MongodbUtil.close = () => {
  mongodbClient.close();
  mongodbClient = null;
};

module.exports = MongodbUtil;
