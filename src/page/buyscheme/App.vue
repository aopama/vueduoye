<template>
  <div id="app">
    <cHead :name="name" left="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>
    <div class="appContent main">
      <ul class="choice mg0">
        <li>
          <span class="blueline"></span>
          <span>请选择上课方式</span>
          <i class="iconfont icon-wenhao-copy c-gray" @click="Toggle(true)"></i>
        </li>
        <li class="special">
          <span class="radio_group">
            <input type="radio" name="online" id="online" value='1' v-model="isline"/>
            <label for="online">线上一对一外教</label>
          </span>
          <span class="radio_group">
            <input disabled type="radio" name="online" id="offline" value='2' v-model="isline"/>
            <label for="offline"><s>线下阅读中心</s></label>
          </span>
        </li>
        <li class="select" v-if="isline=='2'">
          <span>请选择城市</span>
          <i class="iconfont icon-youjiantou"></i>
          <select v-model="d.cityid">
            <option v-for="item in citylist" v-text="item.typename" :value="item.id"></option>
          </select>
        </li>
        <li class="select" v-if="isline=='2'">
          <span>请选择阅读馆</span>
          <i class="iconfont icon-youjiantou"></i>
          <select v-model="d.readg">
            <option :value="item.id" v-text="item.title" v-for="item in readg"></option>
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
          <select v-model="d.bigType">
            <option v-for="item in bigType" :value="item.id" v-text="item.name"></option>
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
          <select v-model="d.level">
            <option v-for="item in level" :value="item.level" v-text="item.level_name"></option>
          </select>
        </li>
      </ul>
      <ul class="choice ksbtype">
        <li>
          <span class="blueline"></span>
          <span>请选择课时包类型</span>
        </li>
        <template v-for="(item, index) in combo">
          <li class="select" :data-id="item.id">
            <div>
              <p class="slefta" v-text="item.name+' ('+item.total_course+'节)'"></p>
              <p class="sleftb"><span v-if="parseFloat(item.zhekou)" class="discount">{{parseFloat(item.zhekou)}}折</span><span class="small">￥</span><span class="jine" v-text="item.zhekouprice"></span><span class="saving" v-if="parseFloat(item.zhekou)" v-text="'已优惠'+new Number(item.price-item.zhekouprice).toFixed(2)+'元'"></span>
              </p>
            </div>
            <span class="define_radio" >
              <input type="radio" name="ksbtype" :value="index" v-model="d.combo_data" />
            </span>
          </li>
        </template>
      </ul>
    </div>
    <div class="foot">
      <span><span>￥</span><em v-text="kebao"></em></span>
      <span @click="setorder_combo">确认支付</span>
    </div>
    <!--上课方式介绍-->
    <layerShade v-on:toggle="Toggle" v-if="toggle">
      <div class="ruheshangke">
        <ul class="mt-0">
          <li>
            <span class="blueline"></span>
            <span>线下如何上课</span>
          </li>
          <li><p>1、带孩子去阅读实体店报道</p></li>
          <li>
            <p>2、教学主任给孩子分配班级</p>
          </li>
          <li>
            <p>3、按照班级的课程表来阅读实体店上课</p>
          </li>
          <li>
            <p>4、课后认真完成老师布置的作业</p>
          </li>
        </ul>
        <ul class="mt-30">
          <li>
            <span class="blueline"></span>
            <span>线上如何上课</span>
          </li>
          <li><p>1、根据实际情况为孩子制定上课计划</p></li>
          <li>
            <p>2、根据自动生成的课程表，做好课前预习</p>
          </li>
          <li>
            <p>3、课前调试好耳机、麦克风以及网络设备，确保能够正</p>
          </li>
          <li>
            <p>4、课后认真完成老师布置的作业</p>
          </li>
        </ul>
      </div>
    </layerShade>
    <!--上课方式介绍-->
    <transition name="bounce">
      <layerShade v-if="mayb" v-on:toggle="maytoggle">
          <div class="immediatePay" >
            <!--<span class="radio_group"><input type="radio" name="onlinea" id="online" value="3" checked> <label for="online"></label></span>-->
            <div class="money">
              <h6 class="f-30">立即支付</h6>
              <p>需付款：<span class="c-pink">￥{{kebao}}</span></p>
            </div>
            <ul class="payType">
              <template v-for="(value, key, index) in payList.paytype">
                <li v-if="key=='mymoneypay'">
                  <div class="zhifuItemLeft">
                    <i class="iconfont icon-yue"></i>
                    <span>余额支付</span>
                  </div>
                  <div class="zhifuItemRight">
                    <span class="mr-20">余额：<em class="c-blue">￥{{payList.remaining}}</em></span>
                    <span class="radio_group"><input type="radio" v-model="d.payType" name="onlinea" id="online0" :value="key" checked> <label for="online0"></label></span>
                  </div>
                </li>
                <li v-if="key=='alipay'">
                  <div class="zhifuItemLeft">
                    <i class="iconfont icon-alipay"></i>
                    <span>支付宝</span>
                  </div>
                  <div class="zhifuItemRight">
                    <span class="radio_group"><input type="radio" v-model="d.payType" name="onlinea" id="online1" :value="key"> <label for="online1"></label></span>
                  </div>
                </li>
                <li v-if="key=='wxpay'">
                  <div class="zhifuItemLeft">
                    <i class="iconfont icon-weixin"></i>
                    <span>微信</span>
                  </div>
                  <div class="zhifuItemRight">
                    <span class="radio_group"><input type="radio" v-model="d.payType" name="onlinea" id="online2" :value="key"> <label for="online2"></label></span>
                  </div>
                </li>
              </template>
            </ul>
            <div class="clickPayBtn">
              <button @click="querenfuk">确定付款</button>
            </div>
          </div>
      </layerShade>
    </transition>
  </div>
