const BaseDao = require('./BaseDao');
const DicBean = require('../beans/DicBean');

class DicDao extends BaseDao {
  constructor() {
    super('Dic', new DicBean());
  }
}

module.exports = new DicDao();
