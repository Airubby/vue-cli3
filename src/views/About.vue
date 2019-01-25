<template>
    <div class="content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span @click="reloadPage"><router-link to="/about">About</router-link></span> | 
      <router-link to="/test">Test</router-link>
    </div>
    <div style="width: 100%; height:calc(100% - 80px)">
    <el-scrollbar style='height:100%;' class="scrollbar">
        <div class="about" style="padding-bottom:300px;">
            <!--
                <img alt="Vue logo" src="~@/assets/images/logo.png">
                <img alt="Vue logo" :src="require('@/'+imgurl)">
            -->
            <img alt="Vue logo" :src="require('@/assets/images/'+$theme+'/logo.png')" v-if="$theme">
            <nav-info></nav-info>
            <hr>
            <el-search-table-pagination  type="local"
                ref="multipleTable"
                list-field="list" 
                total-field="total"
                @selection-change="handleSelectionChange"
                @resultData="resultData1"
                :showIndex="true"
                :page-sizes="[2,20,30]"
                border :data="table_data1" :columns="table_columns">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                
                <template slot-scope="scope" slot="preview-handle">
                    
                </template>
            </el-search-table-pagination>
            <hr>
            <el-search-table-pagination
                :url="$ajaxUrl+'/getData'"
                list-field="data" 
                total-field="total"
                :page-sizes="[2,20,30]"
                method='get' 
                :showPagination="false"
                border :webSocketInfo="table_data" @resultData="resultData" :columns="table_columns" ref="thisRef">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <el-table-column slot="prepend" type="index" label="序号"></el-table-column>
                <template slot-scope="scope" slot="preview-handle">
                    <span @click="postFn">post提交</span>
                </template>
            </el-search-table-pagination>
            <hr>
            <div :class="sex|showClass">{{ emptyTitle|empty('如果emptyTitle为空就显示这个,根据sex为不同给定不同的class样式') }}</div>
            <hr>
            {{sex|sexFilter}}----------------------------后台传入的是 1 表示男
            <hr>
            {{date}} | {{fDate}} | {{new Date(date).Format('yyyy-MM-dd hh:mm')}} | {{$tool.Format('yyyy-MM-dd hh:mm:ss',date)}}
            <hr>
            <el-checkbox-group v-model="checkList">
                <template v-for="inItem in answers">
                <el-checkbox :disabled="disabled" :class="{'acheck':correct && $tool.arrayContains(inItem.no,correctList)}" :label="inItem.no" :value="inItem.no" :key="inItem.no">{{inItem.answer}}</el-checkbox>
                </template>
            </el-checkbox-group>
            <el-button @click="clickbtn" size="small">禁用</el-button>
            <hr>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="user" prop="user">
                            <el-input v-model="ruleForm.user"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="端口" prop="port">
                            <el-input v-model="ruleForm.port"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <hr>
            <div id="swiper-container" class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style="width:300px">Slide 1</div>
                    <div class="swiper-slide" style="width:300px">Slide 2</div>
                    <div class="swiper-slide" style="width:300px">Slide 3</div>
                    <div class="swiper-slide" style="width:300px">Slide 11</div>
                    <div class="swiper-slide" style="width:300px">Slide 21</div>
                    <div class="swiper-slide" style="width:300px">Slide 31</div>
                </div>
                <!-- 如果需要导航按钮 -->
                <div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            <hr>

        </div>
    </el-scrollbar>
    </div>
    <webSocket :wsInfo="table_data" sendInfo="alarm"></webSocket>
    <webSocket :wsInfo="table_data1" sendInfo="sysinfo"></webSocket>
  </div>
