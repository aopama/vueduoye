<template>
    <div id="app">
        <cHead left="left" right="true" :name="name">
            <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        </cHead>
        <div class="s_content" style="padding-top:1.2rem;">
            <!--<div class="s_item mt-20">-->
              <!--<a href="">-->
                <!--<span class="s_title">关于乔希教育</span>-->
                <!--<i slot="headerLeft" class="iconfont icon-youjiantou"></i>-->
              <!--</a>-->
            <!--</div>-->
            <div class="s_item mt-20">
              <a href="login.html#editpaword">
                <span class="s_title">修改密码</span>
                <i slot="headerLeft" class="iconfont icon-youjiantou"></i>
              </a>
            </div>
            <div class="s_item s_quit" @click="tuichu">
                <span class="s_txt">退出当前账号</span>
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
        name: '设置'
      }
    },
    methods: {
      back () {
        history.go(-1);
      },
      tuichu () {
        delete localStorage.user;
        location.assign('login.html')
      }
    },
    components:{
      cHead
    }
}
</script>
<style>
body{background: #f0f0f0}
.s_content .s_item{background-color: white;padding:0.4rem;}
.s_content .s_item>a{color:#000000;display:block;width:100%;height: 100%;display: flex;align-items: center;justify-content: space-between;}
.s_content .s_item .s_title{font-size: 0.4rem}
.s_content .s_quit{margin-top: 1.3rem;display: flex;align-items: center;justify-content: center;font-size: 0.4rem;color:#ff5f49}
</style>
