const RoleDao = require('../daos/RoleDao');
const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor(router) {
    super('role', 'RoleId', router, RoleDao);
    this.registerBaseRoutes();
  }
}

module.exports = RoleController;
