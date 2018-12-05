<template>
  <div class="home content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test">Test</router-link>
    </div>
    <img alt="Vue logo" src="../assets/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <NavInfo></NavInfo>
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
      }
    },
  components: {
    HelloWorld
  }
}
</script>
