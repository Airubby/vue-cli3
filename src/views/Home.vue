<template>
  <div class="home content">
    <div id="nav">
      <router-link to="/">{{$t("navbar.Home")}}</router-link> |
      <router-link to="/about">{{$t("navbar.About")}}</router-link> | 
      <router-link to="/test">{{$t("navbar.Test")}}</router-link>
    </div>
    <!--
      <img alt="Vue logo" src="../assets/images/logo.png">
      <img alt="Vue logo" :src="'static/images/logo.png'">
    -->
    <img alt="Vue logo" :src="require('../assets/images/'+$theme+'/logo.png')" v-if="$theme">
    
    <NavInfo></NavInfo>
    <hr>
    <el-radio-group v-model="lang" size="small">
      <el-radio label="zh" border>简体中文</el-radio>
      <el-radio label="en" border>English</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  provide(){
    return{
      data:this.data
    }
  },
  data(){
      return{
        data:'13',
        lang:'zh'
      }
    },
  components: {
    HelloWorld
  }
}
</script>
