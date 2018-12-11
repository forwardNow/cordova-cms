const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%d{hh:mm:ss} %p %[%c%] %m',
      },
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' },
    database: { appenders: ['out'], level: 'debug' },
    route: { appenders: ['out'], level: 'debug' },
  },
});


module.exports = {
  log4js,
  logger: log4js.getLogger('default'),
  dbLogger: log4js.getLogger('database'),
  routeLogger: log4js.getLogger('route'),
};
