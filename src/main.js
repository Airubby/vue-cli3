import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api' //用request，为每个模块的调用写一个js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import NavInfo from './components/navInfo'

import './utils/elDialogdrag'  //element弹窗拖拽
import './utils/filters' // 自定义过滤器
import tool from './utils/tool'  //工具函数


import './assets/css/index.less'
import './assets/js/index.js'

import './utils/mock.js'

import echarts from 'echarts'

// // 将API方法绑定到全局
Vue.prototype.$api = api
//绑定工具函数到全局
Vue.prototype.$tool = tool


Vue.prototype.$echarts = echarts 

//store.commit('resetNavList',menu)     

Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)
Vue.use(NavInfo)

Vue.config.productionTip = false

function getServerConfig () {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
      let config = result.data;
      let ajaxUrl = process.env.NODE_ENV == 'production' ? config.production:config.develop;
      Vue.prototype.$ajaxUrl=ajaxUrl;
      store.commit('setAjaxUrl',ajaxUrl);
      resolve();
    }).catch((error) => {
      console.log(error)
      reject()
    })
  })
}

async function init() {
  await getServerConfig();
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
init();
