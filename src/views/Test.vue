<template>
    <div class="content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test">Test</router-link>
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
            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            <hr>
        </div>
    </el-scrollbar>
    <webSocket :wsInfo="table_data"></webSocket>
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
       }
   },
    methods:{
       drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }

    },
    components:{webSocket}
}
</script>

<style scoped lang="less">
    @import "~@/assets/css/test.less";
</style>