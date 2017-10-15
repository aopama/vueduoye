<template>
  <div id="app">
    <cHead style="background:#008bd9;color:#ffffff;" left="left" :name="name">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
      <!-- <a slot="heaerRight" class="formulate" >添加</a> -->
    </cHead>
    <ul class="headtop">
      <li v-for="(item,index) in data.NavList" :class="{'active':data.levelActive==index}" @click="changelevel(index)" v-text="'level'+parseInt(index+1)"></li>
      <!-- <li>level2</li>
      <li>level3</li>
      <li>level4</li>
      <li>level5</li>
      <li>level6</li> -->
    </ul>
    <div class="introduce">
      <div class="titbg int_head blue">概要</div>
      <ul class="int_con int_one">
        <li class="mg0">
          <span>1</span>
          <span v-text="'总课时：'+courselevelinfo.allclass+'节'"></span>
        </li>
        <li class="mg0">
          <span>2</span>
          <span v-text="'新词量：'+courselevelinfo.newwordnum+'个'"></span>
        </li>
        <li>
          <span>3</span>
          <span v-text="'阅读量：'+courselevelinfo.wordnum+'个'"></span>
        </li>
        <li>
          <span>4</span>
          <span v-text="'适合年龄：'+courselevelinfo.age"></span>
        </li>
      </ul>
    </div>
    <div class="introduce">
      <div class="titbg int_head">选用书籍</div>
      <div class="int_con int_two" v-text="courselevelinfo.selected_books?courselevelinfo.selected_books:'暂无数据'"></div>
    </div>
    <div class="introduce">
      <div class="titbg int_head green">阅读目标</div>
      <div class="int_con" v-text="courselevelinfo.reading_target?courselevelinfo.reading_target:'暂无数据'"></div>
    </div>
    <div class="introduce">
      <div class="titbg int_head yellow">主导模式</div>
      <div class="int_con" v-text="courselevelinfo.dominant_mode?courselevelinfo.dominant_mode:'暂无数据'"></div>
    </div>
    <div class="introduce intrT">
      <div class="titbg int_head orange">课程内容</div>
      <div class="int_con int_course">
        <ul>
          <li v-for="(item,index) in courselistgrouplist" :class="{'active':index==data.xilieind}" @click="changexilie(index)" v-text="item.name"></li>
          <li v-if="courselistgrouplist.length==0">　</li>
        </ul>
      </div>
    </div>
    <p v-if="courselistgrouplist.length==0" class="mt-20 text-c ft-20">暂无课程信息</p>
    <ul class="course_list">
      <li v-for="(item, index) in classContent()">
        <div class="cl_head">
          <span class="blueline"></span>
          <span class="tit" v-text="'第'+parseInt(index+1)+'节 '+item.coursename"></span>
          <span class="ci" v-text="'新词('+item.keywords_count+')    语法'" @click="popup(index)"></span>
        </div>
        <div class="cl_con">
          <img :src="item.thumb">
          <ul>
            <li><span>课程目标：</span><span class="c-black" v-text="item.kcmb"></span></li>
            <li><span>培养目标：</span><span class="c-black" v-text="item.pymb"></span></li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="bmrxbtn">
      <a href="/classplay.html">
        报名入学
      </a>
    </div>
    <wLayer v-if="isshow" :keywords="data.keywords" :grammar_num="data.grammar_num"></wLayer>
  </div>
</template>

<script>
  import cHead from '@/components/header.vue'
  import wLayer from '@/components/wordlayer.vue'
  import { Indicator } from 'mint-ui'
  import { teaching_system } from '@/api/api.js'

  export default {
    name: 'app',
    data () {
      return {
        Imageurl:'',
        name:'...',
        lista:['外星人探险系列','海洋系列','外星人探险系列','海洋系列','外星人探险系列','海洋系列'],
        data: {
          NavList: 0,
          levelActive: 0,
          xilieind: 0,
          keywords: '',
          grammar_num: ''
        },
        courselevelinfo:{},
        courselistgrouplist:[],
        isshow:false
      }
    },
    created () {
      this.Imageurl = this.Imgurldizhi;
      this.getData(0);
    },
    methods: {
      back () {
        history.go(-1)
      },
      dataCache (result) {
        this.courselevelinfo = result.courselevelinfo;
        this.data.NavList = parseInt(this.courselevelinfo.level);
        this.courselistgrouplist = result.courselistgrouplist;
      },
      getData (index) {
        Indicator.open();
        var levelN = index+1;
        teaching_system({ bigtype: l_search.bigType, level:levelN }).then( res => {
          Indicator.close();
          const result = res.data;
          this.name = result.bigtypename;
          this.data.levelActive = index;  //等级导航第i个获取焦点
          this.data.xilieind = 0;         //课程内容每次默认选中第一个
          dataCache.cache['data'+index] = result; //缓存数据

          this.dataCache(result);
        }, () => {
          Indicator.close();
        });
      },
      changelevel (index) {
        //缓存
        let cache = dataCache.cache['data'+index];
        if(cache){
          this.dataCache(cache);
          this.data.levelActive = index;
          this.data.xilieind = 0;
          return ;
        }
        //已经选中再次点击不会触发ajax
        if(index!==this.data.levelActive){
          this.getData(index);
        }
      },
      classContent () {
        let data = this.courselistgrouplist[this.data.xilieind];
        if(data){
          return data.list;
        }else{
          return [];
        }
      },
      changexilie (index) {
        this.data.xilieind=index
        this.classContent();
      },
      popup (index) {
        this.isshow=true;
        let data = this.courselistgrouplist[this.data.xilieind].list[index];
        this.data.keywords = data.keywords;
        this.data.grammar_num = data.importantinformation;
      },
      closelayer () {
        this.isshow=false
      }
    },
    components:{
      cHead, wLayer
    }
  }
