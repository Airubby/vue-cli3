import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import theme from './modules/theme'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    theme,
    user,
  },
  getters
})

export default store
