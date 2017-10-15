<template>
    <div id="app">
      <cHead left="left" :name="data.e_name">
        <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        <!-- <a slot="heaerRight" class="formulate" >添加</a> -->
      </cHead>
      <div class="datu" :style="'background:url('+Imageurl+data.face+') no-repeat;'">
        <!-- <img src="static/img/teacher.png"> -->
      </div>
      <div v-if="play">
        <div class="detailsbg"></div>
        <ul class="details">
          <li v-text="'老师姓名：'+data.e_name"></li>
          <li v-text="'老师简介：'+data.introduction2"></li>
          <li v-text="'学员人数：'+data.count+'人 还可接收：'+data.count1+'人'"></li>
        </ul>
        <i @click="videoPlay" class="iconfont icon-bofang videobtn" v-if="data.videos&&play"></i>
      </div>
      <div class="videobg" v-show="!play" :style="css">
        <video :src="data.videos" controls ref="video" preload="auto" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true"></video>
      </div>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import { Indicator } from 'mint-ui'
import { my_teacher_xp } from '@/api/api.js'

export default{
    name: 'app',
    data () {
      return {
        Imageurl:'',
        play:true,
        css:{
          background:'#000000'
        },
        data:{}
      }
    },
    created () {
      this.Imageurl = this.cImgurldizhi;
      this.getData();
    },
    methods: {
      back () {
        history.go(-1);
      },
      getData () {
        const tid = l_search.familyid;
        my_teacher_xp({ tid }).then( res => {
          var result = res.data;
          this.data = result;
          this.$nextTick(()=>{
            this.$refs.video.load();
            this.$refs.video.addEventListener('pause',()=>{
              this.play = true;
            })
          })
        })
      },
      videoPlay () {
        this.play = false;
        this.$refs.video.play();
      }
    },
    components:{
      cHead
    }
}
</script>
<style>
html,body,#app{background:#f0f0f0;width: 100%;height: 100%;overflow: hidden;}
.datu{background: white;height: calc(100% - 1.2rem);text-align: center;margin-top: 1.2rem;background: url(/static/img/teacher.png) no-repeat center center;background-size:100% auto!important;}
/*.datu>img{height: 100%;}*/
.detailsbg{height: 8rem;width: 100%;position: fixed;z-index: 3;bottom: 0;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));}
.details{position:fixed;z-index: 5;bottom: 0;font-size: 0.4rem;color: white;margin: 0.4rem;}
.details li{margin-top: 0.28rem;line-height: 0.48rem;}
.videobtn{position: fixed;z-index: 9;top:50%;left:50%;color: white;font-size:2.2rem;transform:translate(-50%,-50%);}
.videobg{position: fixed;top:0;left: 50%;transform: translateX(-50%);width:100%;height: 100%;}
.videobg video{width: 100%;height: 100%;}
</style>
