let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://192.168.1.17:3000';
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    cordova.plugin.http.sendRequest(
      baseURL + url,
      {
        method: 'post',
        data,
      },
      (res) => {
        console.log(JSON.stringify(res));
        resolve(res);
      },
      (res) => {
        console.log(baseURL + url, JSON.stringify(res));
        reject(res);
      },
    );
  });
}

module.exports = {
  post,
};
