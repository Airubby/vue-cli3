<template>
  <div class="home content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test">Test</router-link>
    </div>
    <h2>多级菜单展示</h2>
    <router-link to="/more/navone">菜单一</router-link> | 
    <router-link to="/more/navtwo">菜单二</router-link>
    <div style="height:calc(100% - 200px)">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'more',
  provide(){
    return{
    }
  },
  data(){
      return{
      }
    },
  components: {
    
  }
}
</script>
