/**
 * @fileoverview 登陆认证服务
 */
import SessionAPI from '../apis/SessionAPI';
import http from '../plugins/CordovaHttp';

const SessionService = {};
const USER_INFO = 'userInfo';

let TOKEN = null;

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
SessionService.logout = () => http.post(SessionAPI.LOGOUT);

/**
 * 保存认证成功的凭证
 * @param {object} user
 * @returns {void}
 */
SessionService.store = (user) => {
  sessionStorage.setItem(USER_INFO, JSON.stringify(user));
};

/**
 * 删除认证成功的凭证
 */
SessionService.remove = () => {
  sessionStorage.removeItem(USER_INFO);
};


/**
 * 判断是否已经登录
 * @returns {boolean}
 */
SessionService.isLogin = () => sessionStorage.getItem(USER_INFO) !== null;

/**
 * 获取登陆后保存的用户对象
 * @returns {object} 用户对象
 */
SessionService.getUserInfo = () => JSON.parse(sessionStorage.getItem(USER_INFO));

/**
 * 设置 token
 * @param token {string}
 */
SessionService.setToken = (token) => {
  if (!token) {
    return;
  }

  if (!TOKEN) {
    TOKEN = localStorage.getItem('TOKEN');
  }

  if (token !== TOKEN) {
    TOKEN = token;
  }

  localStorage.setItem('TOKEN', TOKEN);
};

/**
 * 获取 token
 * @returns {string}
 */
SessionService.getToken = () => {
  if (TOKEN) {
    return TOKEN;
  }
  return localStorage.getItem('TOKEN');
};

export default SessionService;
