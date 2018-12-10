/**
 * 邮件
 */
function email(rule, value, callback) {
  if (value.length === 0) {
    return callback();
  }
  if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
    return callback(new Error('邮箱格式不正确！'));
  }
  return callback();
}


/**
 * 手机
 */
function mobile(rule, value, callback) {
  if (value.length === 0) {
    return callback();
  }
  if (!(/^1[34578]\d{9}$/.test(value))) {
    return callback(new Error('手机号码格式不正确！'));
  }
  return callback();
}

export default {
  email,
  mobile,
};
