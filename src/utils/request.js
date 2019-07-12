import axios from "axios";
import Qs from "querystring";
import { Message, Main } from 'element-ui'
// import store from '@/store'
import store from '@/store/index'
// import $AjaxUrl from './ajaxUrl'
let service = axios.create({
  // baseURL: 'http://www.javasoft.top:9090/service',
  baseURL: store.getters.AjaxUrl,
  timeout: 5000 // 请求超时时间
});
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key]=JSON.stringify(o[key]);
    } else if (toType(o[key]) === 'array') {
      o[key]=JSON.stringify(o[key]);
    }
  }
  return o
}
// request拦截器
service.interceptors.request.use(
  config => {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    console.log(config)
    if(config.method=="post"){
      config.data=Qs.stringify(config.data)
      //导出get、post时用  config.data=Qs.stringify(filterNull(config.data))
      config.headers['Content-Type']='application/x-www-form-urlencoded';
    }
    // if(config.method=="get"){   //导出get、post时用 
    //   config.params=filterNull(config.params)
    // }
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

// export default {
//   get: function (url, params, response) {
//     return service.get(url,{params:params}).then(res=>{
//       if(response){
//         response(res.data);
//       }
//     })
//   },
//   post: function (url, params, response) {
//     return service.post(url,params).then(res=>{
//       if(response){
//         response(res.data);
//       }
//     })
//   },
// }
// Main.js  引入  Vue.prototype.$r=request
// 使用：
// this.$r.post("/login",{test:"123"},r=>{
//   console.log(r)
// })
// this.$r.get("/getInfo",{test:"112"},r=>{
//   console.log(r)
// })

