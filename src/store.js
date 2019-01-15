import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
        token:'88888888',
        AjaxUrl:'',
        wsData:{},
        theme:'',
        navList:[
            // {url:'/index',name:'首页',icon:'static/images/home.svg',item:[]},
            // {url:'/control',name:'实时监控',icon:'static/images/home.svg',item:[
            //     {url:'/control/gis',name:'GIS',fullName:'GIS',icon:'static/images/item.png',item:[]},
            //     {url:'/control/list',name:'视图',fullName:'列表视图',icon:'static/images/item.png'},
            // ]},
            // {url:'/alarm',name:'告警管理',icon:'static/images/home.svg',item:[
            //     {url:'/alarm/realtime',name:'实时',fullName:'实时告警',icon:'static/images/item.png',item:[]},
            //     {url:'/alarm/history',name:'历史',fullName:'历史告警',icon:'static/images/item.png'},
            //     {url:'/alarm/inform',name:'通知',fullName:'通知管理',icon:'static/images/item.png'},
            // ]},
            // {url:'/video',name:'视频管理',icon:'static/images/home.svg',item:[
            //     {url:'/video/vms',name:'视频',fullName:'视频管理',icon:'static/images/item.png',item:[]},
            // ]},
            // {url:'/record',name:'档案管理',icon:'static/images/home.svg',item:[
            //     {url:'/record/pool',name:'池塘',fullName:'池塘管理',icon:'static/images/item.png',item:[]},
            //     {url:'/record/finger',name:'物种',fullName:'物种管理',icon:'static/images/item.png'},
            // ]},
            // {url:'/system',name:'系统管理',icon:'static/images/home.svg',item:[
            //     {url:'/system/limits',name:'权限',fullName:'权限管理',icon:'static/images/item.png',item:[
            //         {url:'/system/limits/depart',name:'部门',fullName:'部门管理',icon:'static/images/xingxing.png'},
            //         {url:'/system/limits/user',name:'用户',fullName:'用户管理',icon:'static/images/xingxing.png'},
            //         {url:'/system/limits/role',name:'角色',fullName:'角色管理',icon:'static/images/xingxing.png'},
            //     ]},
            //     {url:'/system/sconfig',name:'业务',fullName:'业务配置',icon:'static/images/item.png',item:[
            //         {url:'/system/sconfig/record',name:'档案',fullName:'档案管理',icon:'static/images/xingxing.png'},
            //         {url:'/system/sconfig/scsi',name:'组态',fullName:'组态配置',icon:'static/images/xingxing.png'},
            //     ]},
            //     {url:'/system/log',name:'日志',fullName:'操作日志',icon:'static/images/item.png'},
            // ]},
        ],
       
   },
   getters:{
       getNavInfo(state){
           return state.navList;
       },
       //getNavInfo: state => state.navList,           ???state.app.navList
       AjaxUrl(state){
            return state.AjaxUrl;
       },
       getWSData(state){
            return state.wsData;
        },
       token(state){
            return state.token;
        },
        getTheme(state){
            return state.theme;
        },
   },
   mutations:{
        resetNavList(state,menu){
            state.navList=menu;
        },
        setAjaxUrl(state,ajaxUrl){
            state.AjaxUrl=ajaxUrl;
        },
        setwsData(state,wsData){
            state.wsData=wsData;
        },
        setTheme(state,themeName){
            state.theme=themeName;
        },
        theFn(){

        },
        
   },
   actions:{
        checkPORT({ commit }, obj) {//这个obj就是需要的参数，这个blur事件经过validator包装后的参数。随后的就跟官网上的一样了，随意写。
            console.log(obj);
            if (!obj.value) {
                if(obj.rules.required){
                    obj.callback(new Error('不能为空'))
                }else{
                    obj.callback()
                }
            } else if (Math.round(Number(obj.value)) !== Number(obj.value)) {
                obj.callback(new Error('必须为整数数字'))
            } else {
                if(Number(obj.value)>65535||Number(obj.value)<1){
                    obj.callback("端口范围在1-65535之间")
                }else{
                    obj.callback()
                }
            }
            commit('theFn')
        },
        checkIP({ commit }, obj) {
            if (!obj.value) {
                if(obj.rules.required){
                    obj.callback(new Error('不能为空'))
                }else{
                    obj.callback()
                }
            } else {
              var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
                if(reg.test(obj.value)){
                    obj.callback()
                }else{
                    obj.callback("ip格式错误")
                }
            }
            commit('theFn')
        },
        checkEMAIL({ commit }, obj) {
            if (!obj.value) {
                if(obj.rules.required){
                    obj.callback(new Error('不能为空'))
                }else{
                    obj.callback()
                }
            } else {
              var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(reg.test(obj.value)){
                    obj.callback()
                }else{
                    obj.callback("邮箱格式错误")
                }
            }
            commit('theFn')
        },
        checkPHONE({ commit }, obj) {
            if (!obj.value) {
                if(obj.rules.required){
                    obj.callback(new Error('不能为空'))
                }else{
                    obj.callback()
                }
            } else {
              var reg = /^1[345789]\d{9}$/
                if(reg.test(obj.value)){
                    obj.callback()
                }else{
                    obj.callback("手机格式错误")
                }
            }
            commit('theFn')
        },
        checkNumber({ commit }, obj) {
            if (!obj.value) {
                if(obj.rules.required){
                    obj.callback(new Error('不能为空'))
                }else{
                    obj.callback()
                }
            } else {
                let regPos = /^\d+(\.\d+)?$/; //非负浮点数
                //let regPos = /^([1-9]+)$/;  //大于0的正整数
                // let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                if(regPos.test(obj.value)){
                    obj.callback()
                }else{
                    obj.callback('请输入正数数值')
                }
            }
            commit('theFn')
        },
   },
})
