const BaseBean = require('./BaseBean');

class ExternalPartyUserBean extends BaseBean {
  constructor() {
    super();

    /** 主键ID */
    this.ExternalPartyId = { type: String, required: true };

    /** 用户ID */
    this.UserId = { type: String, default: '' };

    /** 登录类型： '1' - 基础支撑平台 */
    this.ExternalIdentityType = { type: String, default: '1' };

    /** 标识 */
    this.ExternalIdentifier = { type: String, default: '' };

    /** 密码凭证 */
    this.ExternalCredential = { type: String, default: '' };

    /** 是否允许登陆 */
    this.IsAllowLogin = { type: Number, default: 1 };
  }
}

module.exports = ExternalPartyUserBean;
