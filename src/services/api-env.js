import { UriU } from 'js-utils-xu';
import { publicPath } from '@/config/env';

const APIURL = {
  localhost: {
    api: '/api/portal',
    // login: '/cas',
    login: '/usercenter',
  },
};

export default function getEnv() {
  const apiConfig = UriU.getEnv(APIURL);
  // 为空时，返回默认配置
  if (!Object.keys(apiConfig).length) {
    return {
      api: '/api/portal',
      login: '/usercenter',
    };
  }
  return apiConfig;
}

export function toLogin(toHomePage) {
  // 无权限访问，跳到登录界面
  const { login } = getEnv();
  // 登录跳转方式
  let originalUrl = UriU.encodeSearch(window.location);
  if (toHomePage) {
    originalUrl = `${window.location.origin}${publicPath}`;
  }
  window.location.href = `${login}/login?callbackUrl=${originalUrl}`
}

export function toLogout(toHomePage) {
  // 退出登录时，跳到登录界面
  const { login } = getEnv();
  let originalUrl = UriU.encodeSearch(window.location);
  if (toHomePage) {
    originalUrl = `${window.location.origin}${publicPath}`;
  }
  window.location.href = `${login}/logout?callbackUrl=${originalUrl}`;
}
