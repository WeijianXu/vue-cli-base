<template>
  <div class="error_page">
    <div
      class="err403"
    >您无权限访问本页面，请联系管理员添加权限,并重新登录</div>
    <Button
      style=" position: absolute; left: 50%; transform: translate(-50%);"
      @click="gotoLogin"
      >重新登录</Button
    >
  </div>
</template>

<script>
import { toLogout } from '@/services/api-env';
import { logout } from '@/services/user';

export default {
  data() {
    return {
      emptyImg,
    };
  },
  methods: {
    gotoLogin() {
      logout().then(({ code }) => {
        if (code === '200') {
          // this.$router.push('/user/login');
          // 退出登录
          toLogout(true);
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>
  