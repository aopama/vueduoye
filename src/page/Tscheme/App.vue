<template>
    <div id="app">
      <cHead style="background:#008bd9;color:#ffffff;" left="left" :name="name">
        <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        <!-- <a slot="heaerRight" class="formulate" >添加</a> -->
      </cHead>
      <div class="main">
        <div class="Tstop">
          <div class="Tstop_con">
            <div class="sphotograph">
              <a href="javascript:;">
                <img src="static/img/toux.png">
                <p>将太郎</p>
              </a>
            </div>
            <div class="name">
              <p>将大白教学方案将大白教学方案将大白教学方案将大白教学方案将大白教学方案</p>
              <p>乔希家的书学习顾问18701112302乔希家的书学习顾问18701112302乔希家的书学习顾问18701112302</p>
            </div>
          </div>
        </div>
        <!-- 拟定上课级别 -->
        <div class="Tschunk">
          <div class="tc_head titbg blue">拟定上课级别Level2</div>
          <div class="tc_main tc_mainone">
              <div class="tc_main_level">
                  <ul class="tmlevel_point">
                      <li><span>1</span>总课时：144节</li>
                      <li><span>2</span>词汇量：300个</li>
                      <li><span>3</span>语法：268个</li>
                  </ul>
                  <a href="javascript:;" class="tmlevel_btn">重新定级</a>
              </div>
              <p class="tc_main_suggest">通过学习可以让你的宝贝在学习字母发音的同时运用规律读懂简单的故事绘本。</p>
          </div>
        </div>
        <!-- 拟定上课外教 -->
        <div class="Tschunk">
          <div class="tc_head titbg greenT">拟定上课外教</div>
          <div class="tc_main">
              <div class="tc_main_teacher">
                  <ul>
                      <li>
                          <img src="static/img/toux.png">
                          <p>Cora</p>
                      </li>
                      <li>
                          <img src="static/img/toux.png">
                          <p>Cora</p>
                      </li>
                      <li>
                          <img src="static/img/toux.png">
                          <p>Cora</p>
                      </li>
                  </ul>
              </div>
          </div>
        </div>
        <!-- 课程内容tit -->
        <div class="Tschunk specialChunk">
          <div class="tc_head titbg red">level2级课程内容</div>
          <div class="tc_main">
              <div class="tc_main_tab">
                  <ul>
                      <li v-for="(item,index) in lista" :class="{'active':index==xilieind}" @click="changexilie(index)">
                          {{item}}
                      </li>
                  </ul>
              </div>
          </div>
        </div>
        <!-- 课程内容con -->
        <ul class="course_list">
          <li>
            <div class="cl_head">
              <span class="blueline"></span>
              <span class="tit">第一节 字母认知asdfa认知字母认知字母认知-AB</span>
              <span class="ci" @click="popup">新词(17)&nbsp;&nbsp;&nbsp;语法</span>
            </div>
            <div class="cl_con">
              <img src="static/img/shu.png">
              <ul>
                <li><span>课程目标：</span>对字母a,b的认读，听音辩词，掌握单句歌谣</li>
                <li><span>培养目标：</span>通过歌谣的学习培养孩子的节奏感。对字母的认识和字母发音的熟悉为孩子下一步的自信阅读打好基础。</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="cl_head">
              <span class="blueline"></span>
              <span class="tit">第一节 字母认知-AB</span>
              <span class="ci" @click="popup">新词(17)&nbsp;&nbsp;&nbsp;语法</span>
            </div>
            <div class="cl_con">
              <img src="static/img/shu.png">
              <ul>
                <li><span>课程目标：</span>对字母a,b的认读，听音辩词，掌握单句歌谣</li>
                <li><span>培养目标：</span>通过歌谣的学习培养孩子的节奏感。对字母的认识和字母发音的熟悉为孩子下一步的自信阅读打好基础。</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="cl_head">
              <span class="blueline"></span>
              <span class="tit">第一节 字母认知-AB</span>
              <span class="ci">新词(17)&nbsp;&nbsp;&nbsp;语法</span>
            </div>
            <div class="cl_con">
              <img src="static/img/shu.png">
              <ul>
                <li><span>课程目标：</span>对字母a,b的认读，听音辩词，掌握单句歌谣</li>
                <li><span>培养目标：</span>通过歌谣的学习培养孩子的节奏感。对字母的认识和字母发音的熟悉为孩子下一步的自信阅读打好基础。</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="ljgmbtn">
        立即购买
      </div>
      <wLayer v-if="isshow"></wLayer>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import wLayer from '@/components/wordlayer.vue'