</script>

<style>
  html,body,#app{background:#f0f0f0;}

  .wrap{}
  .headtop{height: 1.17333rem;background: white;border-bottom:0.013333rem solid #e0e0e0;text-align: center;overflow-y:hidden;margin-top:1.2rem;white-space: nowrap;font-size: 0}
  .headtop li{display:inline-block;height: 0.7066rem;font-size:0.37333rem;margin:0 0.2rem;line-height: 0.7066rem;padding:0 0.32rem;border-radius: 0.32rem;color:#808080;margin-top: 0.24rem;}
  .headtop li.active{background: #008bd9;color: white}
  .titbg{background:url(/static/img/kuang.png);background-size:4.2rem 7.32rem;}
  .blue{background-position:0 -1.05333rem;}
  .green{background-position:0 -2.0933rem;}
  .yellow{background-position:0 -3.1733rem;}
  .orange{background-position:0 -4.28rem;}
  .introduce{font-size: 0.37333rem;background: white;margin-top: 0.7066rem;position: relative;}
  .introduce .int_head{font-size: 0.34666rem;height:0.8666rem;width: 4.2rem;position: absolute;top:-0.44rem;left: 50%;margin-left: -2.1rem;color: white;text-align:center;line-height: 0.88rem;}
  .introduce .int_con{padding:0.52rem;padding-top:0.88rem;line-height: 0.52rem;}
  .introduce .int_one{overflow: hidden;}
  .introduce .int_one li{width: 49.999%;float: left;line-height: 0.4rem;margin-top: 0.34666rem;}
  .introduce .int_one li:nth-child(2n-1){}
  .introduce .int_one li span:first-of-type{float: left;height:0.4rem;width: 0.4rem;background: #37b7ff;border-radius: 50%;color: white;text-align: center;line-height: 0.44rem;font-size: 0.26667rem;margin-right: 0.24rem;}
  .introduce .int_two{padding-bottom:0.88rem;}
  .intrT{padding: 0 0.4rem;}
  .introduce .int_course{padding:0;white-space: nowrap;position: relative;overflow-y:hidden}
  ::-webkit-scrollbar{
    display: none;
  }
  .introduce .int_course>ul{display: flex;}
  .introduce .int_course>ul>li{line-height:0.37333rem;padding-top:0.88rem;padding-bottom: 0.36rem;margin-right: 0.64rem;color: #808080;}
  .introduce .int_course>ul>li.active{border-bottom:0.05333rem solid #008bd9;color: #000000}
  .course_list{font-size:0.346667rem;padding-bottom: 1.2rem;}
  .course_list>li{margin: 0.26667rem;background: white;padding:0 0.26667rem;}
  .cl_head{height: 0.93333rem;padding:0.29333rem 0;line-height:0.34667rem;border-bottom: 0.01333rem solid #eaeaea;display: flex;}
  .cl_head .ci{color: #008bd9;text-align: right;flex: 1}
  .cl_head .blueline{width: 0.13333rem;height:0.29333rem;background:#37b7ff;border-radius: 0.04rem;margin-right: 0.12rem;}
  .cl_head .tit{width:6rem;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}
  .cl_con{padding:0.26667rem 0;display: flex;}
  .cl_con img{width:1.96rem;height: 2.56rem;margin-right: 0.32rem;}
  .cl_con>ul{flex: 1;}
  .cl_con>ul li{line-height:0.46667rem;}
  .cl_con>ul li:last-of-type{margin-top: 0.28rem;}
  .cl_con>ul li span{color: #5c5c5c;}
  .bmrxbtn{height: 1.2rem;background: #008bd9;position: fixed;bottom: 0;width: 100%;font-size: 0.3733rem;color: white;text-align: center;line-height: 1.2rem;z-index: 3}
  .bmrxbtn a{display: block;width: 100%;height: 100%;color:#ffffff;}

</style>
