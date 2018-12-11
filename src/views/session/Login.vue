<template>
  <div class="login">
    <form class="login__form">
      <mt-field label="用户" v-model="formModel.loginName"></mt-field>
      <mt-field label="密码" type="password" v-model="formModel.password"></mt-field>
      <mt-button class="btn-submit" size="large" type="primary" @click="onSubmit">登 陆</mt-button>
    </form>
  </div>
</template>

<script>
import SessionService from '../../services/SessionService';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      isLoading: false,
      formModel: {
        loginName: 'admin',
        password: '123456',
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      const { loginName, password } = this.formModel;

      return SessionService.login(loginName, password).then((res) => {
        if (res.errorCode === 0) {
          Toast({
            message: '登录成功！',
            duration: 1000,
          });

          SessionService.store(res.result);

          // 如果是 401 过来的，则退一步
          if (this.$route.query.status === 401) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: '/' });
          }
        } else {
          Toast({
            message: '用户名或密码错误！',
            duration: 1000,
          });
        }
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss">
  .login {
    padding: 20px;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login_bg.png) no-repeat 0 0;
    background-size: cover;

    .mint-cell-wrapper {
      background: none;
    }

    .mint-cell {
      margin-bottom: 2px;
      color: #fff;
      background-color: rgba(255,255,255, 0.1);
    }

    .mint-field-core {
      background: none;
    }

    .btn-submit {
      margin-top: 20px;
    }
  }

  .login__form {
  }
</style>
