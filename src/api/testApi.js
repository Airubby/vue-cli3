import request from '@/utils/request'
/** 
 * [getTest 登录弹窗答题状态获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getTest(arg) {
  return request.get(`/getData`, {
    params: arg
  });
}
export function postTest(arg) {
  return request.post(`/postData`,  arg);
}
//mock本地数据，开发环境的前缀url设置为空，
export function getMock(arg) {
  return request.get(`/getMockData`,  arg);
}

