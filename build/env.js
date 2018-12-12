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

/**
 * 格式化
 * @param obj
 * @return {*}
 * @example { platform: "browser" } => { platform: '"browser"' }
 */
function fmt(obj) {
  Object.keys(obj).forEach((key) => {
    const val = obj[key];

    if (typeof val === 'object') {
      fmt(val);
    } else {
      obj[key] = JSON.stringify(val);
    }
  });
  return obj;
}

// console.log(fmt(env));

module.exports = fmt(env);
