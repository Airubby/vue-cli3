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
        // let _this=this;  // 监听的话，刷新就没法send数据了
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

        if(this.sendInfo){
            this.send();
        }

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
       send:function(){
            let _this=this;
            if(this.$ws.readyState==1){
                console.log(JSON.stringify(this.sendInfo))
                this.$ws.send(JSON.stringify(this.sendInfo))
            }else{
                setTimeout(function(){
                    _this.send();
                },500)
            }
            
        }
    },
    watch:{
        sendInfo:function(val){
            if(val){
                this.send();
            }
        },
        getWSData: function(val) { 
            console.log(this.wsInfo instanceof Array)
            console.log(this.wsInfo)
            if(this.wsInfo instanceof Array){ //数组的时候
                if(val&&val.length>0){
                    for(let i=0;i<val.length;i++){
                        for(let j=0;j<this.wsInfo.length;j++){
                            if(val[i].matchID===this.wsInfo[j].matchID){
                                this.wsInfo[j].value=val[i].value;
                            }
                        }
                    }
                }
            }else{ //obj的时候,如果obj中有多个值需要动态改变时，上面的数组中也可用下面的方式
                //给每个需改变的值比如value新增key_value
                if(val&&val.length>0){
                    for(let i=0;i<val.length;i++){
                        for(let item in this.wsInfo){
                            if(this.wsInfo[item]===val[i].key){  //这个key与需要改变的（key_value）匹配
                                let vitem=item.split("_")[1];
                                this.wsInfo[vitem]=val.data[i].value;
                            }
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