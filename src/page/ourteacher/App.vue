<template>
    <div id="app">
      <cHead left="left" :name="name">
        <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        <!-- <a slot="heaerRight" class="formulate" >添加</a> -->
      </cHead>
      <div class="addChild" v-if="myFamily">
        <img class="syllabusChild" src="static/img/child.png" alt="">
        <p class="mt-40">暂无数据</p>
      </div>
      <ul class="ourMaster" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <template v-for="item in dataList">
          <li>
            <a :href="'Tdetails.html?familyid='+item.id">
              <div class="teimg"><img :src="curldizhi+item.face"></div>
              <section class="introduce">
                <p class="msg">
                  <span class="name" v-text="item.e_name"></span>
                  <i class="iconfont" :class="item.sex==1?'icon-man':'icon-nv'"></i>
                  <span class="age" v-text="item.age+'岁'"></span>
                </p>
                <p v-text="item.introduction2?item.introduction2:'老师暂无介绍'"></p>
                <i class="iconfont icon-youjiantou"></i>
              </section>
            </a>
          </li>
        </template>
      </ul>
      <p v-if="meile" v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
      <p class="text-c pd-30 ft-20" v-if="dataList.length==0&&!loading">暂无数据</p>
      <p class="text-c pd-30 ft-20" v-if="!meile">全部加载完成</p>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import { Indicator, InfiniteScroll } from 'mint-ui'
import { my_teacher_list } from '@/api/api.js'

export default{
    name: 'app',
    data () {
      return {
        curldizhi:'',
        name: '我们的老师',
        loading: false,
        myFamily:false,
        dataList: [],
        meile: true,
        tishi: '暂无数据',
        page:1
      }
    },
    created:function(){
      this.curldizhi = this.cImgurldizhi;
    },
    methods: {
      back () {
        history.go(-1);
      },
      getData () {
        this.loading=true;
        my_teacher_list({page: this.page}).then( res => {
          let result = res.data;
          if(result.length==10){
            this.dataList = this.dataList.concat(result);
            this.page++;
            setTimeout(() =>{
              this.loading=false;
            },1000)
          }else if(result.length>0){
            this.dataList = this.dataList.concat(result);
            this.meile=false
          }else{
            this.meile=false;
            if(this.dataList.length==0){
              this.myFamily = true;
            }
          }
        })
      }
    },
    components:{
      cHead
    }
}
</script>
<style>
html,body,#app{background:#f0f0f0;}
.ourMaster{font-size: 0.32rem;background: white;padding-top: 1.2rem;}
.ourMaster>li{font-size: 0.32rem;padding-left:0.4rem;}
.ourMaster>li>a{display:block;display:-webkit-box;display:flex;-webkit-box-align: center;align-items: center;}
.ourMaster>li>a .teimg{position: relative;width: 1.3333rem;height: 1.3333rem;}
.ourMaster>li>a .teimg img{width: 1.3333rem;height: 1.3333rem;position: absolute;top: 50%;transform: translateY(-50%);border-radius: 50%}
.ourMaster>li>a .introduce{padding:.4rem 0;flex: 1;margin-left:.36rem;border-bottom: 0.01333rem solid #eaeaea;padding-right: 0.88rem;position: relative;}
.ourMaster>li>a .introduce>.msg{overflow: hidden;margin-bottom:.266rem;}
.ourMaster>li>a .introduce>.msg *{float:left;}
.ourMaster>li>a .introduce>.msg .name{display:inline-block;max-width:50%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size: 0.45333rem;color: #000000}
.ourMaster>li>a .introduce>.msg i{font-size: 0.32rem;margin:0 0.2rem 0 0.26667rem;color:#ff7677}
.ourMaster>li>a .introduce>.msg i.icon-man{color:#42bef4 !important;}
.ourMaster>li>a .introduce>.msg .age{color: #808080}
.ourMaster>li>a .introduce>p:last-of-type{color: #303030;line-height:0.48rem;display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 3;  overflow: hidden;}
.ourMaster>li>a .introduce>i{font-size: 0.4rem;color:#808080;position: absolute;top: 50%;right:0.4rem;transform: translateY(-50%);}

.addChild{padding-top:2.666rem;}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.373rem;color:#808080;text-align:center;}
</style>
