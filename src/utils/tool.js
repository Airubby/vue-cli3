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

function arrayContains(v,arr){
  if(arr.indexOf(v)==-1){
    return false;
  }else{
    return true;
  }
}

var tool = {
  formatDate: formatDate,
  formatTime: formatTime,
  translateTime: translateTime,
  arrayContains:arrayContains
}

export default tool