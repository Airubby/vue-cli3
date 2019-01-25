<template>
  <div class="home content">
    <h2>一级菜单展示2</h2>
    <router-view></router-view>
    <hr>
    id:{{info.id}}----name:{{info.name}}
    <hr>
    <h2>下拉框带树形</h2>
    <el-select v-model="value6" placeholder="请选择">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText" style="position:absolute;top:6px;z-index:9;margin:0 auto;">
      </el-input>
      <el-option :value="value6" :label="value7" class="selectTree">
          <el-tree show-checkbox ref="tree" node-key="id" class="filter-tree"
            :data="data" 
            :filter-node-method="filterNode"
            :props="defaultProps" @check-change="selsetchangeTree">
          </el-tree>
      </el-option>
    </el-select>


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
    this.$nextTick(function(){
      this.$el.querySelector(".selectTree").parentNode.style.paddingTop="40px";
    })
    
  },
  data(){
      return{
        filterText: '',
        value6:'',
        value7:'',
        data: [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        info:{
          id:'',
          name:'',
        }
      }
    },
    methods: {
      selsetchangeTree:function(data,node){
         console.log(data)
          console.log(node)
          let arrnode=this.$refs.tree.getCheckedNodes();
          let name=[];
          console.log(arrnode)
          for(var i=0;i<arrnode.length;i++){
            name.push(arrnode[i].label);
          }
          this.value7=name.toString();
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  components: {
    
  }
}
</script>
<style scoped>
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background:#fff !important;
  }
  .el-select-dropdown__item{
    height:auto;
  }
</style>