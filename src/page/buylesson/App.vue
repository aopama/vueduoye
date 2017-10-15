<template>
  <div id="app">

    <!-- <div class="header">
      <span>购买</span>
    </div> -->
    <cHead :name="name" left="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>
    <div class="main">
      <div class="lessoncon">
        <p>外星人探险系列课时包</p>
        <p class="c-gray ft-26">44课时</p>
        <p class="c-gray ft-24 yuanjia">原价<s>￥4850</s></p>
        <p class="price ft-24">折后价&nbsp;<span><span> ￥</span>3880</span></p>
      </div>
      <ul class="choice mg0">
        <li>
          <span class="blueline"></span>
          <span>请选择上课方式</span>
        </li>
        <li class="special">
          <span class="radio_group">
            <input type="radio" name="online" id="online" value='1' v-model="isline"/>
            <label for="online">线上一对一外教</label>
          </span>
          <span class="radio_group">
            <input type="radio" name="online" id="offline" value='2' v-model="isline"/>
            <label for="offline">线下阅读中心</label>
          </span>
        </li>
        <li class="select" v-if="isline=='1'">
          <span>请选择城市</span>
          <i class="iconfont icon-youjiantou"></i>
          <select>
            <option>深圳市</option>
            <option>深圳市</option>
          </select>
        </li>
        <li class="select" v-if="isline=='1'">
          <span>请选择阅读馆</span>
          <i class="iconfont icon-youjiantou"></i>
          <select>
            <option>太古城分馆</option>
          </select>
        </li>
      </ul>
      <ul class="choice">
        <li>
          <span class="blueline"></span>
          <span>请选择课程体系</span>
        </li>
        <li class="select">
          <span>课程体系</span>
          <i class="iconfont icon-youjiantou"></i>
          <select>
            <option>乔希家的书在线教育平台</option>
          </select>
        </li>
      </ul>
      <ul class="choice">
        <li>
          <span class="blueline"></span>
          <span>请选择课程级别</span>
        </li>
        <li class="select">
          <span>课程级别</span>
          <i class="iconfont icon-youjiantou"></i>
          <select>
            <option>level1</option>
            <option>level2</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="foot">
      <span><span>￥</span>3880.00</span>
      <span>确认支付</span>
    </div>
  </div>
</template>

<script>
import cHead from '@/components/header';
import inpgroup from '@/components/inpgroup';
export default {
  name: 'app',
  data () {
    return {
      isline:'1',
      name: '购买'
    }
  },
  methods: {
    back () {
        history.go(-1);
      }
  },
  components:{
    inpgroup,cHead
  }
}
</script>

<style>
html,body,#app{background:#f0f0f0;}

.main{font-size: 0.4rem;color: #202020;}
.lessoncon{height:2.72rem;background: #f5f9ff;padding: 0.26667rem 0.4rem;}
.lessoncon .c-gray{}
.lessoncon .price{color: #fe455d;line-height: 0.38rem;}
.lessoncon .price>span{color: #fe2f4d;font-size: 0.453333rem;}
.lessoncon .price>span>span{font-size: 0.346667rem;}
.lessoncon .ft-26{line-height: 0.56rem;}
.lessoncon .yuanjia{margin:0.12rem 0 0.04rem 0;}

.choice{background: white;margin-top: 0.13333rem;font-size:0.3466667rem;}
.choice>li .blueline{float: left;width:0.13333rem;background: #37b7ff;height:0.2933333rem;border-radius: 0.04rem;margin:0.42666rem 0.2rem 0 0;}
.choice>li{height: 1.173333rem;border-bottom: 0.013333rem solid #eaeaea;margin:0 0.4rem;line-height: 1.173333rem}
.choice>li:last-of-type{border-bottom:0;}
.choice>li:first-of-type,.choice>li.special{margin:0;padding:0 0.4rem;}
.choice>li.special span{margin-top:0.386666rem;margin-right: 0.76rem;}
.choice>li.select span{float:left;}
.choice>li.select i{float:right;font-size: 0.34rem;color: #808080;margin-left: 0.12rem;}
.choice>li.select select{float: right;text-align: right;border:0;outline:none;color:#808080;
  background:transparent;
  height: 100%;
  padding:0 .2rem;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;}
.foot{height: 1.3066667rem;background:blue;position: fixed;bottom: 0;width: 100%;}
.foot>span{width: 50%;float: left;font-size: 0.4rem;text-align: center;line-height: 1.3066667rem;}
.foot>span:first-of-type{background:white;font-size: 0.453333rem;color: #ff6e18;font-weight: bold;}
.foot>span:first-of-type span{font-size:0.346666rem;font-weight:normal;}
.foot>span:last-of-type{background:#ff6e18;color: white}
</style>
