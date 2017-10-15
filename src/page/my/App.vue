<template>
  <div id="app">
      <div class="personal">
          <div class="personal-info" @click="skipedit()">
            <div class="personal-info-img">
              <img :src="curldizhi+(userobj.data.faceurl?userobj.data.faceurl:(userobj.data.sex=='1'?morennan:morennv))" alt="">
            </div>
            <div class="personal-info-name">
              <p><span class="familyName">{{userobj.data.pname}}</span><i class="iconfont" :class="{'icon-man':userobj.data.sex==1,'icon-nv':userobj.data.sex==2}"></i><span class="family-edit"><i class="iconfont icon-weibiaoti2zhuanhuan"></i></span></p>
              <span class="family-phone">{{userobj.data.phone}}</span>
            </div>
          </div>
      </div>
      <div class="myContent">
        <section class="mt-20">
          <a href="mybaby.html">
              <i class="iconleft iconfont icon-babysay c-orange"></i>
              <span>我的宝贝</span>
              <i class="iconfont icon-youjiantou "></i>
          </a>
        </section>
        <section class="mt-20">
          <a href="classplay.html">
            <i class="iconleft iconfont icon-jiejuefangan c-blue"></i>
            <span>教学方案</span>
            <i class="iconfont icon-youjiantou "></i>
          </a>
        </section>
        <section class="mt-20">
          <a class="border" href="takeclass.html">
            <i class="iconleft iconfont icon-jilu c-green"></i>
            <span>上课记录</span>
            <i class="iconfont icon-youjiantou "></i>
          </a>
          <a href="purchase.html">
            <i class="iconleft iconfont icon-goumaisvg c-pink"></i>
            <span>购买记录</span>
            <i class="iconfont icon-youjiantou "></i>
          </a>
        </section>
        <section class="mt-20">
          <a href="setting.html">
            <i class="iconleft iconfont icon-shezhi c-blue"></i>
            <span>设置</span>
            <i class="iconfont icon-youjiantou "></i>
          </a>
        </section>
      </div>
      <cFooter aclass="my.html"></cFooter>
  </div>
</template>

<script>
import cFooter from '@/components/footer.vue'
import A from '@/api/api.js'

export default {
  name: 'app',
  data () {
    return {
      curldizhi:'',
      userobj: {data:{}},
      morennan:'/themes/simplebootx/Public/img/patriarch_1.png',
      morennv:'/themes/simplebootx/Public/img/patriarch_2.png'
    }
  },
  created:function(){
    this.curldizhi = this.cImgurldizhi;
    if(localStorage.user){
      this.userobj = JSON.parse(localStorage.user)
    }
  },
  methods :{
    skipedit(){
      window.location.href="edit.html"
    }
  },
  components: {
    cFooter
  }
}
</script>

<style>
  html,body{background:#f0f0f0;}
  .myContent{padding-bottom:1.6rem;}
  .personal{position:relative;width:100%;height:5.8rem;background:url('/static/img/mybg.png') no-repeat scroll center center;background-size:100%;}
  .personal .personal-info{display: flex;display:-webkit-flex;align-items: center;display: -webkit-box;display: box;-webkit-box-align: center;padding:.266rem .4rem;position:absolute;bottom:0;width:100%;height:2rem;background:-webkit-linear-gradient(top,rgba(255,255,255,0), rgba(0,0,0,1));}
  .personal .personal-info .personal-info-img{width:1.333rem;height:1.333rem;margin-right:.266rem;border-radius: 100%;overflow: hidden;}
  .personal .personal-info .personal-info-img img{width:100%;}

  .personal .personal-info .personal-info-name{color:#ffffff;flex:1;}
  .personal .personal-info .personal-info-name p{display: flex;display:-webkit-flex;align-items: center;display: -webkit-box;display: box;-webkit-box-align: center;}
  .personal .personal-info .personal-info-name p>.iconfont{margin:0 .266rem;font-size:.3rem;}
  .personal .personal-info .personal-info-name p .familyName{font-size:.453rem;display: block;max-width: 3rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .personal .personal-info .personal-info-name p .icon-man{color:#42bef4;}
  .personal .personal-info .personal-info-name p .icon-nv{color:#ff4a64;}
  .personal .personal-info .personal-info-name p .family-edit{display:block;width:.6rem;height:.6rem;border-radius:100%;background:rgba(0,0,0,0.7);text-align:center;line-height:.6rem;}
  .personal .personal-info .personal-info-name p .family-edit i{font-size:.4rem;}
  .personal .personal-info .personal-info-name .family-phone{font-size:.346rem;}

  .myContent{}
  .myContent section{}
  .myContent section a{display:box;display:-webkit-box;-webkit-box-align:center;display:flex;display:-webkit-flex;align-items:Center;padding:.4rem;background:#ffffff;}
  .myContent section a.border{border-bottom:1px solid #f0f0f0;}
  .myContent section a .iconfont{font-size:.5rem;display:block}
  .myContent section a .iconfont.iconleft{margin-right:.26rem;}
  .myContent section a .iconfont.icon-youjiantou{color:#afafaf;}
  .myContent section a span{font-size:.4rem;flex: 1;color:#000000;display: block;}
</style>
