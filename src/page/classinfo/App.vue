<template>
  <div class="classinfo">
    <cHead :name="name" left="true" right="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
      <a slot="headerRight" class="formulate" @click="cLeave(true)">请假</a>
    </cHead>
    <div class="appContent">
      <div class="upClassTime">
        <p>上课时间：<span class="" v-countdown="nowData.start_time*1000">0000</span></p>
      </div>
      <h6>课程信息</h6>
      <div class="classinfo">
        <div class="introduce">
          <h2 v-text="nowData.combo_name+' 第'+nowData.ranking+'节 '+nowData.name"></h2>
          <div class="classNewci">
            <div class="classNewci-left">
              <img :src="nowData.course.thumb" alt="">
            </div>
            <div class="classNewci-right">
              <p class="mb-30"><span class="c-gray">课程新词：</span>{{nowData.course.keywords}}</p>
              <p><span class="c-gray">核心语法：</span>{{nowData.course.importantinformation}}</p>
            </div>
          </div>
        </div>
        <div class="kechenMuBiao">
          <p class="mb-30"><span class="c-gray">课程目标：</span>{{nowData.course.kcmb}}</p>
          <p><span class="c-gray">培养目标：</span>{{nowData.course.pymb}}</p>
        </div>
        <div class="kehouzuoye">
          <p class="z"><i class="iconfont icon-jiejuefangan"></i>课前预习<span class="c-gray">（请登录电脑端）</span></p>
          <span class="y"  v-countdown.y="nowData.start_time*1000"></span>
        </div>
      </div>
      <h6>孩子信息</h6>
      <childInfo :img="curldizhi+nowData.child.face" :childName="nowData.child.cname" :childSex="nowData.child.sex" :childAge="nowData.child.age" :childLevel="nowData.child.my_level" :childType="nowData.child.bigtype_name" class="pd-30"></childInfo>
      <h6>老师信息</h6>
      <childInfo :img="curldizhi+nowData.data_teacher.face" :childType="nowData.data_teacher.country.name" :childName="nowData.data_teacher.tname" :childSex="nowData.data_teacher.sex" :childAge="nowData.data_teacher.age"class="pd-30"></childInfo>
    </div>
    <div class="leaveLayer" v-if="leave">
      <div class="tangceng"></div>
      <div class="leaveContent">
        <p class="tip">你确定要请假吗?</p>
        <div class="leaveButton">
          <button class="quxiao" @click="cLeave(false)">取消</button>
          <button class="queding" @click="leaveaa">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cHead from '@/components/header.vue';
  import childInfo from '@/page/syllabus/components/childinfo.vue'
  import { Toast, Indicator } from 'mint-ui'
  import { leave } from '@/api/api.js'

  export default {
    data () {
      return {
        curldizhi:'',
        Imageurl:'',
        name: '课程详情',
        leave: false,
        nowData: {}
      }
    },
    created:function(){
      this.curldizhi = this.cImgurldizhi;
      this.Imageurl = this.Imgurldizhi;
      this.nowData = JSON.parse(localStorage.bell)[(l_search.n||0)];
    },
    methods: {
      back () {
        history.go(-1);
      },
      cLeave (b){
        this.leave = b;
      },
      leaveaa () {
        Indicator.open();
        let user = JSON.parse(localStorage.user).data;
        leave({cid: this.nowData.cid, start_time: this.nowData.start_time, demo_type: this.nowData.leave_type, cklogin:  user.token}).then(res => {
          this.leave = false;
          Indicator.close();
          const result = res.data;
          if(result.state==1){
            setTimeout(function(){
              location.assign('bell.html');
            },2000)
          }
          Toast(result.message);
        }, () => {
          this.leave = false;
          Indicator.close();
          Toast('系统繁忙');
        })
      }
    },
    components: {
      cHead, childInfo
    }
  }
</script>

<style>
  html,body{background: #f0f0f0;}

  h6{font-size:.32rem;padding:.266rem .4rem;}
  .appContent{}
  .appContent .upClassTime{padding: .4rem;background:#ffffff;}
  .appContent .upClassTime p{font-size:.373rem;}

  .appContent .classinfo{background:#ffffff;}
  .appContent .classinfo .introduce{padding:.4rem;border-bottom:1px solid #eaeaea;}
  .appContent .classinfo .introduce h2{margin-bottom:.4rem;font-size:.4rem;font-weight: bold;width:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}

  .appContent .classinfo .introduce .classNewci{display: flex;display:-webkit-flex;align-items: center;display: -webkit-box;display: box;-webkit-box-align:center;}
  .appContent .classinfo .introduce .classNewci .classNewci-left{width:1.933rem;height:2.533rem;margin-right:.4rem;overflow: hidden;}
  .appContent .classinfo .introduce .classNewci .classNewci-left img{width:100%;}
  .appContent .classinfo .introduce .classNewci .classNewci-right{width:6rem;flex: 1;-webkit-box-flex: 1;}
  .appContent .classinfo .introduce .classNewci .classNewci-right p{font-size:.344rem;}

  .appContent .classinfo .kechenMuBiao{padding:.4rem;font-size:.344rem;border-bottom:1px solid #eaeaea;}

  .appContent .classinfo .kehouzuoye{padding:.4rem;font-size:.377rem;overflow: hidden}
  .appContent .classinfo .kehouzuoye .iconfont{font-size:.377rem;color:#18c196;margin-right:.2rem;}

  .leaveLayer{position:fixed;top:0;left:0;width:100%;height:100%;z-index:666;}
  .leaveLayer .tangceng{width:100%;height:100%;background:#000000;opacity:.5;}
  .leaveLayer .leaveContent{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;width:6.93rem;height:3.66rem;max-width:520px;max-height:280px;background:#ffffff;border-radius:.2rem;overflow: hidden;}
  .leaveLayer .leaveContent .tip{font-size:.4rem;color:#000000;text-align:center;margin-top:15%}
  .leaveLayer .leaveContent .leaveButton{position:absolute;left:0;bottom:0;width:100%;height:1.173rem;max-height:88px;border-top:1px solid #f0f0f0;}
  .leaveLayer .leaveContent .leaveButton button{border:0;background:#ffffff;width:49.999%;height:100%;line-height:100%;float:left;text-align:center;font-size:.4rem;}
  .leaveLayer .leaveContent .leaveButton button.quxiao{color:#008bda;}
  .leaveLayer .leaveContent .leaveButton button.queding{color:#ffffff;background:#008bda;}


</style>

