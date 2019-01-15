import echarts from 'echarts'

function formatDate(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + MM + "-" + d + " ";
}

function formatTime(value) {
  let date = new Date(value);
  // let y = date.getFullYear();
  // let MM = date.getMonth() + 1;
  // MM = MM < 10 ? ('0' + MM) : MM;
  // let d = date.getDate();
  // d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  // alert(h + ':' + m + ':' + s)
  return h + ' : ' + m + ' : ' + s;

}

function translateTime(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  // let s = date.getSeconds();
  // s = s < 10 ? ('0' + s) : s;
  // alert(h + ':' + m + ':' + s)
  return y + "年" + MM + "月" + d + "日 " + h + ':' + m;

}

function Format(value,fmt){
  let date=new Date(value)
  let o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function arrayContains(v,arr){
  if(arr.indexOf(v)==-1){
    return false;
  }else{
    return true;
  }
}

function echartfn(ID,xData,yData){
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(ID))
    // 绘制图表
    myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: yData
        }]
    });
    return myChart;
}

export default {formatDate,formatTime,translateTime,arrayContains,Format,echartfn}