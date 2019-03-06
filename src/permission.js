import {router} from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Cookies from 'js-cookie'
import * as API from '@/api/login'

routerGo();
function filterAsyncRouter(url, roles) {
    roles.forEach(element => {
        if(url==element.path){
            store.dispatch('setLimits',element.meta.limits);
            return;
        }
        if(element.children&&element.children.length>0){
            filterAsyncRouter(url,element.children);
        }
    });
  }
function getInfo(){  //刷新页面重新获取权限
    return new Promise(function(resolve, reject){
        API.getInfo({"token":Cookies.get('token')}).then((res) => {
        if(res.code==200){
            store.dispatch('setAuthInfo',res.data);
            let url=window.document.URL.split("#")[1];
            filterAsyncRouter(url,res.data)
        }else{
            Message.warning("权限获取失败");
        }
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

async function routerGo(){
    if(Cookies.get('token')){
        await getInfo();
    }
    router.beforeEach((to, from, next) => {
        NProgress.start()
        const whiteList = ['/login','/401','/404'] // 不重定向白名单
        let token=store.getters.token;
        if(token){
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                if(JSON.stringify(to.meta)!="{}"){
                    if(to.meta.show){
                        if(to.meta.limits&&to.meta.limits.length>0){
                            store.dispatch('setLimits',to.meta.limits);
                        }
                        next() 
                    }else{
                        next('/401') 
                        console.log("没有权限访问")
                    }
                }else{
                    next('/404') 
                    console.log("访问的页面不存在")
                }
            }
            
        }else{
            console.log()
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next('/login')
            }
        }
    
    })
    
    router.afterEach((to,from) => {
        let title=to.meta.title?`${to.meta.title}`:'vue-cli3';
        window.document.title = title;
        NProgress.done() // 结束Progress
    })
}

