<template>
  <div class="home content">
    <h2>一级菜单展示2</h2>
    <router-view></router-view>
    <hr>
    id:{{info.id}}----name:{{info.name}}
  </div>
</template>

<script>

export default {
  name: '',
  mounted() {
    let param = this.$route.query.param;
    console.log(param)
    if(param){
      console.log(JSON.parse(param))
      console.log('编辑')
      this.info=JSON.parse(param);
    }else{
      console.log('新增')
    }
    
  },
  data(){
      return{
        info:{
          id:'',
          name:'',
        }
      }
    },
  components: {
    
  }
}
</script>
