let TOKEN = null;

const Token = {
  get() {
    if (TOKEN) {
      return TOKEN;
    }
    return window.localStorage.getItem('TOKEN');
  },
  set(token) {
    if (!token) {
      return;
    }

    if (!TOKEN) {
      TOKEN = window.localStorage.getItem('TOKEN');
    }

    if (token !== TOKEN) {
      TOKEN = token;
    }

    window.localStorage.setItem('TOKEN', TOKEN);
  },
  isExist() {
    return Boolean(this.get());
  },
};

module.exports = Token;
