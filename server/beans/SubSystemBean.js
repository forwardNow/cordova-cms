const BaseBean = require('./BaseBean');

class SubSystemBean extends BaseBean {
  constructor() {
    super();

    /** 主键ID */
    this.SystemId = { type: String, required: true };

    /** 系统名称 */
    this.SystemName = { type: String, default: '' };

    /** 系统编号 */
    this.SystemIdenty = { type: String, default: '' };

    /** 系统描述 */
    this.SystemDesc = { type: String, default: '' };

    /** 系统级别 */
    this.SystemLevel = { type: String, default: '' };

    /** 系统所属行政区划 */
    this.UnitCode = { type: String, default: '' };
  }
}

module.exports = SubSystemBean;
