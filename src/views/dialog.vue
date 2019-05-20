<template>
    <el-dialog title="手动操作" :visible.sync="dialogInfo.visible" width="460px" v-dialogDrag>
        <el-scrollbar style="height:290px;" class="scrollbar">
            <div class="loncom_public_table" v-loading="loading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <div v-if="ruleForm.model=='1'">
                        <el-form-item label="规则描述" prop="times" size="small">
                            <el-input v-model="ruleForm.times" class="elinput" placeholder="多少分钟监测一下，单位分钟"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-scrollbar>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure()"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from '@/components/dialogBtnInfo.vue'
export default {
    created () {
    },
    mounted() {

    },
    data() {
        let checknumber=(rules,value,callback)=>{
            this.$tool.checkNumber({rules,value,callback})
        };
        return {
            loading:false,
            ruleForm: {
                times:'',
            },
            rules: {
                times: [
                    { required: true, trigger: 'blur' ,validator:checknumber}
                ],
            },
        }
    },
    methods:{
        //保存的操作
        dialogSure:function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.loading=true;
                    this.$api.post('/service/update',this.ruleForm, r => {
                        console.log(r)
                        this.loading=false;
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            this.dialogInfo.visible=false;
                            this.$parent.getList();
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;
        },

    },
    watch:{
        
    },
    components:{dialogBtnInfo},
    props:["dialogInfo"]
}
</script>
<style scoped>
    
</style>
