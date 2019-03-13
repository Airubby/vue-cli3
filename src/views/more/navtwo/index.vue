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
    <hr>
    <h2>自定义滚动</h2>
    <div style="width:650px;margin:0 auto;">
        <el-search-table-pagination  type="local"
          v-scrollBar="'table'"
            border :data="table_data" :columns="table_columns">            
        </el-search-table-pagination>
        <div class="home" v-scrollBar>
            <ul class="list">
              <li>巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉</li>
              <li>炫光舞法</li>
              <!--想想这里有一堆li-->
              <li>天舞台</li>
            </ul>
        </div>
      </div>
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
        },
        table_data:[
          {name:"发生的楼房十六分",content:"爱上了对方就是浪费",value:'123123123',
          name1:"发生的楼房十六分",content1:"爱上了对方就是浪费",value1:'123123123',
          name2:"发生的楼房十六分",content2:"爱上了对方就是浪费",value2:'123123123'},
          {name:"发生的楼房十六分",content:"爱上了对方就是浪费",value:'123123123',
          name1:"发生的楼房十六分",content1:"爱上了对方就是浪费",value1:'123123123',
          name2:"发生的楼房十六分",content2:"爱上了对方就是浪费",value2:'123123123'},
          {name:"发生的楼房十六分",content:"爱上了对方就是浪费",value:'123123123',
          name1:"发生的楼房十六分",content1:"爱上了对方就是浪费",value1:'123123123',
          name2:"发生的楼房十六分",content2:"爱上了对方就是浪费",value2:'123123123'},
        ],
        table_columns:[
          { prop: 'name', label: '名称',width:"100px"},
          { prop: 'content', label: '内容',width:"100px"},
          { prop: 'value', label: '值',width:"100px"},
          { prop: 'name1', label: '名称',width:"100px"},
          { prop: 'content1', label: '内容',width:"100px"},
          { prop: 'value1', label: '值',width:"100px"},
          { prop: 'name2', label: '名称',width:"100px"},
          { prop: 'content2', label: '内容',width:"100px"},
          { prop: 'value2', label: '值',width:"100px"},
        ],
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
  .home{width:200px;height:50px;margin:0 auto;}
  .list{
          display: inline-flex;
  }
  .list li{
    width: 80px;
    float:left;
  }
</style>