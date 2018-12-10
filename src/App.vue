<template>
  <div class="app">
    <transition mode="out-in" name="admin">
      <router-view></router-view>
    </transition>
    <div class="loading" v-show="isVisible">
      <span class="el-icon-loading"></span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isVisible() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
<style>

.app {
  height: 100%;
}

.loading {
  position: absolute;
  top: 45%;
  left: 49%;
  z-index: 100;
  font-size: 24px;
  color: #333;
  background: rgba(255, 255, 255, 0.2);
}
</style>

