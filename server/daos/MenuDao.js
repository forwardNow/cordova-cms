const BaseDao = require('./BaseDao');
const MenusBean = require('../beans/MenuBean');

class MenuDao extends BaseDao {
  constructor() {
    super('Menus', new MenusBean());
  }
}

module.exports = new MenuDao();