</template>
<script>
import * as API from '@/api/testApi';
import webSocket from '@/components/webSocket.vue'
export default {
    name:'About',
    inject:['reload'],
    created () {
        console.log(this.$theme)
        // this.$api.get('/getData', {}, r => {
        //     console.log(r)
        //     if(r.code==200){
        //         this.table_data1=r.data;
        //     }else{
        //         this.$message.warning(r.err_msg);
        //     }
        // });

        this.date=new Date();
        this.fDate=this.$tool.Format('yyyy年MM月dd日');
        API.getTest({name:"123"}).then(res=> {
            console.log(res)
            if(res.code==200) {
                this.table_data1=res.data;
                this.finish=true;
            }else{
                this.$message.warning(res.msg);
            }
        })
        //mock本地数据，开发环境的前缀url设置为空，
        // API.getMock({name:"mock"}).then(res=> {
        //     console.log(res)
        //     if(res.code==200) {
        //         this.table_data1=res.data;
        //     }else{
        //         this.$message.warning(res.msg);
        //     }
        // })
    },
    mounted() {
        new this.$Swiper('#swiper-container', {
            // autoplay: false,//可选选项，自动滑动
            slidesPerView: 'auto',
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // slidesPerView: 3,
        })
    },
    data() {
        let checkuser=(rules,value,callback)=>{
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                if(this.ruleForm.id==""){
                    this.$api.get('/checkuser', {"user":value}, r => {
                        console.log(r)
                        if(r.err_code){
                            callback();
                        }else{
                            callback(r.err_msg);
                        }
                    });
                }else{
                    callback();
                }
            }
        };
        // let checkport=(rules,value,callback)=>{//转换函数，主要目的是传给store内方法的参数。
        //     this.$store.dispatch('checkPORT',{rules,value,callback})//这儿的checkPORT是写在store中的checkPORT，vuex规定参数必须传对象。
        // };
        let checkport=(rules,value,callback)=>{
            this.$tool.checkPORT({rules,value,callback})
        };
        return {
            imgurl:'assets/images/logo.png',
            checkList:[],
            table_data:[],
            table_data1:[],
            table_forms: {
                inline: true,
                size:'small',
                forms: [
                    // { prop: 'fname', label: '',placeholder:'名称' },
                ]
            },
            table_columns:[
              { prop: 'name', label: '名称',minWidth:10},
              { prop: 'content', label: '内容',minWidth:10},
              { prop: 'value', label: '值',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            emptyTitle:"管道empty，如果为空就显示管道empty()中的值",
            sex:1,
            date:'',
            fDate:'',
            FDate:'',
            answers:[{no:"A",answer:'复选框 A'},{no:"B",answer:'复选框 B'},{no:"C",answer:'复选框 C'},{no:"D",answer:'复选框 D'}],
            correctList:['A','B'],
            correct:true,
            disabled:false,
            ruleForm:{
                id:'1',
                user:'',
                port:'',
            },
            rules:{
                user:[{ required: true,  trigger: 'change',validator:checkuser }],
                port:[{required:true,trigger:'change',validator:checkport}]
            },
            multipleSelection:[],  //table勾选的
            finish:false,//  判断table是否获取成功，监听成功了设置初始化需要勾选的

       }
    },
    methods:{
        handleSelectionChange:function(val){
            console.log(val)
            this.multipleSelection=[];
            for(let i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
        clickbtn:function(){
            this.disabled=true;
        },
        postFn:function(){
            API.postTest({name:'test',value:'342'}).then(res=> {
                console.log(res)
                if(res.code==200) {
                    this.table_data=res.data;
                }else{
                    this.$message.warning("错误");
                }
            })
        },
        reloadPage:function(){
            this.reload();
        },
        resultData:function(value){
            console.log(value)
            this.table_data=value.data;
            let arr=['2','3']; //需要勾选的
            this.$nextTick(function(){
                for(let i=0;i<this.table_data.length;i++){
                    if(arr.toString().indexOf(this.table_data[i].id)!= -1){
                        this.$refs.thisRef.$refs.table.toggleRowSelection(this.table_data[i],true); 
                    }
                }
            })
        },
        resultData1:function(value){
            console.log(value)
            let arr=['2','3']; //需要勾选的
            this.$nextTick(function(){
                for(let i=0;i<this.table_data1.length;i++){
                    if(arr.toString().indexOf(this.table_data1[i].id)!= -1){
                        this.$refs.multipleTable.$refs.table.toggleRowSelection(this.table_data1[i],true); //封装后~~
                    }
                }
            })
        },
    },
    watch:{
        finish:function(val){
            let arr=['2','3']; //需要勾选的
            this.$nextTick(function(){
                for(let i=0;i<this.table_data1.length;i++){
                    if(arr.toString().indexOf(this.table_data1[i].id)!= -1){
                        //this.$refs.multipleTable.toggleRowSelection(this.table_data1[i],true); //原生element-table
                        this.$refs.multipleTable.$refs.table.toggleRowSelection(this.table_data1[i],true); //封装后~~
                    }
                }
            })
        }
    },
    components:{webSocket}
}
</script>

<style scoped lang="less">
    hr{
        margin:15px 0;
    }
    .logo{
        // background:url("~@/assets/images/logo.png") no-repeat;
    }
    .swiper-container{
        width: 1000px;
        margin: 0 auto;
        height:200px;
        padding: 0 70px;
    }
    
    
</style>