</template>

<script>
  import cHead from '@/components/header';
  import inpgroup from '@/components/inpgroup';
  import layerShade from '@/components/shade.vue';
  import { Toast, Indicator } from 'mint-ui'
  import {
    select_bigtype, appselect_combo, submitpay,select_city , select_physicalstore,
    setorder_combo, mymoneypay, wxpaymobile, alipaywap
  } from '@/api/api.js'

  export default {
    name: 'app',
    data () {
      return {
        user:{},
        name: '购买',
        isline:'1',   //1线上 2线下
        toggle: false,
        mayb: false,
        d: {
          bigType:null,  //体系id
          level: 1,       //课程级别
          combo_data: 0,   //课时包类型
          cityid: null,    //城市id
          readg:null,        //阅读馆
          payType: null
        },
        payList:{},     //支付类型
        bigType:[],     //课程体系数据
        level:[],       //课程级别数据
        combo:[],       //课时包类型数据
        citylist:[],     //城市
        readg:[],        //阅读馆
        combidinfo:{}   //订单信息
      }
    },
    computed: {
      bigtypeid () {
        return this.d.bigType;
      },
      kebao () {
        if(this.combo[this.d.combo_data]){
          return this.combo[this.d.combo_data].zhekouprice
        }else {
          return '0.00'
        }
      }
    },
    watch: {
      isline: function () {
        this.select_bigtype();
      },
      bigtypeid: function(n, v){
        this.appselect_combo();
      }
    },
    created () {
      this.user = JSON.parse(localStorage.user).data;
      if(sessionStorage.order){
        this.combidinfo = JSON.parse(sessionStorage.order).order;
      }

      this.select_bigtype();
      this.submitpay(); //支付
    },
    methods: {
      back () {
        history.go(-1);
      },
      Toggle(b) {
        this.toggle = b;
      },
      maytoggle (b) {
        this.mayb = b;
      },
      select_bigtype () {
        const cache = dataCache.buyCache['isline'+this.isline];
        if(cache){
          this.bigType = cache.data;
          this.d.bigType = cache.data[0].id;
          this.appselect_combo();
          if(this.isline==2){
            this.select_city();
          }
          return ;
        }
        Indicator.open();
        select_bigtype({ type:this.isline,cklogin:this.user.token }).then( res => {
          Indicator.close();
          var result = res.data;
          if(result.status==1){
            dataCache.buyCache['isline'+this.isline] = result;
            this.bigType = result.data;
            this.d.bigType = this.combidinfo.bigtype||result.data[0].id;
            if(this.isline==2){
              this.select_city();
            }
          }
        }, () => {
          Indicator.close();
        })
      },
      appselect_combo () {
        var cache = dataCache.buyCache['bigType'+this.d.bigType+'0'+this.isline];
        if(cache){
          this.level = cache.level_data;
          this.d.level = cache.level_data[0].level;
          this.combo = cache.combo_data;
          this.d.combo_data = 0;
          return ;
        }
        Indicator.open();
        appselect_combo({ bigtype:this.d.bigType,cklogin:this.user.token }).then( res => {
          Indicator.close();
          const result = res.data;
          if(result.status==1){
            dataCache.buyCache['bigType'+this.d.bigType+'0'+this.isline] = result;
            this.level = result.level_data;
            this.d.level = this.combidinfo.level||result.level_data[0].level;
            this.combo = result.combo_data;
            this.d.combo_data = 0;
            if(this.combidinfo.comboid){
              this.combo.forEach( (item,i)=> {
                if(item.id==this.combidinfo.comboid){
                  this.d.combo_data = i;
                }
              })
            }
          }
        }, () => {
          Indicator.close();
        })
      },
      select_city () {
        var cache = dataCache.buyCache['city'+this.d.bigType];
        if(cache){
          this.citylist = cache.data;
          this.d.cityid = cache.data[0].id;
          this.select_physicalstore();
          return ;
        }
        Indicator.open();
        select_city({ bigtype:this.d.bigType,cklogin:this.user.token }).then( res => {
          Indicator.close();
          const result = res.data;
          if(result.status==1){
            dataCache.buyCache['city'+this.d.bigType] = result;
            this.citylist = result.data;
            this.d.cityid = result.data[0].id;
            this.select_physicalstore();
          }
        }, () => {
          Indicator.close();
        })
      },
      select_physicalstore () {
        var cache = dataCache.buyCache['cityid'+this.d.cityid];
        if(cache){
          this.readg = cache.data;
          this.d.readg = this.readg[0].id;
          return ;
        }
        Indicator.open();
        select_physicalstore({ cityid:this.d.cityid, cklogin:this.user.token.replace(/\/+/g,'%2F').replace(/\+/g,'%2B') }).then( res => {
          Indicator.close();
          const result = res.data;
          if(result.status==1){
            dataCache.buyCache['cityid'+this.d.cityid] = result;
            this.readg = result.data;
            this.d.readg = this.readg[0].id;
          }
        }, () => {
          Indicator.close();
        })
      },
      submitpay () {
        submitpay({cklogin: this.user.token}).then( res => {
          const result = res.data;
          if(result.status==1){
            this.payList = result;
            for(let i in result.paytype){
              console.log(i)
              this.d.payType = i;
              break;
            }
          }else if(result.status==0){
            Toast('登录失效,请重新登录');
            setTimeout(function(){
              window.location.assign('login.html?reg=buyscheme');
            },2000)
          }
        }, () => {

        })
      },
      setorder_combo () {
        let obj = {
          cid: l_search.cid||JSON.parse(sessionStorage.order).cid,    //孩子id
          comboid: this.combo[this.d.combo_data].id,  //课时包id
          level: this.d.level,  //课程级别
          orderid: this.combidinfo.orderid||this.combidinfo.id,  //订单id
          bigtype: this.d.bigType,  //课程体系id
          storeid: this.d.readg,   //线下实体店id
          cklogin: this.user.token
        };
        Indicator.open();
        setorder_combo(obj).then( res => {
          Indicator.close();
          const result = res.data;
          if(result.status==1){
            this.mayb = true;
            this.combidinfo = result;
          }else if(result.status==-15) {
            setTimeout(function(){
              window.location.assign('login.html?reg=buyscheme');
            },2000)
            Toast(result.message);
          }else{
            Toast(result.message);
          }
        }, () => {
          Indicator.close();
        })
      },
      mymoneypay (succ) {
        Indicator.open()
        const d = this.combidinfo;
        mymoneypay({orderid: d.orderid, ordernumber: d.ordernumber, cklogin: this.user.token}).then( res => {
          Indicator.close();
          const result = res.data;
          if(result.status==1) {
            this.mayb = false;
            setTimeout(function(){
              window.location.replace(succ)
            },2000)
          }else if(result.status==-2){

          }
          Toast(result.message);
        }, () => {
          Indicator.close();
        })
      },
      alipaywap () {
        const d = this.combidinfo;
        window.location.assign('http://test.chel-c.com/api/pay/alipaywap?orderid='+d.orderid+'&ordernumber='+d.ordernumber+'&cklogin='+this.user.token.replace(/\/+/g,'%2F').replace(/\+/g,'%2B'))
        return ;
        alipaywap({orderid: d.orderid, ordernumber: d.ordernumber, cklogin: this.user.token}).then( res => {
          const result = res.data;
          console.log(result)
        }, () => {

        })
      },
      wxpaymobile () {
        const d = this.combidinfo;
        wxpaymobile({orderid: d.orderid, ordernumber: d.ordernumber, cklogin: this.user.token}).then( res => {
          const result = res.data;
          if(result.statusCode==1){
            window['jsApiParameters'] = result.jsApiParameters;
          }else{
            Toast(result.message);
          }
        }, () => {

        })
      },
      querenfuk () {
        const type = this.d.payType;
        if(this.isline==1){
          var zhidin = escape('formulate.html?cid='+(l_search.cid||JSON.parse(sessionStorage.order).cid)+'&bigtype='+this.d.bigType);
          var succ = 'paysuccess.html?url='+zhidin+'&phone='+escape(this.user.phone)+'&isline='+this.isline;
        }else{
          var succ = 'paysuccess.html?phone='+escape(this.user.phone)+'&isline='+this.isline;
        }
        switch (type){  //mymoneypay 余额支付  alipay 支付宝 wxpay 微信支付
          case 'mymoneypay':
                this.mymoneypay(succ);
                break;
          case 'alipay':
                this.alipaywap();
                break;
          case 'wxpay':
                this.wxpaymobile();
                break;
          default:;
        }
        console.log()
      }
    },
    components:{
      cHead, inpgroup, layerShade
    }
  }
