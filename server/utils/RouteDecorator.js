const express = require('express');

function Router(prefix = '') {
  return (target) => {
    const router = express.Router(null);

    target.prototype.$routeList.forEach((item) => {
      router[item.httpMethod](prefix + item.pattern, item.middleware);
    });

    target.prototype.$router = router; // eslint-disable-line no-param-reassign
  };
}


function RequestMapping(httpMethod, pattern) {
  return (target, methodName, descriptor) => {
    if (!target.$routeList) {
      target.$routeList = []; // eslint-disable-line no-param-reassign
    }
    target.$routeList.push({
      httpMethod: httpMethod.toLowerCase(),
      pattern,
      middleware: target[methodName],
    });
    return descriptor;
  };
}

exports.Router = Router;
exports.RequestMapping = RequestMapping;
