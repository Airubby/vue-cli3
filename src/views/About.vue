<template>
  <div class="about" style="padding-bottom:300px;">
    <img alt="Vue logo" src="~@/assets/images/logo.png">
    <el-search-table-pagination  type="local"
        url=""
        list-field="list" 
        total-field="total"
        method='post' 
        :page-sizes="[1,2,3]"
        border :data="table_data" :columns="table_columns" ref="thisRef">   
        <el-table-column slot="prepend" type="selection"></el-table-column>
        <template slot-scope="scope" slot="preview-handle">
            
        </template>
    </el-search-table-pagination>
    <hr>
    <el-search-table-pagination
        :url="$ajaxUrl+'/getData'"
        list-field="data" 
        total-field="total"
        method='get' 
        border :columns="table_columns" ref="thisRef">   
        <el-table-column slot="prepend" type="selection"></el-table-column>
        <template slot-scope="scope" slot="preview-handle">
            
        </template>
    </el-search-table-pagination>
    <hr>
    <div>{{ emptyTitle|empty('如果emptyTitle为空就显示这个') }}</div>
    <hr>
    {{sex|sexFilter}}----------------------------后台传入的是 1 表示男
    <hr>
    {{date}} | {{fDate}} | {{new Date(date).Format('yyyy-MM-dd hh:mm')}}
    <hr>
    <el-checkbox-group v-model="checkList">
        <span v-for="inItem in answers"><el-checkbox :disabled="disabled" :class="{'acheck':correct && $tool.arrayContains(inItem.no,correctList)}" :label="inItem.no" :value="inItem.no" :key="inItem.no">{{inItem.answer}}</el-checkbox></span>
    </el-checkbox-group>
    <el-button @click="clickbtn" size="small">禁用</el-button>
    <hr>
  </div>
</template>
<script>
export default {
    created () {
        this.$api.get('/getData', {}, r => {
            console.log(r)
            if(r.code==200){
                this.table_data=r.data;
            }else{
                this.$message.warning(r.err_msg);
            }
        });
        this.date=new Date();
        this.fDate=this.$tool.formatDate(this.date);
    },
    mounted() {
        
    },
    data() {
       return {
           checkList:[],
          　table_data:[],
            table_forms: {
                inline: true,
                size:'small',
                forms: [
                    // { prop: 'fname', label: '',placeholder:'名称' },
                ]
            },
            table_columns:[
              { prop: 'name', label: '名称',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            emptyTitle:"管道empty，如果为空就显示管道empty()中的值",
            sex:1,
            date:'',
            fDate:'',
            answers:[{no:"A",answer:'复选框 A'},{no:"B",answer:'复选框 B'},{no:"C",answer:'复选框 C'},{no:"D",answer:'复选框 D'}],
            correctList:['A','B'],
            correct:true,
            disabled:false,


       }
   },
    methods:{
       clickbtn:function(){
           this.disabled=true;
       }
    },
    components:{}
}
</script>

<style scoped lang="less">
    hr{
        margin:15px 0;
    }
    .logo{
        // background:url("~@/assets/images/logo.png") no-repeat;
    }
    
    
</style>