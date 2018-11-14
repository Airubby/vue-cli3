import NavInfoComponent from './navInfo.vue'
// export default {
//     install:function(Vue){
//         Vue.component('NavInfo',NavInfoComponent)
//     }      
// }
/* istanbul ignore next */
NavInfoComponent.install = function(Vue) {
  Vue.component(NavInfoComponent.name, NavInfoComponent);
};

export default NavInfoComponent;
