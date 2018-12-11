const BaseDao = require('./BaseDao');
const RoleBean = require('../beans/RoleBean');

class RoleDao extends BaseDao {
  constructor() {
    super('Roles', new RoleBean());
  }
}

module.exports = new RoleDao();
