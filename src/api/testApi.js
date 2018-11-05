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
