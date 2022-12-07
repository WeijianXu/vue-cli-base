import request from '@/utils/request';

// 获取用户信息
export function getCurrentUser() {
  const timer = new Date().getTime();
  return request({
    method: 'get',
    url: '/api/user/currentUser',
    params: { timer },
  }).then((res) => res.data);
}

export function logout() {
  return request({ method: 'get', url: '/api/user/logout' }).then(
    (res) => res.data,
  );
}
