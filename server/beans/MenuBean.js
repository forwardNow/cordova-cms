const BaseBean = require('./BaseBean');

class MenuBean extends BaseBean {
  constructor() {
    super();
    /** 主键ID */
    this.MenuId = { type: String, required: true };

    /** 菜单编码 */
    this.MenuNo = { type: String, default: '' };

    /** 菜单名称 */
    this.MenuName = { type: String, default: '' };

    /** 菜单父编码 */
    this.MenuParentNo = { type: String, default: '' };

    /** Url地址 */
    this.MenuUrl = { type: String, default: '' };

    /** 是否最后一级：(1-是；0-否) */
    this.IsLeaf = { type: Number, enum: [0, 1] };

    /** 是否自动展开：(1-打开；0-不打开；) */
    this.IsOpen = { type: Number, enum: [0, 1], default: 0 };

    /** 菜单级别 */
    this.MenuLevel = { type: Number };

    /** 节点图标 */
    this.MenuNodeIcon = { type: String, default: '' };

    /** 排序 */
    this.Sort = { type: Number, default: 1 };

    /** 子系统标识 */
    this.SystemsId = { type: String, default: '' };
  }
}

module.exports = MenuBean;
