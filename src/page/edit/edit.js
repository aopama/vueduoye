/**
 * Created by Administrator on 2017/7/28.
 */
import Vue from 'vue';
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);


new Vue({
  el: '#app',
  template: '<App />',
  components:{
    App
  }
})
