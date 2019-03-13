// const _import = file => () => import('./assets/css/' + file + '/index.css')
import Vue from 'vue'
import App from './App.vue'
import {router} from './router/index'
// import store from './store' //用分离的store
import store from './store/index'
import axios from 'axios'
import api from './api' //用request，为每个模块的调用写一个js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import NavInfo from './components/navInfo'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './utils/filters' // 自定义过滤器
import tool from './utils/tool'  //工具函数
// import 'promise-polyfill'  //兼容低版本浏览器   import 'babel-polyfill'
import i18n from './lang'  //国际化
import './utils/directive'  //自定义指令
import BaiduMap from 'vue-baidu-map'

import './assets/js/index.js'
import 'vue-transition.css'

import './utils/mock.js'

// import echarts from 'echarts'  //做成公共函数 在tool中

import './assets/css/index.less'

// // 将API方法绑定到全局
Vue.prototype.$api = api
//绑定工具函数到全局
Vue.prototype.$tool = tool

Vue.prototype.$Swiper = Swiper
// Vue.prototype.$echarts = echarts 

//store.commit('resetNavList',menu)     
Vue.use(ElementUI,{
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(ElSearchTablePagination)
Vue.use(NavInfo)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'fGPfT9cGkLHcbE4DpCGXuZzaDsnwfdLe'
})

Vue.config.productionTip = false

function getServerConfig() {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
      let config = result.data;
      let ajaxUrl = process.env.NODE_ENV == 'production' ? config.production:config.develop;
      Vue.prototype.$ajaxUrl=ajaxUrl;
      // store.commit('setAjaxUrl',ajaxUrl);
      store.dispatch('setAjaxUrl',ajaxUrl);
      store.dispatch('setLoginUrl',config.loginBaseUrl);
      Vue.prototype.$theme = config.theme || 'default';
      // initTheme(Vue.prototype.$theme)
      resolve();
    }).catch((error) => {
      console.log(error)
      reject()
    })
  })
}

// Vue.prototype.switchTheme = function(themeName){
//   import(`./assets/css/${themeName}/index.less`)
// }
// function initTheme(themeName) {
//   import(`./assets/css/${themeName}/index.less`)
// }
import '@/permission' 
async function init() {
  await getServerConfig();
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')
}
init();
