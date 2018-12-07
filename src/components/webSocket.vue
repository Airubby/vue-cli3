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
        getWSData: function(val) { 
            for(var i=0;i<val.length;i++){
                for(var j=0;j<this.wsInfo.length;j++){
                    if(val[i].matchID===this.wsInfo[j].matchID){
                        this.wsInfo[j].value=val[i].value;
                    }
                }
            }
        },
    },
    props:["wsInfo"],
    components:{}
}
</script>

<style scoped lang="less">

</style>