const jwt = require('jsonwebtoken');
const ExternalPartyUserDao = require('../daos/ExternalPartyUsersDao');
const UserDao = require('../daos/UserDao');
const { routeLogger } = require('../utils/LogUtil');
// 签名
const { JWT_SECRET, PREFIX } = require('../configs/Var');

class SessionController {
  constructor(router) {
    this.router = router;
    this.registerRoute();
  }

  registerRoute() {
    this.login();
    this.logout();
  }

  login() {
    const { router } = this;

    routeLogger.info(`register: ${PREFIX}/session/login`);

    router.post(`${PREFIX}/session/login`, async (req, res, next) => {
      try {
        const {
          body: {
            ExternalIdentifier,
            ExternalCredential,
            ExternalIdentityType,
          },
        } = req;
        let externalPartyUser = null;

        if (!ExternalIdentityType) {
          return res.status(200).json({
            errorCode: 100102,
            reason: 'ExternalIdentityType is required.',
          });
        }

        await ExternalPartyUserDao
          .getByCondition({
            ExternalIdentifier,
            ExternalCredential,
          })
          .then((result) => {
            externalPartyUser = result;
          });

        // 不存在
        if (!externalPartyUser) {
          return res.status(200).json({
            errorCode: 100101,
            reason: 'ExternalIdentifier or ExternalCredential is invalid.',
          });
        }

        let user = null;

        await UserDao.getByCondition({ UserId: externalPartyUser.UserId })
          .then((result) => {
            user = result;
          });

        // 不存在
        if (!user) {
          return res.status(200).json({
            errorCode: 1,
            reason: '用户不存在',
          });
        }

        const token = jwt.sign(
          {
            userId: user.UserId,
          },
          JWT_SECRET,
          {
            expiresIn: 60 * 60, // 秒到期时间
          },
        );

        res.setHeader('token', token);

        const {
          UserTrueName,
          UserNickname,
          UserHeadImage,
          Sex,
          Phone,
          PeopleCategory,
          Address,
          Landline,
          QqNumber,
          Email,
          MedicalName,
          UnitName,
        } = user;

        return res.status(200).json({
          errorCode: 0,
          reason: 'OK',
          result: {
            ExternalIdentifier,
            ExternalIdentityType,
            UserTrueName,
            UserNickname,
            UserHeadImage,
            Sex,
            Phone,
            PeopleCategory,
            Address,
            Landline,
            QqNumber,
            Email,
            MedicalName,
            UnitName,
          },
        });
      } catch (e) {
        return next(e);
      }
    });
  }

  logout() {
    const { router } = this;

    routeLogger.info(`register: ${PREFIX}/session/logout`);

    // 登出
    router.post(`${PREFIX}/session/logout`, (req, res) => {
      // registerDeleteRoute req.session.user;

      res.setHeader('token', 'none');

      return res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  }
}

module.exports = SessionController;
