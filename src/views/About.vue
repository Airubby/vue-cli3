<template>
    <div class="content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span @click="reloadPage"><router-link to="/about">About</router-link></span> | 
      <router-link to="/test">Test</router-link>
    </div>
    <el-scrollbar style="height:calc(100% - 80px);" class="loncom_scrollbar">
        <div class="about" style="padding-bottom:300px;">
            <!--<img alt="Vue logo" src="~@/assets/images/logo.png">-->
            <img alt="Vue logo" :src="require('../assets/images/'+$theme+'_logo.png')">
            <nav-info></nav-info>
            <hr>
            <el-search-table-pagination  type="local"
                url=""
                list-field="list" 
                total-field="total"
                method='post' 
                :showIndex="true"
                :page-sizes="[2,20,30]"
                border :data="table_data1" :columns="table_columns" ref="thisRef">   
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
                border :webSocketInfo="table_data" @resultData="resultData" :columns="table_columns" ref="thisRef">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <el-table-column slot="prepend" type="index" label="序号"></el-table-column>
                <template slot-scope="scope" slot="preview-handle">
                    <span @click="postFn">post提交</span>
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
                <template v-for="inItem in answers">
                <el-checkbox :disabled="disabled" :class="{'acheck':correct && $tool.arrayContains(inItem.no,correctList)}" :label="inItem.no" :value="inItem.no" :key="inItem.no">{{inItem.answer}}</el-checkbox>
                </template>
            </el-checkbox-group>
            <el-button @click="clickbtn" size="small">禁用</el-button>
            <hr>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="端口" prop="port">
                    <el-input v-model="ruleForm.port"></el-input>
                </el-form-item>
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
    <webSocket :wsInfo="table_data1"></webSocket>
    <webSocket :wsInfo="table_data"></webSocket>
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
        this.fDate=this.$tool.formatDate(this.date);
        API.getTest({name:"123"}).then(res=> {
            console.log(res)
            if(res.code==200) {
                this.table_data1=res.data;
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
        let checkport=(rules,value,callback)=>{//转换函数，主要目的是传给store内方法的参数。
            this.$store.dispatch('checkPORT',{rules,value,callback})//这儿的checkPORT是写在store中的checkPORT，vuex规定参数必须传对象。
        };
        return {
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
            answers:[{no:"A",answer:'复选框 A'},{no:"B",answer:'复选框 B'},{no:"C",answer:'复选框 C'},{no:"D",answer:'复选框 D'}],
            correctList:['A','B'],
            correct:true,
            disabled:false,
            ruleForm:{
                port:'',
            },
            rules:{
                port:[{required:true,trigger:'blur',validator:checkport}]
            }


       }
    },
    methods:{
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
       },
    },
    watch:{

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