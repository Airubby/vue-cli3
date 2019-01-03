<template>
  <div id="app" ref="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
import store from './store'
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
        function wsConnection(sendMsg, callback) {
          // var url = location.host.indexOf(":")!=-1?location.host.slice(0, location.host.indexOf(":")):location.host
          // var url="echo.websocket.org";
          // var port="80";
          try {
              //var SOCKECT_ADDR = "ws://" + url +":"+ port;
              // var SOCKECT_ADDR="ws://192.168.16.253:80/websocket"
              var SOCKECT_ADDR="ws://192.168.1.253:8090/ws"
              let ws = new WebSocket(SOCKECT_ADDR);
              ws.onopen = function (event) {
                  console.log(event)
                  console.log("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
                  //ws.send(sendMsg);
              };
            
              ws.onmessage = callback;
              ws.onclose = function (event) {
                console.log(event)
              };
              ws.onerror = function (event) {
                console.log("WebSocket异常！" + event.toString());
              };
          } catch (ex) {
              console.log(ex.message);
          }
        }
        wsConnection("sendMsg",function(result){
          store.commit('setwsData',eval(result.data));
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
        console.log(themeName)
        this.$refs.app.className=themeName+"_theme"
        console.log()
      },
    },
    watch:{
      getTheme:function(val){
          console.log(123213)
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
