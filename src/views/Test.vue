<template>
    <div class="content">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test">Test</router-link>
    </div>
    <el-scrollbar style="height:calc(100% - 80px);" class="loncom_scrollbar">
        <div class="about" style="padding-bottom:300px;">
            const cats = [
                { name: 'Mojo',    months: 84 },
                { name: 'Mao-Mao', months: 34 },
                { name: 'Waffles', months: 4 },
                { name: 'Pickles', months: 6 }
            ]
            <br>
            不用for循环找出months小于7的cat
            <hr>
            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            <hr>
        </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
    created () {
        
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
    components:{}
}
</script>

<style scoped lang="less">
    hr{
        margin:15px 0;
    }
    
</style>