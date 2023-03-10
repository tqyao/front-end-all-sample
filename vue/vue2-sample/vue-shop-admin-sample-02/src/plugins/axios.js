import axios from "axios";
import {getToken} from "@/token";

// 导入NProgress js
import NProgress from 'nprogress'
// 导入 NProgress css
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 10000,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  NProgress.start()
  config.headers['Authorization'] = getToken()
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  NProgress.done();
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request;
