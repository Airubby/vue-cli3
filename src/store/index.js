import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    theme,
  },
  getters
})

export default store
