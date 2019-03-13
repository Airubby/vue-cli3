<template>
  <div class="home content">
    <h2>一级菜单展示1</h2>
    <el-upload
      class="elinput"
      ref="upload"
      :action="$ajaxUrl+'/upload/xml'"
      :data="{cmd:'xml'}"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onchange"
      :show-file-list="false"
      :file-list="fileList"
      :auto-upload="false">
      <el-input v-model="xmlurl" readonly placeholder="上传展示"></el-input>
      <div slot="tip" class="el-upload__tip" v-show="xmlshow" style="color:#f56c6c;text-align:right;">{{showInfo}}</div>
    </el-upload>
    <hr>
    <h2>滚动展示</h2>
    <div style="height:150px;width:100%;">
    <el-scrollbar style="height:100%;" class="scrollbar">
      <div class="scrollbarbox">
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
        <p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p><p>滚动到div底部请求加载更多数据</p>
      </div>
    </el-scrollbar>
    </div>
    <hr>
    <div id="test" @click="enterTo" ref="test" :class="{'testOne':true}">test</div>
    <hr>
    
  </div>
</template>

<script>

export default {
  name: '',
  mounted() {
    let _this=this;
    let scrollbar=this.$el.querySelector(".el-scrollbar__wrap");
    scrollbar.onscroll=function(){
      let viewH=scrollbar.offsetHeight;
      let contentH=_this.$el.querySelector(".scrollbarbox").offsetHeight;
      let scrollTop=scrollbar.scrollTop;
      if((scrollTop + viewH) >= contentH){  
          _this.$message.success('请求分页加载更多数据了~~~');
      }
    }
    this.$el.querySelector("#test").innerHTML="this.$el.querySelector('#test')/this.$refs.test设置dom；点击跳转传参数"
    this.$el.querySelector("#test").setAttribute("class","test2")
    this.$el.querySelector("#test").classList.add("test1")
    this.$refs.test.style.lineHeight="60px";
    this.$el.querySelector("#test").style.textAlign="center";
    console.log(this.$el.querySelector("#test").offsetWidth)
    console.log(this.$el.querySelector("#test").offsetHeight)
    console.log(this.$el.querySelectorAll('.test').length)
    console.log(this.$el.classList.contains('test'))
  },
  data(){
      return{
        className:'1',
        xmlurl:'',
        xmlshow:false,
        fileList:[],
        showInfo:'',
      }
    },
  methods: {
    enterTo:function(){
      this.$router.push({path:'/more/navtwo',query:{
          param:JSON.stringify({"id":"123",name:'小呆'})
        }
      });
    },
    onSuccess(res, file, fileList){
        this.fileList=[];
        console.log(res,file,fileList)
        if(res.err_code=="0"){
            console.log('上传成功')
        }else{//上传失败
            this.showInfo=res.err_msg;
            this.xmlshow=true;
        }
        
    },
    onError(err, file, fileList){
        this.fileList=[];
        console.log(err,file,fileList)
        this.$message.warning(err);
        
    },
    onchange(file,fileList){
        console.log(file,fileList)
        var fileArry=file.name.split(".");
        var fileType=fileArry[fileArry.length-1];
        if(fileType=="xml"||fileType=="XML"){
            this.$refs.upload.submit();
        }else{
            this.fileList=[];
            this.showInfo="只能上传xml/XML文件";
            this.xmlshow=true;
        }
    }
  },
  components: {
    
  }
}
</script>
<style scoped>
  p{margin:0;}
</style>