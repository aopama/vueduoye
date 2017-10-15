<template>
  <div id="app">
    <cHead left="left" right="true" :name="name">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
      <a slot="headerRight" class="formulate" href="addchild.html?reg=mybaby">添加</a>
    </cHead>
    <div class="nobaby" v-if="nohave">
      <div class="addChild">
        <img class="syllabusChild" src="static/img/child.png" alt="">
        <p class="mt-40">你还没有添加你的宝贝哦~</p>
        <a class="mt-50" href="addchild.html?reg=syllabus" >立即添加</a>
      </div>
    </div>
    <div class="main"  v-else>
      <ul class="baby_con">
        <li v-for="item in dataList">
          <a :href="'addchild.html?reg=mybaby&cid='+item.childid" style="-webkit-tap-highlight-color: #000;-webkit-tap-highlight-color:transparent;">
            <section class="bc_top" @click="edit()">
              <div class="imgwrap"><img :src="curldizhi+item.face"></div>
              <section class="top_msg">
                <p class="first" :class="{'none':!item.type}">
                  <span class="name">{{item.cname}}</span>
                  <i class="iconfont" :class="{'icon-man':item.sex==1,'icon-nv':item.sex==2}"></i>
                  <span class="age">{{item.age}}岁</span>
                  <span class="level">level{{item.classlevel}}</span>
                  <!--<span class="report">体验报告</span>-->
                </p>
                <p class="tixi" :class="{'hide':!item.type}">{{item.name}}</p>
                <i class="edit iconfont icon-weibiaoti2zhuanhuan"></i>
              </section>           
            </section>
          </a>  
          <section class="bc_bot">
            <span class="mg0">购买课时： <span>{{item.buy_total}}</span> 节</span>
            <span class="mg0">已约课时： <span class="blue">{{item.formulate_total}}</span> 节</span>
            <span>可约课时： <span class="blue">{{item.sytatal}}</span> 节</span>
            <span>已上课时： <span>{{item.attendclass_tatal}}</span> 节</span>
            <i @click="delchild(item.childid)" class="iconfont icon-guanbi" style="float:right;margin-top:-0.9rem;font-size:0.5rem;"></i>
          </section>          
        </li>
      </ul>
    <p class="text-c pd-30 ft-20" v-if="meile">全部加载完成</p>
    </div>
  </div>
</template>

<script>
import cHead from '@/components/header.vue'
import { Toast, Indicator,MessageBox  } from 'mint-ui'
import { getChildListById,delchildren} from '@/api/api.js'

export default {
  name: 'app',
  data () {
    return {
      curldizhi:'',
      name: '我的宝贝',
      dataList: [],
      userobj: JSON.parse(localStorage.user),
      meile:false,
      nohave:false
    }
  },
  created () {
    this.curldizhi = this.cImgurldizhi;
    this.getChildListById()
  },
  methods: {
    back () {
      history.go(-1);
    },
    getChildListById () {
      Indicator.open()
      getChildListById({id:this.userobj.data.id,cklogin:this.userobj.data.token}).then( res => {
        Indicator.close()
        let result = res.data;
        if(result.statusCode==1){
          this.dataList = result.data
          this.meile = true
        }else if(result.statusCode==-8){
          this.nohave=true
        }
        
      })
    },
    //删除孩子
    delchild(index){
      MessageBox.confirm('', {
                message: '确定删除？',
                title: '提示',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(action => {
                if (action == 'confirm') {
                  Indicator.open()
                  delchildren({id:index,cklogin:this.userobj.data.token}).then(res=>{
                    Indicator.close()
                    let result = res.data;
                    if(result.statusCode==1){
                      Toast("删除成功!")          
                      history.go(0)
                    }else{
                      Toast(result.message);
                    }
                  }) 
                }
            }).catch(err => {
                if (err == 'cancel') {
                    
                }
            });    
    } 
  },
  components:{
    cHead
  }
}
</script>

<style>

.nobaby{position: fixed;background: white;width: 100%;height: 100%;}
.mtop-200{margin-top:2.6rem!important;}
.mtop-100{margin-top:1.3rem!important;}

.addChild{margin-top: 4rem;}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.373rem;color:#808080;text-align:center;}
.addChild>a{display:block;width:3.6rem;height:1.066rem;text-align:center;line-height:1.066rem;color:#ffffff;background:#008bd9;font-size:.4rem;border-radius:.1rem;margin:auto;}


.bannner img{width: 100%;height: auto;}
body{background: #f0f0f0;}
.main{margin:0.4rem;margin-top:0;padding-top:1.6rem;}
.baby_con{}
.baby_con li{background: white;margin-top:0.4rem;border-radius:0.08rem;padding:0 0.4rem;}
.baby_con li:first-of-type{margin-top: 0;}
/*.baby_con li:last-of-type{margin-top: 0;}*/
.baby_con li .bc_top{height:2.58667rem;display: flex;font-size:0.32rem;border-bottom:0.013333rem solid #eaeaea;padding:0.48rem 0;}
.baby_con li .bc_top .imgwrap{height:1.6rem;width: 1.6rem;margin-right: 0.28rem;border-radius: 50%;overflow: hidden}
.baby_con li .bc_top .imgwrap img{height:1.6rem;width: 1.6rem;}
.baby_con li .bc_top .top_msg{flex: 1}
.baby_con li .bc_top .top_msg .first{line-height:0.66667rem;overflow: hidden;margin-top: 0.2rem;}
.baby_con li .bc_top .top_msg .none{margin-top: 0.453333rem !important;}
.top_msg .first *{float: left;}
.top_msg .first .name{font-size: 0.4rem;color:#000}
.top_msg .first .age{color: #808080;margin-right: 0.26667rem;}
.top_msg .first i{color: #ff7677;font-size: 0.28rem;margin:0 0.2rem;}
.top_msg .first i.icon-man{color:#42bef4 ;}
.top_msg .first .level{color: white;background:#18c196;height: 0.44rem;line-height: 0.48rem;margin-top:0.13333rem;padding:0 0.12rem;border-radius: 0.04rem;}
.top_msg .first .report{color: #008bd9;background:white;border-radius: 0.05333rem;border:1px solid #008bd9;height:0.66667rem;float: right;padding: 0 0.13333rem;}
.baby_con li .bc_top .top_msg .tixi{color: #008bd9;line-height: 0.6rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:6.52rem;}
.top_msg .edit{float: right;margin-top: -0.8rem;font-size: 0.45rem;color:#000}

.baby_con li .bc_bot{height:1.94667rem;font-size: 0.373333rem;padding:0.36rem 0;}
.baby_con li .bc_bot>span{color:#333333;line-height: 0.44rem;margin-top:0.32rem;float: left;width: 50%;}
.baby_con li .bc_bot .blue{color: #008bd9;}
.baby_con li .bc_bot>span:nth-child(2n+1){display:block;width:49.999%;}

</style>
