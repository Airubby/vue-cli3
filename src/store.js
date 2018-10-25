import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
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
       }
   },
   mutations:{
        resetNavList(state,navList){
            state.navList=navList;
        },
        resetModel(state,obj){
          
            for(var item in state){
                if(item!="navList"){
                    state[item]={};
                }else{
                    state.navList=[];
                }
            }
        },
        setModel(state,arr){
            if(state[arr[0]]==undefined){
                state[arr[0]]={};
            }

            state[arr[0]][arr[1]]=true;
        },
        // dd(){

        // },
   },
   actions:{
       //使用如下
        // data(){
        // 　　let checkport=(rules,value,callback)=>{　//转换函数，主要目的是传给store内方法的参数。
        // 　　　　this.$store.dispatch('checkPORT',{rules,value,callback})//这儿的checkAge是写在store中的，vuex规定参数必须传对象。
        // 　　}
        // 　　return {
        // 　　　　rules:{
        // 　　　　　　age:[{required:true,trigger:'blur',validator:checkport}]//主要格式是标准json。
        // 　　　　}，
        // 　　}
        // }
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
                obj.callback()
            }
            //commit('dd')
        }
   },
})
