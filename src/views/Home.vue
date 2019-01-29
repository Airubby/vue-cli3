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
    <hr>
    <!--后台返回了test权限，如果绑定其它的后台没有返回的就没有权限-->
    <el-button type="primary" @click="testLang" v-permission="'test'">{{$t("message.testLang")}}</el-button>
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
  computed: {
    lang: {
      get() {
        return this.$store.state.app.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    }
  },
  data(){
      return{
        data:'13',
      }
    },
  methods: {
    testLang:function(){
      this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
          confirmButtonText: this.$t('button.ok'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
      }).then(() => {
          this.$message.success(this.$t('button.ok'));
      });
    },
  },
  components: {
    HelloWorld
  }
}
</script>
