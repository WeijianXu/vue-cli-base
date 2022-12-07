import Vue from 'vue';

/**
 * @param text 错误提示文字
 */
export const toastError = (text) => {
  Vue.prototype.$Toast.error({
    content: text,
    duration: 5,
    closable: false,
  });
};

/**
 * @param text 成功提示文字
 */
export const toastSuccess = (text) => {
  Vue.prototype.$Toast.success({
    content: text,
    duration: 5,
    closable: false,
  });
};

/**
 * @param text 警告提示文字
 * @param time 延时执行时间，单位为秒
 * @param fun 后续执行时间
 */
export const toastWarn = (text, time, fun) => {
  Vue.prototype.$Toast.warning({
    content: text,
    duration: 5,
    closable: false,
  }, time, fun);
  if (time && fun) {
    setTimeout(() => {
      fun();
    }, time * 1000);
  }
};
