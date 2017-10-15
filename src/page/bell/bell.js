/**
 * Created by Administrator on 2017/7/25.
 */
import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  template:'<App />',
  components:{
    App
  }
})
