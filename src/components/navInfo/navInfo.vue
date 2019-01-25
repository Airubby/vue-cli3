<template>
    <div class="loncom_content">
        {{$t("message.changeSkin")}}
        <el-switch
        style="display: block"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-text="$t('skin.Black')"
        :inactive-text="$t('skin.Default')">
        </el-switch>
    </div>
</template>

<script>
// import store from '@/store'
import store from '@/store/index'
export default {
    name: 'NavInfo',
    created () {
        
        
    },
    mounted() {
       if(this.$theme=="default"){
           this.value=false
       }else{
           this.value=true;
       }

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
            if(val){
                store.dispatch('setTheme','black');
                // store.commit('setTheme','black');
            }else{
                // store.dispatch('setTheme','default');
                store.commit('setTheme','default');
            }
        }
    } 
}
</script>