export default{
    name: 'app',
    data () {
      return {
        name: '教学方案',
        lista:['自然拼读系列（25节）','海洋系列','外星人探险系列','海洋系列','外星人探险系列','海洋系列'],
        isshow:false,
        xilieind:'0',
      }
    },
    methods: {
      back () {
        history.go(-1);
      },
      popup () {
        this.isshow=true
      },
      closelayer () {
        this.isshow=false
      },
      changexilie (index) {
        this.xilieind=index
      },
    },
    components:{
      cHead,wLayer
    }
}
</script>
<style>
html,body,#app{background:#f0f0f0;}
::-webkit-scrollbar{
    display: none;
}
.main{margin-top: 1.2rem;}
.Tstop{height: 3.84rem;font-size:;background: url(/static/img/bg.png) no-repeat center center;background-size: cover;position: relative;}
.Tstop_con{position: absolute;bottom: 0;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6));height: 2.04rem;width: 100%;display: flex;padding:0.36rem 0.4rem 0 0.4rem;color: white;}
.sphotograph{font-size: 0.29333rem;white-space:nowrap;width:1.306667rem;overflow-y:hidden;text-align: center;}
.sphotograph>a{display:inline-block;margin:0 0.12rem;width:1.06667rem;color: white;}
.sphotograph>a img{width:1.06667rem;height: 1.06667rem;border-radius: 50%;}
.sphotograph>a p{overflow: hidden;text-overflow: ellipsis;text-align: center;margin-top:0.08rem;}
.Tstop_con .name{font-size:0.32rem;width:7.56rem;margin-left: 0.32rem;}
.Tstop_con .name p:first-of-type{font-size:0.45333rem;font-weight: bold;margin:0.4rem 0 0.16rem 0;line-height: 0.58rem;}
.Tstop_con .name p{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

.Tschunk{margin-top:0.68rem;background: white;padding:0.93333rem 0.4rem 0.52rem 0.4rem;position: relative;}
.titbg{background:url(/static/img/kuang.png);background-size:4.2rem 7.32rem;}
.greenT{background-position:0 -5.36rem;}
.blue{background-position:0 -1.05333rem;}
.red{background-position:0 -6.426667rem;}
.Tschunk .tc_head{font-size: 0.34666rem;height:0.8666rem;width: 4.2rem;position: absolute;top:-0.44rem;left: 50%;margin-left: -2.1rem;color: white;text-align:center;line-height: 0.88rem;}
/*{37b7ff}*/
.tc_mainone{font-size: 0.37333rem;padding:0 0.12rem;}
.tc_mainone .tc_main_level{display: flex;}
.tc_mainone .tc_main_level .tmlevel_point{flex:1;}
.tc_mainone .tc_main_level .tmlevel_point li{float: left;width: 3.52rem;margin:0.106667rem 0;}
.tc_mainone .tc_main_level .tmlevel_point li span{float: left;width: 0.4rem;height: 0.4rem;background: #37b7ff;border-radius: 50%;color: white;line-height: 0.44rem;text-align: center;margin-right: 0.16rem;}
.tc_mainone .tc_main_level .tmlevel_btn{width:1.52rem;border:0.01333rem solid #008bd9;white-space: nowrap;font-size: 0.29333rem;line-height:0.64rem;height: 0.64rem;text-align: center;border-radius: 0.04rem;}
.tc_mainone .tc_main_suggest{margin-top: 0.24rem;line-height: 0.56rem;}
.tc_main_teacher{font-size: 0.32rem;color: #888888;overflow-y:hidden;margin: 0 0.28rem;}
.tc_main_teacher ul{white-space: nowrap;text-align: center;}
.tc_main_teacher ul li{display: inline-block;margin: 0 0.2rem;}
.tc_main_teacher ul li img{width: 1.333rem;height: 1.333rem;border-radius: 50%;}
.tc_main_teacher ul li p{line-height: 0.506667rem;}
.specialChunk{padding: 0 0.4rem;}
.tc_main_tab{font-size: 0.37333rem;overflow-y:hidden;}
.tc_main_tab ul{white-space: nowrap;}
.tc_main_tab ul li{display: inline-block;margin-right: 0.6rem;padding: 0.88rem 0 0.36rem 0;color: #808080;border-bottom: 0.05333rem solid white;}
.tc_main_tab ul li:last-of-type{margin-right: 0}
.tc_main_tab ul li.active{color: #000000;border-bottom: 0.05333rem solid #008bd9;}

.course_list{font-size:0.346667rem;padding-bottom: 1.28rem;}
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
.ljgmbtn{height: 1.28rem;width: 100%;position: fixed;bottom: 0;background:#ff6e18;color: white;font-size: 0.4rem;text-align: center;line-height: 1.28rem;}

</style>
