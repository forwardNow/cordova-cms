const uuidv1 = require('uuid/v1');

const { logger, routeLogger } = require('../utils/LogUtil');

const { PREFIX } = require('../configs/Var');

class BaseController {
  constructor(path, pkName, router, Dao) {
    this.path = path;
    this.pkName = pkName;
    this.router = router;
    this.Dao = Dao;
  }

  /**
   * 设置的路由将优先 baseRoute
   */
  registerBaseRoutes() {
    this.registerListRoute();
    this.registerGetRoute();
    this.registerDeleteRoute();
    this.registerInsertRoute();
    this.registerUpdateRoute();
  }

  /**
   * 模糊查询，获取分页
   * condition 中的所有属性将作为模糊查询的条件
   */
  registerListRoute() {
    const {
      path, router, Dao,
    } = this;

    const pattern = `${PREFIX}/${path}/list`;

    routeLogger.info(`register: ${pattern}`);

    router.post(pattern, async (req, res) => {
      const {
        body: {
          condition,
          pager: {
            pageSize,
            currentPage,
          },
        },
      } = req;

      const newCondition = {};

      Object.keys(condition).forEach((key) => {
        newCondition[key] = new RegExp(condition[key], 'i');
      });

      const result = {
        items: null,
        pager: { pageSize, currentPage },
      };

      await Dao.getListByConditionAndPager(newCondition, result.pager)
        .then((list) => {
          result.items = list;
        });

      await Dao.getCountByCondition(newCondition)
        .then((count) => {
          result.pager.total = count;
        });

      res.status(200).json({
        errorCode: 0,
        reason: 'OK',
        result,
      });
    });
  }

  /**
   * 根据 PK 获取记录
   */
  registerGetRoute() {
    const {
      path, pkName, router, Dao,
    } = this;

    const pattern = `${PREFIX}/${path}/get`;

    routeLogger.info(`register: ${pattern}`);

    router.post(pattern, (req, res) => {
      const { body: bean } = req;

      if (!bean[pkName]) {
        throw new Error(`[${pattern}] requires PK: ${pkName}`);
      }

      Dao.getByCondition({ [pkName]: bean[pkName] }).then((data) => {
        // 找到了
        if (data) {
          return res.status(200).json({
            errorCode: 0,
            reason: 'OK',
            result: data,
          });
        }
        return res.status(200).json({
          errorCode: 1,
          reason: 'not exists',
        });
      });
    });
  }

  /**
   * 插入
   */
  registerInsertRoute() {
    const {
      pkName, path, router, Dao,
    } = this;

    const pattern = `${PREFIX}/${path}/insert`;

    routeLogger.info(`register: ${pattern}`);

    router.post(pattern, (req, res) => {
      const { body: bean, currentUser } = req;

      // 无 PK，则赋值
      if (!bean[pkName]) {
        bean[pkName] = uuidv1();
      }

      bean.CreateTime = Date.now();
      bean.CreateUserId = currentUser.UserId;
      bean.CreateUserName = currentUser.UserTrueName;

      Dao.insert(bean)
        .then(() => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        }))
        .catch((e) => {
          logger.error(e);
          res.status(200).json({
            errorCode: 1,
            reason: '添加失败',
          });
        });
    });
  }

  /**
   * 更新
   */
  registerUpdateRoute() {
    const {
      path, pkName, router, Dao,
    } = this;

    const pattern = `${PREFIX}/${path}/update`;

    routeLogger.info(`register: ${pattern}`);

    router.post(pattern, (req, res) => {
      const { body: bean, currentUser } = req;

      if (!bean[pkName]) {
        throw new Error(`[${pattern}] requires PK: ${pkName}`);
      }

      bean.ModifiedTime = Date.now();
      bean.ModifiedUserId = currentUser.UserId;
      bean.ModifiedUserName = currentUser.UserTrueName;

      Dao.updateSelectiveByCondition({ [pkName]: bean[pkName] }, bean)
        .then(() => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        }))
        .catch(() => res.status(200).json({
          errorCode: 1,
          reason: '更新失败',
        }));
    });
  }

  /**
   * 删除
   */
  registerDeleteRoute() {
    const {
      path, pkName, router, Dao,
    } = this;

    const pattern = `${PREFIX}/${path}/delete`;

    routeLogger.info(`register: ${pattern}`);

    router.post(pattern, (req, res) => {
      const { body: bean } = req;

      if (!bean[pkName]) {
        throw new Error(`[${pattern}] requires PK: ${pkName}`);
      }

      Dao.deleteByCondition(bean)
        .then(() => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        }))
        .catch(() => res.status(200).json({
          errorCode: 1,
          reason: '删除失败',
        }));
    });
  }
}

module.exports = BaseController;
