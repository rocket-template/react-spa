import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 30000
  /* ,
  withCredentials: true */
});

axiosInstance.interceptors.response.use(response => {
  // add custom response interceptor here
  if (!response.status) {
    // global error handler
    throw new Error('服务器连接错误');
  }
  return response.data;
});

axiosInstance.interceptors.request.use(config => {
  // 此处根据后端，实际情况来添加使用，如果后端需要的是application/json，就不用处理
  /* if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.data = qs.stringify(config.data);
  } */
  return config;
});

export default axiosInstance;
