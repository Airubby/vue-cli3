import request from '@/utils/request'
//登录
export function login(arg) {
    return request.post(`/login`, {
      params: arg
    });
}

// 获取权限信息
export function getInfo(arg) {
    return request.get(`/getInfo`, {
        params: arg
    });
}