<template>
  <div>
    <mt-field label="用户" v-model="formModel.loginName"></mt-field>
    <mt-field label="密码" type="password" v-model="formModel.password"></mt-field>
    <mt-button type="primary" @click="onSubmit">登陆</mt-button>
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

<style scoped>
</style>
