// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../../static/css/animate.css'
import Path from 'path'
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.config.productionTip = false

/* eslint-disable no-new */
const v = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

window['jsApiParameters'] = null;
window['jsApiCall'] = function() {
  WeixinJSBridge.invoke('getBrandWCPayRequest',{jsApiParameters},function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok"){
        //支付成功，调成功后的代码及接口
        Mint.Toast("支付成功")
        setTimeout(function(){
          window.location.assign('login.html?reg=buyscheme');
        },2000)
      }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
        Mint.Toast("您已取消支付!")
      }else{
        Mint.Toast("支付失败,请联系客服400-663-8899!")
      }
    }
  );
}
window['callpay'] = function() {
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', jsApiCall);
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    }
  }else{
    jsApiCall();
  }
}
