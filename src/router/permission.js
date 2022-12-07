import router from './index';
import store from '@/store';
import { toLogin } from '@/services/api-env';

const whiteList = ['/usercenter/login', '/error/403']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  const isLogined = store.state.user.isLogined;
  const permissionList = store.state.user.permissionList || [];
  if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next();
  } else if (isLogined && isLogined === 'N') {
    // 已拉完userInfo接口，且接口报错，返回重新登陆
    toLogin();
  } else if (isLogined && isLogined === 'Y') {
    // 已正确获取过userInfor接口数据
    const { moduleCode } = to.meta;
    // 判断当前页面是否有权限
    const isPermission = permissionList.includes(`${moduleCode}:read`);
    if (!moduleCode || (moduleCode && isPermission)) {
      next();
    } else {
      next({ name: 'error_403', replace: true });
    }
  } else if (!store.state.user.isLogined) {
    // 未获取userInfor接口数据
    const { moduleCode } = to.meta;
    store.dispatch('user/getUserInfo').then(() => {
      // 判断当前页面是否有权限
      const isPermission = permissionList.includes(`${moduleCode}:read`);
      if (!moduleCode || (moduleCode && isPermission)) {
        next();
      } else {
        next({ name: 'error_403', replace: true });
      }
    }).catch(() => {
      toLogin();
    });
  }
});
