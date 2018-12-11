const SubSystemDao = require('../daos/SubSystemDao');
const BaseController = require('./BaseController');

class SubSystemController extends BaseController {
  constructor(router) {
    super('subsys', 'SystemId', router, SubSystemDao);
    this.registerBaseRoutes();
  }
}

module.exports = SubSystemController;