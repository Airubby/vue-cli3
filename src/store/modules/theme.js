const theme = {
  state: {
    theme:'',
  },
  mutations: {
    setTheme(state,themeName){
      state.theme=themeName;
    },
  },
  actions: {
    setTheme({ commit }, themeName) {
      commit('setTheme', themeName)
    },
  }

}

export default theme
