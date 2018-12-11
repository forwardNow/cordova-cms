const DicDao = require('../daos/DicDao');
const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor(router) {
    super('dic', 'DicId', router, DicDao);
    this.registerBaseRoutes();
  }
}

module.exports = RoleController;
