<template>
  <div id="app" ref="app">
    <transition name="rotate-fall">
      <router-view v-if="isRouterAlive"/>
    </transition>
  </div>
</template>
<script>
// import store from './store'
import store from './store/index'
import Vue from 'vue'
import { mapGetters } from 'vuex'
// const _import = file => () => require('@/assets/css/' + file + '/index.less')
  export default {
    name: 'app',
    provide(){
      return{
        reload:this.reload
      }
    },
    created () {
        
    },
    computed:{
    //   ...mapGetters({
    //     'getWSData':"getWSData"  //起别名用，如果不起别名用下面的
    //   })
    //// 映射 `this.getWSData` 为 `store.getters.getWSData`
        ...mapGetters([
            'getTheme'
        ]),
    },
    mounted() {
        this.switchTheme(this.$theme)
        this.$tool.wsConnection("",function(result){
          console.log(result)
          // store.commit('setwsData',eval(result.data));
          store.dispatch('setwsData',eval(result.data));
        })

    },
    data(){
      return{
        isRouterAlive:true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(function(){
          this.isRouterAlive=true;
        })
      },
      switchTheme:function(themeName){
        this.$refs.app.className=themeName+"_theme";
        document.body.className=themeName+"_theme";
        Vue.prototype.$theme=themeName;
        this.$nextTick(function(){
          this.reload();
        })
        
      },
    },
    watch:{
      getTheme:function(val){
          this.switchTheme(val)
      }
    }
  }
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
