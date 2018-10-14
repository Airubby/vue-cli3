import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import NavInfo from './components/navInfo'

import './elementDialogDrag.js'  //拖拽 <el-dialog v-dialogDrag></el-dialog>

// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)
Vue.use(NavInfo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
