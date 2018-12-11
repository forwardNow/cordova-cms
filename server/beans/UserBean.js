const uuidv1 = require('uuid/v1');
const BaseBean = require('./BaseBean');

class UserBean extends BaseBean {
  constructor() {
    super();

    /** 用户ID */
    this.UserId = { type: String, required: true };

    /** 姓名 */
    this.UserTrueName = { type: String, default: '' };

    /** 昵称 */
    this.UserNickname = { type: String, default: '' };

    /** 头像 */
    this.UserHeadImage = { type: String, default: '' };

    /** 性别('1'-男；'2'-女) */
    this.Sex = { type: String, default: '' };

    /** 联系电话 */
    this.Phone = { type: String, default: '' };

    /** 人员类别 */
    this.PeopleCategory = { type: String, default: '' };

    /** 住址 */
    this.Address = { type: String, default: '' };

    /** 座机 */
    this.Landline = { type: String, default: '' };

    /** QQ号码 */
    this.QqNumber = { type: String, default: '' };

    /** 电子邮箱 */
    this.Email = { type: String, default: '' };

    /** 所属机构机构 */
    this.MedicalCode = { type: String, default: '' };

    /** 所属机构名称 */
    this.MedicalName = { type: String, default: '' };

    /** 单位编码 */
    this.UnitCode = { type: String, default: '' };

    /** 单位名称 */
    this.UnitName = { type: String, default: '' };

    /** 拥有的角色 */
    this.RoleIds = { type: Array, default: [] };
  }
}

module.exports = UserBean;
