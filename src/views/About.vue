<template>
  <div class="about">
    <el-search-table-pagination  type="local"
        url=""
        list-field="list" 
        total-field="total"
        method='post' 
        :formOptions="table_forms"
        border :data="table_data" :columns="table_columns" ref="thisRef">   
        <el-table-column slot="prepend" type="selection"></el-table-column>
        <template slot-scope="scope" slot="preview-handle">
            <div>
                <a href="javascript:;" class="loncom_color" @click="edit (scope.row)" v-if="$store.state.record_pool.edit">编辑</a> 
                <em v-if="$store.state.record_pool.edit&&$store.state.record_pool.remove">|</em>
                <a href="javascript:;" class="loncom_color" @click="remove (scope.row)" v-if="$store.state.record_pool.remove">删除</a> 
            </div>
        </template>
    </el-search-table-pagination>
  </div>
</template>
<script>
export default {
    created () {
        this.$api.post('/scinfo/query', {}, r => {
            console.log(r)
            if(r.err_code=="0"){
                this.table_data=r.data;
            }else{
                this.$message.warning(r.err_msg);
            }
        });
    },
    mounted() {
    },
    data() {
       return {
          　table_data:[{code:"测试一"},{code:"测试34"}],
            table_forms: {
                inline: true,
                size:'small',
                forms: [
                    // { prop: 'fname', label: '',placeholder:'名称' },
                ]
            },
            table_columns:[
              { prop: 'code', label: '池塘编码',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            


       }
   },
    methods:{
       
    },
    components:{}
}
</script>