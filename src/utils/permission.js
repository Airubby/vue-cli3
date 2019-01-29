 
import Vue from 'vue';
import store from '@/store/index'
 
// v-permission: 功能权限指令
Vue.directive('permission', {
    bind(el, binding, vnode, oldVnode) {
        const { value } = binding
        const limits = store.getters && store.getters.limits
        if (value) {
            const permissionRoles = value
            const hasPermission = limits.some(limit => {
                return permissionRoles==limit
            })
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`need limits! Like v-permission="'test'"`)
        } 
    }
})
 