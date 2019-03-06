import Cookies from 'js-cookie'

const app = {
  state: {
    wsData:{},
    AjaxUrl:Cookies.get('AjaxUrl')||'',
    loginUrl:Cookies.get('loginUrl')||'',
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
    setLoginUrl(state,loginUrl){
        state.loginUrl=loginUrl;
        Cookies.set('loginUrl', loginUrl)
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
    setLoginUrl({commit},loginUrl){
        commit('setLoginUrl',loginUrl)
    },
    // 中英文
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
  }

}

export default app
