<template>
  <div class="bell">
    <cHead :name="name"></cHead>
    <cFooter aclass="bell.html"></cFooter>
    <div class="appContent">
      <!--添加孩子 start-->
      <div class="addChild  mtop-200" v-if="belllen||dataCk">
        <img class="syllabusChild" src="static/img/child.png" alt="">
        <p class="mt-40">{{dataCk?'暂无数据':'你还没有制定上课计划哦~'}}</p>
      </div>
      <!--添加孩子 end-->
      <!--课程列表 start-->
      <div class="classList">
        <template v-for="(item, index) in bellData">
          <a :href="'classinfo.html?n='+index" class="class-item" :data-cid="item.cid">
            <div class="upClassTime">
              <p>上课时间：<span class="" v-countdown="item.start_time*1000"></span><span class="y c-gray">*请你到PC端上课</span></p>
            </div>
            <div class="childAndFamily">
              <h5 v-text="item.combo_name+' 第'+item.ranking+'节 '+item.name"></h5>
              <childInfo :img="curldizhi+item.child.face" :childName="item.child.cname" :childSex="item.child.sex" :childAge="item.child.age" :childLevel="item.child.my_level" :childType="item.child.bigtype_name"  class="mb-30"></childInfo>
              <childInfo :img="curldizhi+item.data_teacher.face" :childType="item.data_teacher.country.name" :childName="item.data_teacher.tname" :childSex="item.data_teacher.sex" :childAge="item.data_teacher.age"></childInfo>
            </div>
          </a>
        </template>
        <p class="page-infinite-loading" v-show="loadingD">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
        <p class="text-c pd-30 ft-20" v-show="loadSuccess" v-text="loadSuccess"></p>
      </div>
      <!--课程列表 end-->
    </div>
  </div>
</template>

<script>
  import cHead from '@/components/header.vue'
  import cFooter from '@/components/footer.vue'
  import childInfo from '@/page/syllabus/components/childinfo.vue'
  import { Toast, Indicator } from 'mint-ui'
  import { skl } from '@/api/api.js'

  export default {
    data () {
      return {
        curldizhi:'',
        user:{data:{}},
        name: '上课铃',
        belllen: false,
        dataCk:false,
        loadingD: true,
        loadSuccess:'',
        bellData: []
      }
    },
    created () {
      this.curldizhi = this.cImgurldizhi;
      if(localStorage.user){
        this.user = JSON.parse(localStorage.user);
      }
      this.getData();
    },
    methods: {
      getData () {
        skl({ id: this.user.data.id, cklogin:this.user.data.token }).then(res => {
          const result = res.data;
          this.loadingD = false;
          if(result.state==1){
            localStorage.bell = JSON.stringify(result.data);
            this.bellData = result.data;
            if(result.data.length==0){
              this.loadSuccess = '暂无数据';
            }else{
              this.loadSuccess = '数据全部加载完成';
            }
          }else if(result.state==0){
            this.dataCk = true;
          }
        }, () => {
          this.loadingD = false;
          this.loadSuccess = '暂无数据';
        })
      }
    },
    directives: {
      countdown: {
        inserted:function(el, binding){
          function g0(d){
            d.setHours(0)
            d.setMinutes(0)
            d.setSeconds(0)
            d.setMilliseconds(0)
          }
          var d = new Date();
          var o = new Date(binding.value);
          var maxDate = c_mobile['date'](o);
          g0(d);g0(o);
          var nowDayTime = 86400000;  //1天的毫秒
          var timer = null;
          if(o-d>=nowDayTime){
            el.innerHTML = maxDate;
          //  el.innerHTML = (o-d)/nowDayTime+'天后上课!';
          }else{
            o = new Date(binding.value);
            el.className = 'c-red';
            timer = setInterval(function(){
              d = new Date();
              var num = o-d;
              if(num<=0){
                clearInterval(timer);
                el.innerHTML = '00:00:00'
              }else{
                var hours = parseInt(num/3600000);
                var Minute = parseInt((num%3600000)/60000);
                var Second = parseInt(((num%3600000)%60000)/1000);
                el.innerHTML = c_mobile.num(hours)+':'+c_mobile.num(Minute)+':'+c_mobile.num(Second);
              }
            })
          }
        }
      }
    },
    components: {
      cHead, cFooter, childInfo
    }
  }
</script>

<style>
  html,body{background:#f0f0f0;}

  .mtop-200{margin-top:2.6rem!important;}
  .mtop-100{margin-top:1.3rem!important;}

  .appContent{padding-left:.266rem;padding-right:.266rem;}

  .addChild{}
  .addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
  .addChild>p{font-size:.373rem;color:#808080;text-align:center;}

  .classList{}
  .classList .class-item{display: block;margin-top:.266rem;padding:0 .4rem;background:#ffffff;border-radius:.1rem;}
  .classList .class-item .upClassTime{padding:.3rem 0;font-size:.373rem;color:#000000;border-bottom:1px solid #eaeaea;}

  .classList .class-item .childAndFamily{padding:.3rem 0;}
  .classList .class-item .childAndFamily h5{color:#000000;font-size:.4rem;font-weight: bold;width:100%;margin-bottom:.4rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
</style>
