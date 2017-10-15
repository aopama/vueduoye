<template>
  <div id="app">
    <cHead :name="name" style="background:#ffffff;color:#000000;">
      <div slot="headtoplogo" class="headtoplogo">
        <img src="static/img/indexlogo.png" class="z">
        <p class="z">CHEL-C READING CLUB<br/>纯英文专家领读阅读中心</p>
      </div>
    </cHead>
    <cFooter aclass="index.html"></cFooter>
    <div class="appContent">
      <!--图片切换 start-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bannerList">
            <a :href="item.slide_url">
              <img :src="Imageurl+item.slide_pic" alt="">
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!--图片切换 end-->
      <!--公告start-->
      <div class="notice">
        <div class="noticeIcon">
          <i class="iconfont icon-laba"></i>
          公告:
        </div>
        <div class="noticeContent" ref="notice">
          <ul>
            <li v-for="item in publicData">{{item}}</li>
            <li v-if="publicData.length===0">暂无数据</li>
          </ul>
        </div>
      </div>
      <!--公告end-->
      <div class="daiban-kechen">
        <!--待办事项start-->
        <needDealt selfClass="needDealt" name="课程体系">
          <!--<ul>-->
          <!--<li><p>您有一个体验课红包尚未使用</p><a class="orange" href="">预约</a></li>-->
          <!--<li><p>您有一个体验课红包您有一个体验课红包尚未使用尚未使用</p><a class="blue" href="">购买</a></li>-->
          <!--</ul>-->
          <a :href="'system.html?bigType='+item.id" class="needItem" v-for="item in classType" :data-id="item.id">
            <div class="needItem-left">
              <img :src="Imageurl+item.img" alt="">
            </div>
            <div class="needItem-right">
              <h3 v-text="item.name"></h3>
              <p  v-text="item.summary"></p>
            </div>
          </a>
          <p v-if="classType.length===0" class="text-c ft-20">暂无数据</p>
        </needDealt>
        <!--待办事项end-->
        <!--精选课程start-->
        <needDealt selfClass="jinxuankechen" name="我们的老师">
          <a href="ourteacher.html" class="needItem mb-20">
            <div class="needItem-left">
              <img src="static/img/myfamily.png" alt="">
            </div>
            <div class="needItem-right">
              <h3>我们的老师</h3>
              <p v-text="this.family"></p>
            </div>
          </a>
        </needDealt>
        <!--精选课程end-->
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import cHead from '@/components/header.vue'
  import cFooter from '@/components/footer.vue'
  import needDealt from '@/page/index/component/drenwu.vue'
  import { index } from '@/api/api.js'

  export default {
    name: 'app',
    data () {
      return {
        Imageurl:'',
        name:'',
        bannerList: [], //banner数据
        publicData: [], //公共数据
        classType: [],   //课程体系
        family: ''
      }
    },
    created () {
      this.Imageurl = this.Imgurldizhi;
      this.getData();
    },
    methods: {
      getData () {
        Indicator.open();
        index().then(res => {
          Indicator.close();
          const result = res.data;
          this.bannerList = result.slide;
          this.publicData = result.bbs;
          this.classType = result.bigtype;
          this.family = result.myteacher;
          this.$nextTick(() => {
            this.playBanner();
            this.playNotice();
          })
        }, () => {
          Indicator.close();
        });
      },
      playBanner () {
        var swiper = new Swiper('.swiper-container',{
          loop: true,
          autoplay : 3000,
          pagination : '.swiper-pagination',
          autoplayDisableOnInteraction:false,
          paginationType: 'bullets',
          paginationClickable :true
        });
      },
      playNotice () {
        let notice = this.$refs.notice;
        if(!notice){
          return ;
        };
        let oUl = notice.querySelector('ul');
        let oLi = oUl.querySelectorAll('li');
        var oH = parseFloat(document.documentElement.style.fontSize)*.6;
        oUl.appendChild(oUl.firstChild.cloneNode(true));
        var i=0;
        setInterval(function(){
          if(i<oLi.length){
            i++;
            oUl.style.cssText = 'transform:translateY(-'+i*oH+'px);transition:.3s;';
            if(i==oLi.length){
              setTimeout(function(){
                i=0;
                oUl.style.cssText = 'transform:translateY(-'+i*oH+'px);transition:0s;';
              },300)
            }
          }
        },3000)
      }
    },
    components:{
      cHead, cFooter, needDealt
    }
  }
</script>

<style>
  html,body{
    background:#f0f0f0;
  }
  #app {

  }
  .headtoplogo img{height: 1rem;margin-top: 0.1rem;}
  .headtoplogo p{font-size: 0.32rem;margin:0.186667rem 0 0 0.16rem;font-weight: bold;line-height: 0.4rem;}
  .swiper-container {
    width: 100%;
    max-width: 750px;
    margin: auto;
    height: 4rem;
    background: #ffffff;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-slide a{display: block;width:100%;height: 100%;overflow:hidden;}
  .swiper-slide a img{width: 100%;}

  .appContent .notice{height:1.2rem;background:#ffffff;display:-webkit-flex;display:flex;padding:0.33rem .266rem;}
  .appContent .notice .noticeIcon{width:1.6rem;height:.6rem;font-size:.32rem;font-weight: bold;line-height:.6rem;}
  .appContent .notice .noticeIcon .iconfont{color:#4da9eb;font-size:.35rem;}
  .appContent .notice .noticeContent{height:.6rem;line-height:.6rem;overflow: hidden;}
  .appContent .notice .noticeContent ul{transition: .3s;}
  .appContent .notice .noticeContent ul li{width:7.5rem;font-size:.32rem;height:.6rem;font-weight: bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}

  .daiban-kechen{padding:0 .266rem;}
  .daiban-kechen .needDealt{}
  .daiban-kechen .needDealt a{display: block;}
  .daiban-kechen .needDealt a.needItem,.daiban-kechen .jinxuankechen a.needItem{margin-bottom:.266rem;color:#000000;padding:.266rem;background:#ffffff;border-radius:.1rem;display: box;display: -webkit-box;-webkit-box-align: center;display: -webkit-flex;display: flex;align-items: center;}
  .daiban-kechen .needDealt a.needItem:last-child,.daiban-kechen .jinxuankechen a.needItem:last-child{margin-bottom:0;}
  .daiban-kechen .needDealt a.needItem .needItem-left{width:1.866rem;height:2.533rem;margin-right:.453rem;}
  .daiban-kechen .jinxuankechen a .needItem-left{width:1.866rem;height: 1.866rem;margin-right:.453rem;overflow:hidden;}
  .daiban-kechen .needDealt a.needItem .needItem-left img,.daiban-kechen .jinxuankechen a .needItem-left img{width:100%;}

  .daiban-kechen .needDealt a.needItem .needItem-right{-webkit-box-flex: 1;-moz-box-flex:1;flex:1;width: 6rem;}
  .daiban-kechen .jinxuankechen a .needItem-right{-webkit-box-flex: 1;-moz-box-flex:1;flex:1;width: 6rem;}
  .daiban-kechen .needDealt a.needItem .needItem-right h3,.daiban-kechen .jinxuankechen a .needItem-right h3{font-size:.426rem;font-weight: bold;margin-bottom:.4rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .daiban-kechen .needDealt a.needItem .needItem-right p,.daiban-kechen .jinxuankechen a .needItem-right p{font-size:.373rem;overflow : hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-line-clamp: 2;  -webkit-box-orient: vertical;color:#a0a0a0;}

</style>


