<template>
  <div class="syllabus">
    <cHead :name="name" right="true">
      <a slot="headerRight" href="addchild.html?reg=syllabus" class="formulate">添加孩子</a>
    </cHead>
    <cFooter aclass="syllabus.html"></cFooter>
    <div class="appContent">
      <!--添加孩子 start-->
      <div class="addChild  mtop-200" v-if="childLen||dataCk">
        <img class="syllabusChild" src="static/img/child.png" alt="">
        <p class="mt-40"><strong class="c-red">免费</strong>预约价值<strong class="c-red">298元</strong>体验课</p>
        <a class="mt-50" href="addchild.html?reg=syllabus" >立即添加</a>
      </div>
      <!--添加孩子 end-->
      <!--课程表 start-->
      <div class="childList">
        <template v-for="item in data">
          <section class="child-item" :data-id="item.bigtype_id">
            <childInfo class="pd-20" :img="curldizhi+item.face" :childName="item.cname" :childSex="item.sex" :childAge="item.age" :childLevel="item.level" :childType="item.bigtype_name" :right="item.demoke">
              <a slot="right" :href="'appointment.html?cid='+item.cid">预约体验课</a>
            </childInfo>
            <ul class="child-item-yigoukeshi">
              <li class="mb-20">已购买课时：<span class="c-blue" v-text="item.buy_total"></span>节</li>
              <li class="mb-20">已预约课时：<span class="c-blue" v-text="item.formulate_total"></span>节</li>
              <li>未预约课时：<span class="c-blue" v-text="item.weiyuyue_tatal"></span>节</li>
              <li>已上课时：<span class="c-blue" v-text="item.attendclass_tatal"></span>节</li>
            </ul>
            <div class="child-button">
              <a :href="'formulate.html?cid='+item.cid+'&bigtype='+item.bigtype_id" v-if="item.jihua==1">制定上课计划</a>
              <a @click="sj('buyscheme.html?cid='+item.cid)" v-if="item.jihua_jia==1">制定上课计划</a>
              <a @click="sj('buyscheme.html?cid='+item.cid)" class="childorange" v-if="item.goumai==1">购买课时包</a>
              <a @click="sj(item)" class="childorange" v-if="item.xiugai==1">修改课时包</a>
              <a @click="sj(item)" class="childorange" v-if="item.fukuan==1">付款</a>
            </div>
          </section>
        </template>
        <p class="page-infinite-loading" v-show="loadingD">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
        <section>
          <p v-show="loadingSuccess" v-text="loadingSuccess" class="text-c pd-30 ft-20"></p>
        </section>
      </div>
      <!--课程表 end-->
    </div>
  </div>
</template>

<script>
  import cHead from '@/components/header.vue'
  import cFooter from '@/components/footer.vue'
  import childInfo from './components/childinfo.vue'
  import { Toast, Indicator } from 'mint-ui'
  import { getChildListById, index_app } from '@/api/api.js'

  export default {
    data () {
      return {
        curldizhi:'',
        Imageurl:'',
        name: '约课',
        childLen:false,
        f:false,
        user:{}, //用户信息
        loadingD:true,
        dataCk:null,
        loadingSuccess: false,
        childList: [],
        data:[]
      }
    },
    created:function(){
      this.curldizhi = this.cImgurldizhi;
      this.Imageurl = this.Imgurldizhi;
      if(localStorage.user){
        this.user = JSON.parse(localStorage.user).data;
      }
    //  this.getMyByBa();
      this.getData();
    },
    methods: {
      getMyByBa () {
        getChildListById({ id: this.user.id, cklogin:this.user.token}).then( res => {
          const result = res.data;
          if(result.statusCode==1){
            this.childLen = result.data.length>0?false:true;
            this.childList = result.data;
          }
        }, () => {

        })
      },
      getData () {
        index_app({ id: this.user.id, cklogin:this.user.token}).then( res => {
          const result = res.data;
          this.loadingD = false;
          if(result.state==1){
            this.data = result.data;
            if(result.data.length==0){
              this.childLen = true;
              this.loadingSuccess = '暂无数据';
            }else{
              this.childLen = false;
              this.loadingSuccess = '数据全部加载完成';
            }
          }else if(result.state==0){
            this.dataCk = true;
            this.childLen = true;
          }
        }, () => {
          this.getData();
        })
      },
      sj (item) {
        if(typeof item=='object'){
          sessionStorage.order = JSON.stringify(item);
          window.location.assign('buyscheme.html');
        }else{
          delete sessionStorage.order;
          window.location.assign(item);
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

.addChild{}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.373rem;color:#808080;text-align:center;}
.addChild>a{display:block;width:3.6rem;height:1.066rem;text-align:center;line-height:1.066rem;color:#ffffff;background:#008bd9;font-size:.4rem;border-radius:.1rem;margin:auto;}

.childList{padding:0 .266rem;}
.childList .child-item{background:#ffffff;border-radius:.1rem;margin-top:.266rem;}
.childList .child-item .child-item-yigoukeshi{padding:.4rem;border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;overflow: hidden;}
.childList .child-item .child-item-yigoukeshi li{width:49.9%;float:left;font-size:.377rem;}

.childList .child-item .child-button{padding:.266rem;text-align:right;}
.childList .child-item .child-button a{display:inline-block;margin-left:.25rem;width:30%;font-size:.377rem;padding:0.266rem 0;text-align:center;border-radius:.1rem;border:1px solid #008bd8;color:#008bd8;}
.childList .child-item .child-button a.childbb{border:1px solid #008bd8;color:#008bd8;}
.childList .child-item .child-button a.childorange{border:1px solid #ff6e18;color:#ff6e18;}
.childList .child-item .child-button a:first-child{margin-left:0;}
</style>
