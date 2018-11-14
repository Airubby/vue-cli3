import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import api from './api' 用request，为每个模块的调用写一个js
import request from './utils/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import NavInfo from './components/navInfo'

import './utils/elDialogdrag'  //element弹窗拖拽
import './utils/filters' // 自定义过滤器
import tool from './utils/tool'  //工具函数
import ajaxUrl from './utils/ajaxUrl'  //程序访问URL地址

import './assets/css/index.less'
import './assets/js/index.js'


// // 将API方法绑定到全局
// Vue.prototype.$api = api
//绑定工具函数到全局
Vue.prototype.$tool = tool
//绑定URL到全局
Vue.prototype.$ajaxUrl = ajaxUrl
//绑定request到全局
Vue.prototype.$request = request

//store.commit('resetNavList',menu)     

Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)
Vue.use(NavInfo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
