import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
  {
    path: '/login',
    name: 'login',
    meta: { title: '系统登录'},
    component: () => import('@/views/login/index.vue')
  }
];

export const asyncRouter=[
  {
    path: '/',
    name: 'home',
    meta: { title: '首页'},
    component: () => import('@/views/Home.vue')
  },{
    path: '/about',
    name: 'about',
    meta: { title: '关于'},
    component: () => import('@/views/About.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: { title: '测试'},
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/more',
    name: '更多菜单',
    meta: { title: '更多'},
    component: () => import('@/views/more/index.vue'),
    redirect:'/more/navone',
    children:[
      {
        path:'/more/navone',
        name:'菜单一',
        component: () => import('@/views/more/navone/index.vue'),
      },
      {
        path:'/more/navtwo',
        name:'菜单二',
        component: () => import('@/views/more/navtwo/index.vue'),
      }
    ]
  }

]
export const router= new Router({
  //mode: 'history',
  mode:'hash',
  base: process.env.BASE_URL,
  routes:syncRouter
})
