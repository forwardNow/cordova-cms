const ExternalPartyUserDao = require('../daos/ExternalPartyUsersDao');
const BaseController = require('./BaseController');

class ExternalPartyUserController extends BaseController {
  constructor(router) {
    super('externalPartyUser', 'ExternalPartyUserId', router, ExternalPartyUserDao);
    this.registerBaseRoutes();
  }
}

module.exports = ExternalPartyUserController;
