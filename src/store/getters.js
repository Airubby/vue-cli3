const getters = {
  language: state => state.app.language,
  token: state => state.app.token,
  getWSData: state => state.app.wsData,
  AjaxUrl: state => state.app.AjaxUrl,
  
  getTheme: state => state.theme.theme,
}
export default getters
