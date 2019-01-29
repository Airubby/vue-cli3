const getters = {
  language: state => state.app.language,
  getWSData: state => state.app.wsData,
  AjaxUrl: state => state.app.AjaxUrl,
  
  token: state => state.user.token,
  addRouters: state => state.user.addRouters,
  limits:state=>state.user.limits,
  
  getTheme: state => state.theme.theme,
}
export default getters
