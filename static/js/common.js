document.oncontextmenu=function(){return false};
document.onselect=function(){return false};
(function(num){
	function remFn() {
      var c = document.documentElement.clientWidth / num;
      if(c<64){
        document.documentElement.style.fontSize =  c + 'px';
      }else{
        document.documentElement.style.fontSize =  '75px';
      }
	}
	window.addEventListener('resize',remFn,false);
	remFn();
})(10);

(function(w){
  var O = {};
  O['num'] = function(n){
    if(n<10){
      return '0'+n;
    }else{
      return n;
    }
  }
  O['date'] = function(param) {
    var Y = param.getFullYear();
    var M = O['num'](param.getMonth()+1);
    var D = O['num'](param.getDate());
    var H = O['num'](param.getHours());
    var Mm = O['num'](param.getMinutes());
    var S = O['num'](param.getSeconds());
    return Y+'-'+M+'-'+D+' '+H+':'+Mm+':'+S;
  }
  O.trim = function (v) {
    return v.replace(/(^\s+)|(\s+$)/g,'');
  }

  window['c_mobile'] = O;
})(window)

//获取?后面的查询部分
var l_search = (function(){
  var O = {},S = location.search.slice(1).split('&');
  for(var i=0;i< S.length;i++){
    var q = S[i].split('=');
    O[q[0]] = q[1];
  }
  return O;
})()

//缓存数据
var dataCache = {
    cache:{}, //课程体系缓存
    formulate:{},  //制定上课计划缓存
    buyCache:{}   //购买缓存
}
