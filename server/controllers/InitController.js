const uuidv1 = require('uuid/v1');
const { PREFIX, DEFAULT_USER: { LOGIN_NAME, LOGIN_PASSWORD } } = require('../configs/Var');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const UsersDao = require('../daos/UserDao');

const { logger } = require('../utils/LogUtil');

class InitController {
  constructor(router) {
    router.get(`${PREFIX}/init`, (req, res) => {
      InitController.initUser().then((isExist) => {
        if (isExist === true) {
          return res.status(200).send(`${LOGIN_NAME}/${LOGIN_PASSWORD} 已存在！`);
        }
        return res.status(200).send(`${LOGIN_NAME}/${LOGIN_PASSWORD} 创建成功！`);
      });
    });

    InitController.initUser().then();
  }

  static async initUser() {
    const externalPartyId = uuidv1();
    const userId = uuidv1();
    let isExist = false;

    await ExternalPartyUsersDao.getByCondition({
      ExternalIdentifier: LOGIN_NAME,
      ExternalCredential: LOGIN_PASSWORD,
    }).then((data) => {
      isExist = data;
    });

    if (isExist) {
      logger.info(`${LOGIN_NAME}/${LOGIN_PASSWORD} 已存在！`);
      return true;
    }

    await ExternalPartyUsersDao.insert({
      ExternalPartyId: externalPartyId,
      UserId: userId,
      ExternalIdentifier: LOGIN_NAME,
      ExternalCredential: LOGIN_PASSWORD,
      ExternalIdentityType: '1',
    });

    await UsersDao.insert({
      UserId: userId,
      UserTrueName: '超级管理员',
      UserNickname: '吴钦飞',
    });

    logger.info(`${LOGIN_NAME}/${LOGIN_PASSWORD} 创建成功！`);
    return false;
  }
}


module.exports = InitController;
