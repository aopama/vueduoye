<template>
    <div id="app">
      <cHead left="left" right="true" :name="name">
        <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        <!--<a slot="headerRight" class="formulate" >添加</a>-->
      </cHead>
      <div class="nobaby" v-if="nohave">
        <div class="addChild">
          <img class="syllabusChild" src="static/img/child.png" alt="">
          <p class="mt-40">请先添加孩子再生成教学方案~</p>
          <a class="mt-50" href="addchild.html?reg=syllabus" >立即添加</a>
        </div>
      </div>
      <div class="t_content" style="padding-top:1.5rem;" v-else>
        <a v-for="(item,index) in dataList" :href="(item.mkfangan_url?item.mkfangan_url:item.mkfangan_urlofcreate)+'/cklogin/'+userobj.data.token">
          <div class="t_item" :class="{'mt-20':index!=0}">
              <div class="t_img">
                  <div class="t_imgtitle">
                      <img :src="curldizhi+item.face" alt="">
                  </div>
                  <span class="t_name">{{item.cname}}</span>
              </div>
              <a v-if="item.mkfangan_url" :href="item.mkfangan_url+'/cklogin/'+userobj.data.token"class="t_chakan">查看</a>
              <a v-else :href="item.mkfangan_urlofcreate+'/cklogin/'+userobj.data.token" class="t_chakan">创建</a>
              <div class="t_ico">
                <i slot="headerLeft" class="iconfont icon-youjiantou"></i>
              </div>
          </div>
        </a>
      </div>
      <p class="text-c pd-30 ft-20" v-if="meile">全部加载完成</p>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import { Toast, Indicator } from 'mint-ui'
import { getFanganById } from '@/api/api.js'

export default{
    name: 'app',
    data () {
      return {
        nohave:false,
        curldizhi:'',
        name: '教学方案',
        userobj: JSON.parse(localStorage.user),
        dataList:[],
        meile:false
      }
    },
    created () {
      this.curldizhi = this.cImgurldizhi;
      this.getFanganById()
    },
    methods: {
      back () {
        history.go(-1);
      },
      getFanganById () {
        Indicator.open();
        getFanganById({id:this.userobj.data.id,phone:this.userobj.data.phone,cklogin:this.userobj.data.token}).then( res=> {
          Indicator.close();
          let result = res.data
          if(result.statusCode == 1){
            this.dataList = result.data
            this.meile = true
          }else if(result.statusCode == -8){
            this.nohave = true
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
body{background-color: #f0f0f0;height: 100%}
img{width: 100%;height: 100%}

.nobaby{position: fixed;background: white;width: 100%;height: 100%;}
.addChild{margin-top:4.24rem;text-align: center}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.4rem;color:#808080;text-align:center;}
.addChild>a{display:block;width:3.6rem;height:1.066rem;text-align:center;line-height:1.066rem;color:#ffffff;background:#008bd9;font-size:.4rem;border-radius:.1rem;margin:auto;}

.t_content .t_item{width: 100%;background-color: white;padding:0.333rem;display: flex;align-items: center;}
.t_content .t_item .t_imgtitle{width: 1.333rem;height: 1.333rem;}
.t_content .t_item .t_imgtitle img{border-radius: 50%;}

.t_content .t_item .t_chakan{text-align: right;margin-right:0.2rem;font-size: 0.4rem;color: #808080}
.t_content .t_item .t_ico{display: flex;display:-webkit-flex;display:box;display:-webkit-box;-webkit-box-pack: center;}
.t_content .t_item .t_ico i{font-size:.4rem;display:block;color: #808080}
.t_content .t_item .t_img{display: flex;align-items: center;flex: 1}
.t_content .t_item .t_img .t_name{margin-left:.266rem;font-size: 0.4rem;color: #000000}
</style>
