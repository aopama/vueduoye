<template>
    <div id="app">
        <cHead style="background:#008bd9;color:#ffffff;" left="left" right="true" :name="name">
            <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        </cHead>
        <div class="spage">
            <div class="s_title">
              <i class="iconfont icon-danxuan c-green ft-30"></i>
              <span class="s_success ft-30 ft-bold">预约成功!</span>
            </div>
            <div class="s_contetn">
                <div class="s_itme">
                    <span>您预约的体验课时间是 </span>
                    <span>{{time}}</span>
                </div>
                <div class="s_itme">
                    <span>您使用的手机号码</span>
                    <span>{{userobj.data.phone}}</span>
                    <span>登陆乔希家的书在线教育平台<a href="http://vip.chel-c.com" class="c-blue">http://vip.chel-c.com</a>按时上课呦！</span>
                </div>
                <div class="s_itme">
                    <span>上体验课前，请您为孩子调试好耳机、麦克和网络设备，确保能够正常上课。</span>
                </div>
            </div>
            <!-- <div class="interactionbtn" @click="" style="width:7.78rem;margin: 0.4rem auto">
                <button>重新预约</button>
            </div> -->
        </div>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import a from '@/api/api.js'

export default{
    name: 'app',
    data () {
      return {
        name: '预约成功',
        userobj:JSON.parse(localStorage.user),
        time:''
      }
    },
    created () {
        if(!l_search.time){
            console.log(1)
            this.time = '0年0月0日 00：00'
            return
        }
        var times = parseInt(l_search.time)
        times = new Date(times)
        this.time = times.getFullYear()+'年'+(times.getMonth()+1)+'月'+times.getDate()+'日  '+times.getHours()+'：'+(times.getMinutes()<10?'0'+times.getMinutes():times.getMinutes())
    },
    methods: {
      back () {
        history.go(-1);
      }
    },
    components:{
      cHead
    }
}
</script>
<style>
.spage{display:flex;align-items: center;;flex-direction:column;margin-top:1.73rem}
.s_contetn{font-size:0.35rem;padding: 0.93rem;}
.s_contetn .s_itme:not(:first-child){margin-top:0.373rem}
.s_contetn .s_itme span>a{text-decoration: underline;}
.s_title i{color:#55be1c}
</style>
