<template>
    <span></span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:'webSocket',
    created () {
        
    },
    mounted() {
        // let _this=this;
        // this.$ws.addEventListener('open', function (event) {
        //     //_this.$ws.send(_this.sendInfo)
        // });
        //推送数据回来，不用向vuex中写了,但是如果一个组件应用了两个webSocket组件时，就有问题，还是得存vuex中监听
        // this.$ws.onmessage = function(event) {
        //     console.log(event)
        //     // let result = JSON.parse(event.data);
        //     let result = eval(event.data);
        //     for(let i=0;i<result.length;i++){
        //         for(let j=0;j<_this.wsInfo.length;j++){
        //             if(result[i].matchID===_this.wsInfo[j].matchID){
        //                 _this.wsInfo[j].value=result[i].value;
        //             }
        //         }
        //     }
        // };
    },
    computed:{
    //   ...mapGetters({
    //     'getWSData':"getWSData"  //起别名用，如果不起别名用下面的
    //   })
    //// 映射 `this.getWSData` 为 `store.getters.getWSData`
        ...mapGetters([
            'getWSData'
        ]),
    },
    data() {
        return {
            
       }
    },
    methods:{
       
    },
    watch:{
        //发送信息给服务端
        sendInfo:function(val){
            if(val&&this.$ws.readyState==1){
                this.$ws.send(val)
            }
        },
        getWSData: function(val) { 
            console.log(this.wsInfo instanceof Array)
            console.log(this.wsInfo)
            if(val&&val.length>0){
                for(var i=0;i<val.length;i++){
                    for(var j=0;j<this.wsInfo.length;j++){
                        if(val[i].matchID===this.wsInfo[j].matchID){
                            this.wsInfo[j].value=val[i].value;
                        }
                    }
                }
            }
            
        },
    },
    props:["wsInfo","sendInfo"],
    components:{}
}
</script>

<style scoped lang="less">

</style>