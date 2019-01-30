import {syncRouter, asyncRouter,router } from '@/router/index'
import Cookies from 'js-cookie'
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouter, roles) {
  asyncRouter.map((item)=>{
    roles.forEach((inItem)=>{
      if(item.path==inItem.path){
        if(item.redirect){
          for(let i=0;i<inItem.children.length;i++){
            if(inItem.children[i].meta.show){
              item.redirect=inItem.children[i].path;
              break;
            }
          }
        }
        if(item.children&&inItem.children){
          item.children=filterAsyncRouter(item.children,inItem.children)
        }
        item.meta=inItem.meta;
      }
    })
  })
  return asyncRouter;
}

const user = {
  state: {
    token:Cookies.get('token')||'',
    routers: syncRouter,
    addRouters: [],
    limits:[],
  },
  mutations: {
    setToken(state,token){
      state.token=token;
      Cookies.set('token', token)
    },
    setAuthInfo(state,data){
      let theAsyncRouter = filterAsyncRouter(asyncRouter,data)
      state.addRouters = theAsyncRouter
      for(let i=0;i<theAsyncRouter.length;i++){
        router.options.routes.push(theAsyncRouter[i]);
      }
      router.addRoutes(theAsyncRouter);
    },
    setLimits(state,data){
      state.limits=data;
    }
    
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    //设置获取的权限信息
    setAuthInfo({commit},data){
      commit('setAuthInfo',data)
    },
    //设置功能权限
    setLimits({commit},data){
      commit('setLimits',data);
    }

  }

}

export default user
