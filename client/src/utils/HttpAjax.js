import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router';
import { getToken } from './';
// 响应失败后处理函数
function errMsg(errMsg) {
  Notification.error({
    message: errMsg,
  });
}
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers = {
      Authorization: getToken(),
    };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function ({ data }) {
    // 对响应数据做点什么
    if (data.errMsg) {
      errMsg(data.errMsg);
      return Promise.reject(error);
    }
    return Promise.resolve(data);
  },
  function (error) {
    // 对响应错误做点什么
    /* token 验证失败或过期 - 401  */
    if (error.response.status === 401) {
      errMsg('身份过期，请重新登录！')
      localStorage.removeItem('Utoken');
      router.push('/verify/login')
    }
    return Promise.reject(error);
  }
);

export default axios;
