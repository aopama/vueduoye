/**
 * Created by Administrator on 2017/7/26.
 */
import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);

Vue.directive('countdown',{
  inserted:function(el, binding){
      function g0(d) {
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
      }
      var d = new Date();
      var o = new Date(binding.value);
      var maxDate = c_mobile['date'](o);
      g0(d);g0(o);
      var nowDayTime = 86400000;  //1天的毫秒
      var timer = null;
      if (o - d >= nowDayTime) {
        el.innerHTML = maxDate;
        //el.innerHTML = (o - d) / nowDayTime + '天后上课!';
      } else {
        o = new Date(binding.value);
        if(binding.modifiers.y){
          el.className = 'c-red y';
        }else{
          el.className = 'c-red';
        }
        timer = setInterval(function () {
          d = new Date();
          var num = o - d;
          if (num <= 0) {
            clearInterval(timer);
            el.innerHTML = '00:00:00'
          } else {
            var hours = parseInt(num / 3600000);
            var Minute = parseInt((num % 3600000) / 60000);
            var Second = parseInt(((num % 3600000) % 60000) / 1000);
            el.innerHTML = c_mobile.num(hours) + ':' + c_mobile.num(Minute) + ':' + c_mobile.num(Second);
          }
        })
      }
    }
})

new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }
})
