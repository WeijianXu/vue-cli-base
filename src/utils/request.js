// import Vue from 'vue';
import axios from 'axios';
import { UriU } from 'js-utils-xu';
import get from 'lodash/get';
import getEnv, { toLogin } from '@/services/api-env';
import { toastError, toastWarn } from '@/utils/toast';

export default function request(
  { method = 'GET', params, url, ...options },
  wholeData,
  customError, // 是否自定义错误处理，默认弹出框提示错误信息
) {
  const httpDefault = {
    method,
    url,
    params: method === 'get' || method === 'GET' ? params : null,
    data: method === 'post' || method === 'POST' ? params : null,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
    // 不能被改变的配置项
    withCredentials: true,
  };
  // 判断是否是绝对路径，绝对路径直接使用，不拼接
  const flag = url ? UriU.checkAbsUrl(url) : false;
  if (!flag) {
    httpDefault.url = `${getEnv().api || '/api'}${url}`;
  }
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then((res) => {
        const result = res.data;
        // 若响应中没有 code 字段（兼容自定义数据请求），默认为 200，
        const code = get(result, 'code', '200');
        // 403 未登录，不提示
        if (!customError && !['200', '401', '402', '403'].includes(code)) {
          toastError(result.msg);
        }
        // 是否只获取后端数据response中的data；某些更新操作则需要拿到所有返回数据
        resolve(!wholeData ? res.data : get(res, 'data.data'));
      })
      .catch((errRes) => {
        const status = get(errRes, 'response.status');
        // 一般错误处理
        // 未登录的 401 不进行自动提示
        if (status && status !== 200 && status !== 401) {
          toastError(
            get(errRes, 'response.data.msg', '出了点小差，请稍后刷新试试，或联系管理员'),
          );
        } else if (status === 401) {
          // 无权限访问时，部分页面资源加载失效时，Message 会失败
          try {
            // 无权限访问
            toastWarn('登录状态失效，即将跳转登录页面', 1, () => {
              toLogin();
            });
          } catch (error) {
            toLogin();
          }
        } else if (errRes.message.includes('aborted')) {
          console.warn('cancel or abort request');
        } else {
          toastError('网络异常，请稍后刷新试试，或联系管理员');
        }
        reject(errRes);
      });
  });
}
