<template>
    <div class="loncom_content">
        风格切换：
        <el-switch
        style="display: block"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="酷黑风格"
        inactive-text="亮白风格">
        </el-switch>
    </div>
</template>

<script>
import store from '@/store'
export default {
    name: 'NavInfo',
    created () {
        
        
    },
    mounted() {
       

    },
    
    data(){
      return {
          value:false
      }
    },
    methods:{
        

    }, 
    watch:{
        value:function(val){
            console.log(val)
            if(val){
                store.commit('setTheme','black');
            }else{
                store.commit('setTheme','default');
            }
            
        }
    } 
}
</script>

