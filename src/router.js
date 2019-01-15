import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  mode:'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/Test.vue')
    },
    {
      path: '/more',
      name: '更多菜单',
      component: () => import('./views/more/index.vue'),
      redirect:'/more/navone',
      children:[
        {
          path:'/more/navone',
          name:'菜单一',
          component: () => import('./views/more/navone/index.vue'),
        },
        {
          path:'/more/navtwo',
          name:'菜单二',
          component: () => import('./views/more/navtwo/index.vue'),
        }
      ]
    }
  ]
})
