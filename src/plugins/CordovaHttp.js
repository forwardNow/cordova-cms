import merge from 'lodash.merge';
import { pretty } from 'js-object-pretty-print';
import { Indicator, MessageBox } from 'mint-ui';

import router from '../router';
import Token from './Token';

const DEFAULTS = {
  baseURL: process.env.baseURL,
  url: '',
  method: 'post',
  data: {},
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },

  /**
   * 'urlencoded': application/x-www-form-urlencoded
   * 'json': application/json
   * 'utf8': plain/text
   */
  serializer: 'json',

  /**
   * 请求超时时间，单位毫秒
   */
  timeout: null,
};

function handleStatus(res) {
  let desc;
  const { url, data } = res;
  let status = JSON.parse(data).errorCode;

  if (data) {
    status = JSON.parse(data).errorCode;
  } else {
    // throw new Error('消息体为空！');
    status = '???';
  }


  switch (status) {
    case 0:
    case 200: {
      return;
    }
    case 401: {
      desc = '登陆失效，请重新登陆！';

      setTimeout(() => {
        router.push({
          name: 'login',
          query: { status: 401 },
        });
      }, 2000);
      break;
    }
    case 403: {
      desc = '没有访问权限！';
      break;
    }
    case 404: {
      desc = '资源不存在！';
      break;
    }
    case 500: {
      desc = '服务器内部错误！';
      break;
    }
    default: {
      desc = '未知错误!';
      // break;
      return;
    }
  }

  const msg = `【${status}】${url} ${desc}`;

  console.log(msg);

  MessageBox('异常', msg);
}


class CordovaHttp {
  constructor(options = {}) {
    this.options = merge({}, DEFAULTS, options);
  }

  static interceptors = {
    request(options) {
      const { baseURL, url } = options;
      const opts = merge({}, options);

      // 显示 loading
      Indicator.open({
        spinnerType: 'fading-circle',
      });

      opts.url = baseURL + url;
      opts.headers.token = Token.get() || '';

      console.log(pretty(opts));

      return opts;
    },
    response(res) {
      Indicator.close();

      Token.set(res.headers.token);

      handleStatus(res);

      console.log(pretty(res));
      return res;
    },
  };

  request(url, options) {
    let opts = merge({}, this.options, { url }, options);

    opts = CordovaHttp.interceptors.request(opts);

    return new Promise((resolve, reject) => {
      const success = (response) => {
        const res = CordovaHttp.interceptors.response(response);

        resolve(JSON.parse(res.data));
      };
      const failure = (response) => {
        const res = CordovaHttp.interceptors.response(response);

        reject(new Error(pretty(res)));
      };
      cordova.plugin.http.sendRequest(opts.url, opts, success, failure);
    });
  }

  /**
   * POST 请求
   * @param url {String}
   * @param data {Object} 请求数据 json
   * @param headers {Object?}
   */
  post(url, data, headers) {
    return this.request(url, { data, headers });
  }
}

// cordova.plugin.http.setDataSerializer('json');

module.exports = new CordovaHttp();
