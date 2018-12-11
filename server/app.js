const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

// const routes = require('./routes/index.js');
const router = require('./router');

const UsersDao = require('./daos/UserDao');

const app = express();

// 签名
const { JWT_SECRET, PREFIX, PORT } = require('./configs/Var');

const { logger } = require('./utils/LogUtil');

// 静态服务
app.use('/www/', express.static('../platforms/browser/www/'));

// 模板引擎
app.engine('html', require('express-art-template'));

app.set('views', './');

// 配置解析请求体插件（注意：一定要在挂载路由之前）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('README.html');
});

/*
 * 接口服务：以 '/api' 打头的 url 都需要认证
 * expressJwt 将解码后的对象挂载到 req.user
 */
app.use(
  PREFIX,
  expressJwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.token) {
        return req.headers.token;
      }

      if (req.query && req.query.token) {
        return req.query.token;
      }

      return null;
    },
  }).unless({
    // 除了这些地址，其他的URL都需要验证
    path: [
      `${PREFIX}/session/login`,
      `${PREFIX}/init`,
    ],
  }),
  async (req, res, next) => {
    // 当访问 /api/session/login 时，req.user === undefined
    if (!req.user) {
      req.currentUser = {};
      return next();
    }

    if (!req.user.userId) {
      return res.status(200).json({
        errorCode: 401,
        reason: '未登录',
      });
    }

    // 将用户数据挂载到 req.currentUser
    await UsersDao.getByCondition({ UserId: req.user.userId }).then((user) => {
      req.currentUser = user;
    });

    // TODO: 判断是否有权限

    return next();
  },
);


// 日志
app.use((req, res, next) => {
  if (!req.currentUser) {
    req.currentUser = { UserTrueName: 'anno' };
  }
  logger.info(`[User] ${req.currentUser.UserTrueName}  [Request] ${req.method} ${req.url}`);
  next();
});

// 路由
router.mountTo(app);

// 404
app.use((req, res) => {
  res.status(200).json({
    errorCode: 404,
    reason: 'not found',
  });
});

// 500：全局错误处理
app.use((err, req, res, next) => {
  if (err.name === 'TokenExpiredError' || err.name === 'UnauthorizedError') {
    logger.info(`[Token] ${err.name}`);
    res.status(200).json({
      errorCode: 401,
      reason: 'jwt expired',
    });

    return next();
  }

  logger.error(err);

  res.status(200).json({
    errorCode: 500,
    reason: 'server error',
  });

  return next();
});

app.listen(PORT, () => {
  logger.debug(`服务已启动，访问 http://localhost:${PORT}/www`);
});
