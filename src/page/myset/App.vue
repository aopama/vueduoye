<template>
    <div id="app">
        <cHead style="background:#008bd9;color:#ffffff;" left="left" right="true" :name="name">
            <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
            <a slot="headerRight" class="formulate" >完成</a>
        </cHead>
        <div class="m_content" style="padding-top:1.22rem;">
            <span class="m_title">头像</span>
            <div class="m_tx">
                <div class="m_img">
                    <img src="./title.jpg" alt="">                   
                </div>
                 <span class="m_djsc">点击上传</span>
            </div>
            <span class="m_title">昵称</span>
            <div class="m_nc">
                <span class="m_name">小飞飞</span>
                <i slot="headerLeft" class="iconfont icon-guanbi"></i>
            </div>
            <span class="m_title">性别</span>
            <div class="m_sex bg-white">
                <span class="radio_group">
                  <input type="radio" name="online" id="online" value='1' checked/>
                  <label for="online">男</label>
                </span>
                <span class="radio_group ml-50">
                  <input type="radio" name="online" id="offline" value='2'/>
                  <label for="offline">女</label>
                </span>
            </div>
            <div class="interactionbtn" @click="">
                <button>完成</button>
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
        name: '个人资料'
      }
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
img{width:100%;height:100%}
.m_title{font-size:0.32rem;display:block;padding: 0.293rem 0.4rem;}
.m_img{width:1.333rem;height:1.333rem;cursor: pointer;}
.m_tx{display:flex;align-items: center;padding: 0.466rem 0.4rem;background-color: #fff;}
.m_tx .m_djsc{font-size:0.32rem;color:#808080;margin-left:0.4rem}

.m_nc{display:flex;align-items: center;justify-content:space-between;padding:0.4rem;background:#fff;}
.m_nc .m_name{font-size:0.4rem}
.m_nc i{color:#aaa;font-size:0.4rem;}

.m_sex{display:flex;padding:0.4rem}
</style>
