import axios from "axios";
import Qs from "querystring";
import { Message } from 'element-ui'
// import store from '@/store'
import store from '@/store/index'
// import $AjaxUrl from './ajaxUrl'
let service = axios.create({
  // baseURL: 'http://www.javasoft.top:9090/service',
  baseURL: store.getters.AjaxUrl,
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    console.log(config)
    if(config.method=="post"){
      config.data=Qs.stringify(config.data)
      config.headers['Content-Type']='application/x-www-form-urlencoded';
    }
    if (store.getters.token) {
      config.headers['X-Token'] =store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200/900是抛错 可结合自己业务进行修改
     */
    
    const res = response.data;
    console.log(res)
    if (res.code == 200 || res.code == 900 || !res.code) {
      return response.data;
    } else {
      let errorMsg = "抱歉，出错啦~~~";
      if (res.code === 10003) {
        errorMsg = "长时间未登录，请重新登陆！";

        location.reload()
      }

      Message.error(errorMsg);
      return Promise.reject("error");
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message.error('服务器错误，请联系管理人员！');
    return Promise.reject("重新登录");
  }
);

export default service;