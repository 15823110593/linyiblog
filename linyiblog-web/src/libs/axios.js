/*
 * title: axios预处理
 */
import axios from 'axios';
import api from '@/api/api.js'
import config from '@/libs/choseConfig'
import {MessageBox} from 'element-ui'


axios.defaults.method = 'post';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

//在请求发送之前进行一些处理
axios.interceptors.request.use((request) => {
  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  var urlArr = request.url.split("?");
  var url = api[urlArr[0]];
  if (url) {
    urlArr.shift();
    if (urlArr.join("?")) {
      request.url = config.port + url + "?" + urlArr.join("?");
    } else {
      request.url = config.port + url;
    }
  }
  return request;
})

//对返回数据进行预处理
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default axios;
