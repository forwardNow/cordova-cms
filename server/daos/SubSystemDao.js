const BaseDao = require('./BaseDao');
const SubSystemBean = require('../beans/SubSystemBean');

class SubSystemDao extends BaseDao {
  constructor() {
    super('SubSystems', new SubSystemBean());
  }
}

module.exports = new SubSystemDao();
