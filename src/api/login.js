import request from '@/utils/request'
import store from '@/store/index'
//登录
export function login(arg) {
    console.log(request.defaults.baseURL)
    console.log(store.getters.AjaxUrl)
    //设置baseURL,这样可以从配置文件配置每个模块的baseURL，每个模块从不同的服务器获取数据
    //登录的时候得从store中取baseURL,因为初始化加载的时候，这个文件比new VUE先执行，当时baseURL是空的；
    request.defaults.baseURL=store.getters.loginUrl;
    return request.post(`/login`, {
      params: arg
    });
}

// 获取权限信息
export function getInfo(arg) {
    request.defaults.baseURL=store.getters.AjaxUrl;
    return request.get(`/getInfo`, {
        params: arg
    });
}