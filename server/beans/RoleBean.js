const BaseBean = require('./BaseBean');

class RoleBean extends BaseBean {
  constructor() {
    super();

    /** 角色ID */
    this.RoleId = { type: String, required: true };

    /** 角色名称 */
    this.RoleName = { type: String, default: '' };

    /** 角色类别 */
    this.RoleCategory = { type: Number, default: '' };

    /** 角色状态：（1-启用；0-未启用） */
    this.RoleState = { type: Number, default: 1 };

    /** 排序 */
    this.Sort = { type: Number, default: 1 };

    /** 角色描述 */
    this.RoleDes = { type: String, default: '' };

    /** 子系统权限，一个角色只能归属于一个子系统 */
    this.SystemId = { type: String, default: '' };

    /** 菜单权限 */
    this.MenuIds = { type: Array, default: [] };
  }
}

module.exports = RoleBean;
