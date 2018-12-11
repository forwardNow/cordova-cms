class BaseBean {
  constructor() {
    /** 新增时间 */
    this.CreateTime = { type: Date };

    /** 新增人编号 */
    this.CreateUserId = { type: String, default: '' };

    /** 新增人姓名 */
    this.CreateUserName = { type: String, default: '' };

    /** 修改时间 */
    this.ModifiedTime = { type: Date };

    /** 修改人编号 */
    this.ModifiedUserId = { type: String, default: '' };

    /** 修改人姓名 */
    this.ModifiedUserName = { type: String, default: '' };

    /** 注销标记：（1-注销；0-未注销） */
    this.IsDeleted = { type: Number, default: 0 };

    /** 保留字段 */
    this.reserve = { type: String, default: '' };
  }
}

module.exports = BaseBean;
