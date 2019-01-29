import {router} from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
    NProgress.start()
    const whiteList = ['/login'] // 不重定向白名单
    if(store.getters.token){
        console.log(to)
        console.log(from)
        console.log(to.meta)
        if(JSON.stringify(to.meta)!="{}"){
            if(to.meta.show){
                next()
                NProgress.done()    
            }else{
                console.log("没有权限访问")
            }
        }else{
            console.log("访问的页面不存在")
        }
        NProgress.done()
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            NProgress.done()
        } else {
            next('/login')
            NProgress.done()
        }
    }

})