/**
 * @fileoverview 登陆认证服务
 */
import SessionAPI from '../apis/SessionAPI';
import http from '../plugins/CordovaHttp';
import Token from '../plugins/Token';

const SessionService = {};


/**
 * 登陆
 * @param {string} loginName
 * @param {string} password
 * @returns {Promise}
 */
SessionService.login = (loginName, password) => {
  const data = {
    ExternalIdentifier: loginName,
    ExternalCredential: password,
    ExternalIdentityType: '1',
  };
  return http.post(SessionAPI.LOGIN, data);
};

/**
 * 登出
 */
SessionService.logout = () => http.post(SessionAPI.LOGOUT, {});


/**
 * 判断是否已经登录
 * @returns {boolean}
 */
SessionService.isLogin = () => Token.isExist();

export default SessionService;
