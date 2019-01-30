import Cookies from 'js-cookie'

const app = {
  state: {
    wsData:{},
    AjaxUrl:Cookies.get('AjaxUrl')||'',
    // 中英文
    language: Cookies.get('language') || 'zh',
  },
  mutations: {
    setwsData(state,wsData){
        state.wsData=wsData;
    },
    setAjaxUrl(state,ajaxUrl){
        state.AjaxUrl=ajaxUrl;
        Cookies.set('AjaxUrl', ajaxUrl)
    },
    // 中英文
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
  },
  actions: {
    setwsData({commit},wsData){
        commit('setwsData',wsData)
    },
    setAjaxUrl({commit},ajaxUrl){
        commit('setAjaxUrl',ajaxUrl)
    },
    // 中英文
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
  }

}

export default app
