<template>
    <div class="content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test">Test</router-link> | 
      <router-link to="/more">More</router-link>
    </div>
    <el-scrollbar style="height:calc(100% - 80px);" class="loncom_scrollbar">
        <div class="about" style="padding-bottom:300px;">
            <div class="img"></div>
            <nav-info></nav-info>
            <hr>
            const cats = [
                { name: 'Mojo',    months: 84 },
                { name: 'Mao-Mao', months: 34 },
                { name: 'Waffles', months: 4 },
                { name: 'Pickles', months: 6 }
            ]
            <br>
            不用for循环找出months小于7的cat
            <hr>
            <el-search-table-pagination  type="local"
                url=""
                list-field="list" 
                total-field="total"
                method='post' 
                :showIndex="true"
                :page-sizes="[2,20,30]"
                border :data="table_data" :columns="table_columns" ref="thisRef">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                
                <template slot-scope="scope" slot="preview-handle">
                    
                </template>
            </el-search-table-pagination>
            <hr>
            <el-row :gutter="100">
                <el-col :span="12"><div id="myChart" :style="{width: '100%', height: '300px'}"></div></el-col>
                <el-col :span="12"><div id="myChart1" :style="{width: '100%', height: '300px'}"></div></el-col>
            </el-row>
            <hr>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city.value" :key="city.value" :disabled="city.dis">{{city.name}}</el-checkbox>
            </el-checkbox-group>
            <hr>
        </div>
    </el-scrollbar>
    <webSocket :wsInfo="table_data" sendInfo="sysinfo"></webSocket>
  </div>
</template>
<script>
import webSocket from '@/components/webSocket.vue'
import * as API from '@/api/testApi';
export default {
    created () {
        API.getTest({name:"123"}).then(res=> {
            console.log(res)
            if(res.code==200) {
                this.table_data=res.data;
            }else{
                this.$message.warning(res.msg);
            }
        })
    },
    mounted() {
        let _this=this;
        const cats=[
            { name: 'Mojo',    months: 84 },
            { name: 'Mao-Mao', months: 34 },
            { name: 'Waffles', months: 4 },
            { name: 'Pickles', months: 6 }
        ];
        let kittens=[];
        //函数式编程求months小于7的cat
        const isKitten=cat=>cat.months<7;
        const getName=cat=>cat.name;
        const getKittenNames = cats =>cats.filter(isKitten).map(getName)
        kittens = getKittenNames(cats)
        //for循环求months小于7的cat
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].months<7) {
                kittens.push(cats[i].name);
            }
        }
        console.log(kittens)
        this.drawLine();
        let myChart=this.$tool.echartfn('myChart',["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],[5, 20, 36, 10, 10, 20]);
        console.log(myChart)
        window.onresize=function(){
            myChart.resize();
            _this.myChart1.resize();
        }
    },
    data() {
        return {
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
              { prop: 'content', label: '内容',minWidth:10},
              { prop: 'value', label: '值',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            myChart1:'',
            checkAll: false,
            checkedCities: [],
            cities: [
                {name:'上海',value:'上海',dis:false},
                {name:'北京',value:'北京',dis:false},
                {name:'广州',value:'广州',dis:true},
                {name:'深圳',value:'深圳',dis:false}
            ],
            isIndeterminate: false
       }
   },
    methods:{
        drawLine(){
            this.myChart1=this.$tool.echartfn('myChart1',["衬衫1","羊毛衫1","雪纺衫1","裤子1","高跟鞋1","袜子1"],[15, 25, 16, 20, 40, 20]);
        },
        handleCheckAllChange(val) {
            let arr=[];
            for(let i=0;i<this.cities.length;i++){
                if(!this.cities[i].dis){
                    arr.push(this.cities[i].value);
                }
                
            }
            this.checkedCities = val ? arr : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }

    },
    components:{webSocket}
}
</script>

<style scoped lang="less">
    @import "~@/assets/css/test.less";
</style>