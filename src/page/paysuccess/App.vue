<template>
  <div id="app">
    <cHead style="background:#008bd9;color:#ffffff;" left="left" right="true" :name="name">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>

    <div class="spage">
      <div class="s_title">
        <i slot="headerLeft" class="iconfont icon-danxuan c-green ft-30"></i>
        <span class="s_success ft-30 ft-bold">支付成功!</span>
      </div>
      <div class="s_contetn">
        <div class="s_itme">
          <p>恭喜你购买成功!请点击制定上课计划按钮或者使用你的手机号{{phone}}登录乔西家的书在线教育平台<a href="http://vip.chel-c.com" class="c-blue">http://vip.chel-c.com</a>制定上课计划,按时上课呦!</p>
          <p class="mt-20">上体验课前，请您为孩子调试好耳机、麦克和网络设备，确保能够正常上课。</p>
        </div>
      </div>
      <div class="interactionbtn" v-if="isline==1" >
        <a :href="url" class="ft-30">立即制定上课计划</a>
      </div>
    </div>
  </div>
</template>
<script>
  import cHead from '@/components/header.vue'

  export default{
    name: 'app',
    data () {
      return {
        name: '支付成功',
        phone:0,
        url: '',
        isline:null
      }
    },
    created () {
      this.phone = unescape(l_search.phone);
      this.url = unescape(l_search.url);
      this.isline = unescape(l_search.isline);
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

  .interactionbtn{width:78.66%;height:1.166rem;text-align: center;line-height: 1.166rem;}
  .interactionbtn a{display:block;width:100%;height: 100%;border:0;background:#008bd9;color:#ffffff;border-radius:.1rem;}
</style>
