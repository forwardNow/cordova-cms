const BaseBean = require('./BaseBean');

class DicItemBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.ItemId = { type: String, required: true };

    /** 字典名称 */
    this.DicName = { type: String, required: true, default: '' };

    /** 编码 */
    this.ItemCode = { type: String, default: '' };

    /** 值 */
    this.ItemValue = { type: String, default: '' };

    /** 条目描述 */
    this.ItemDesc = { type: String, default: '' };
  }
}

module.exports = DicItemBean;
