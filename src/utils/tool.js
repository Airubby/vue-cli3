import echarts from 'echarts'
import Vue from 'vue'

function Format(fmt,value){
  let date=value?new Date(value):new Date();
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
function wsConnection(sendMsg, callback) {
  try {
      //var SOCKECT_ADDR = "ws://" + url +":"+ port;
      //let host=window.document.location.host;
      //let SOCKECT_ADDR="ws://"+host+"/ws"
      let SOCKECT_ADDR="ws://192.168.16.6:8088/ws"
      let ws = new WebSocket(SOCKECT_ADDR);
      Vue.prototype.$ws=ws;
      ws.onopen = function (event) {
          console.log(event)
          console.log("已经与服务器建立了连接\r\n当前连接状态：" + event);
          ws.send(sendMsg);
      };
    
      ws.onmessage = callback;
      ws.onclose = function (event) {
        console.log(event)
      };
      ws.onerror = function (event) {
        console.log("WebSocket异常！" + event.toString());
      };
      Vue.prototype.$ws=ws;

  } catch (ex) {
      console.log(ex);
  }
}
export default {arrayContains,Format,echartfn,wsConnection}