</script>

<style>
.bounce-enter-active {
  animation: fadeInUp .5s;
}
.bounce-leave-active {
  animation: fadeInUp .5s reverse;
}

html,body,#app{background:#f0f0f0;}

.main{font-size: 0.4rem;color: #202020;margin-bottom:1.44rem;}
.choice{background: white;margin-top: 0.13333rem;font-size:0.3466667rem;}
.choice>li .blueline{float: left;width:0.13333rem;background: #37b7ff;height:0.2933333rem;border-radius: 0.04rem;margin:0.42666rem 0.2rem 0 0;}
.choice>li{height: 1.173333rem;border-bottom: 0.013333rem solid #eaeaea;margin:0 0.4rem;line-height: 1.173333rem}
.choice>li:last-of-type{border-bottom:0;}
.choice>li:first-of-type,.choice>li.special{margin:0;padding:0 0.4rem;}
.choice>li.special span{margin-top:0.386666rem;margin-right: 0.76rem;}
.choice>li.select span{float:left;}
.choice>li.select i{float:right;font-size: 0.34rem;color: #808080;margin-left: 0.12rem;}
.choice>li.select select{display:block;float: right;text-align: right;border:0;outline:none;color:#808080;
  background:transparent;
  height: 100%;
  padding:0 .2rem;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;}

.ksbtype li.select{height:1.613333rem;position: relative;line-height:normal;padding:0.32rem 0;}
.ksbtype li.select>div>.slefta{font-size: 0.4rem;color: #000000;font-weight: bold;margin-bottom: 0.16rem;}
.ksbtype li.select>div>.sleftb{font-size:0.3466666rem;color: #fe2f4d;line-height:0.36rem;}
.ksbtype li.select>div>.sleftb .discount{font-size: 0.24rem;background:#fe2f4d;color: white;border-radius: 0.04rem;padding:0 0.08rem;float: left;margin-right: 0.13333rem;}
.ksbtype li.select>div>.sleftb .saving{font-size:0.293333rem;color:#808080;margin-left:0.24rem;}
.ksbtype li.select>div>.sleftb .small{font-size: 0.266667rem;}
.ksbtype li.select>div>.sleftb .jine{font-weight: bold}

.ksbtype li.select span.define_radio{position: absolute;top:0.52rem;right: 0;}

.foot{height: 1.3066667rem;background:blue;position: fixed;bottom: 0;width: 100%;border-top:0.013333rem solid #dfdfdf;}
.foot>span{width: 50%;float: left;font-size: 0.4rem;text-align: center;line-height: 1.3066667rem;}
.foot>span:first-of-type{background:white;font-size: 0.453333rem;color: #ff6e18;font-weight: bold;}
.foot>span:first-of-type span{font-size:0.346666rem;font-weight:normal;}
.foot>span:last-of-type{background:#ff6e18;color: white}

.define_radio{font-size: 0.3733rem;width:0.5866rem;height:0.5866rem;}
.define_radio input{background:;padding: 0;margin: 0;border: 0;width:0.5866rem;height:0.5866rem;float:left;position: relative;-webkit-appearance: none;}
.define_radio input:after{content:"";display:block;background:white;width:0.5866rem;height:0.5866rem;border:0.04rem solid #d7d7d7;border-radius: 50%;box-sizing:border-box;}
.define_radio input:checked:after{content:"";display:block;width:0.5866rem;height:0.5866rem;background:#008bd9;border-radius:50%;border:0;}
.define_radio input:checked:before{content:"";display:block;position:absolute;top:0.14rem;left:0.12rem;width:0.28rem;height:0.18rem;border:0.04rem solid #ffffff;z-index:5;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);border-top:0;border-right:0;}

.ruheshangke{position:absolute;left:0;bottom:0;z-index:1;width:100%;height:6.66rem;background:#ffffff;padding:.666rem .533rem;overflow-y: scroll;}
.ruheshangke .blueline{float: left;width:0.13333rem;background: #37b7ff;height:0.2933333rem;border-radius: 0.04rem;margin:0 0.2rem 0 0;}
.ruheshangke ul{}
.ruheshangke ul li{font-size:.36rem;display: flex;align-items: center;}
.ruheshangke ul li:first-child{margin-bottom:.333rem;}
.ruheshangke ul li p{color:#707070;font-size:.32rem;}

.immediatePay{position:absolute;left:0;bottom:0;width:100%;height:8.88rem;background:#ffffff;overflow-y: scroll;padding-bottom:.266rem;}
.immediatePay .money{text-align:center;padding:.4rem 0 .666rem 0;}
.immediatePay .money h6{font-weight: bold;font-size:.4rem;color:#000000;margin-bottom:.4rem;}
.immediatePay .money p{font-size:.533rem;color:#808080;}

.immediatePay ul{}
.immediatePay ul li:first-child{border-top:1px solid #f0f0f0;}
.immediatePay ul li{display:-webkit-box;display:box;display:-webkit-flex;display:flex;padding:.266rem .4rem;border-bottom:1px solid #f0f0f0;font-size:.373rem;}
.immediatePay ul li .zhifuItemLeft{display:-webkit-box;display:box;display:-webkit-flex;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-flex:1;flex:1;}
.immediatePay ul li .zhifuItemLeft .iconfont{font-size:.5rem;margin-right:.266rem;}
.immediatePay ul li .zhifuItemLeft .iconfont.icon-yue{color:#008bda;}
.immediatePay ul li .zhifuItemLeft .iconfont.icon-alipay{color:#00a9f2;}
.immediatePay ul li .zhifuItemLeft .iconfont.icon-weixin{color:#00d200;}
.immediatePay ul li .zhifuItemLeft span{display: block;color:#000000;}

.immediatePay ul li .zhifuItemRight{display:-webkit-box;display:box;display:-webkit-flex;display:flex;-webkit-box-align:center;align-items:center;}
.immediatePay ul li .zhifuItemRight .radio_group label{padding-left:0}

.immediatePay .clickPayBtn{padding:0 .4rem;margin-top:1rem;}
.immediatePay .clickPayBtn button{background:#008bda;color:#ffffff;width:100%;height:1.2rem;border:0;border-radius:.1rem;font-size:.4rem;}
</style>
s
