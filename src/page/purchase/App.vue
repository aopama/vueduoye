<template>
    <div id="app">
        <cHead left="left" right="true" :name="name">
            <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
        </cHead>
        <div class="nobaby" v-if="nohave">
            <div class="addChild">
              <img class="syllabusChild" src="static/img/child.png" alt="">
              <p class="mt-40">暂无购买记录</p>
            </div>
          </div>
        <div class="RurchaseRe" style="padding-top:1.2rem;" v-else>
                    <div class="r_item bg-white" v-for="item in dataList">
                        <div class="r_content">
                            <h3>{{item.cuname}}</h3>
                            <span class="mt-20" style="height:1px;background-color:#eaeaea;display:block"></span>
                            <div class="r_class">
                                <ul>
                                    <li class="r_sjje">
                                        <span class="r_title">实交金额：</span>
                                        <span class="r_money">￥{{item.reality_money}}</span>
                                    </li>
                                    <li>
                                        <span class="r_title">订单金额：</span>
                                        <span class="r_value">{{item.money}}</span>
                                    </li>
                                    <li>
                                        <span class="r_title">折扣金额：</span>
                                        <span class="r_value">{{item.discount}}</span>
                                    </li>
                                    <li>
                                        <span class="r_title">订单编号：</span>
                                        <span class="r_value">{{item.serial_number}}</span>
                                    </li>
                                    <li>
                                        <span class="r_title">订单日期：</span>
                                        <span class="r_value">{{item.paytime}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-c pd-30 ft-20" v-if="meile">全部加载完成</p>
    </div>
</template>
<script>
import cHead from '@/components/header.vue'
import { getAllorderByPid } from '@/api/api.js'
import { Indicator,Toast } from 'mint-ui';

export default{
    name: 'app',
    data () {
      return {
        nohave:false,
        name: '购买记录',
        userobj: JSON.parse(localStorage.user),
        dataList: [],
        meile:false
      }
    },
    created(){
        Indicator.open();
        
        this.getAllorderByPid()
    },
    methods: {
      back () {
        history.go(-1);
      },
      getAllorderByPid () {
        Indicator.open()
        getAllorderByPid({id:this.userobj.data.id,cklogin:this.userobj.data.token}).then( res => {
            Indicator.close()
            let result = res.data
            if(result.statusCode==1){
                this.dataList = result.data
                this.meile = true
            }else if(result.statusCode==-8){
                this.nohave=true
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
.nobaby{position: fixed;background: white;width: 100%;height: 100%;}
.addChild{margin-top:4.24rem;text-align: center}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.4rem;color:#808080;text-align:center;}

.RurchaseRe{display: flex;flex-direction: column;}
.RurchaseRe .r_item{margin:0.26rem 0.26rem 0 0.26rem;border-radius: 5px;}
.RurchaseRe .r_item .r_content{margin: 0.373rem}
.RurchaseRe .r_item .r_content .r_sjje{margin: 0.68rem 0;}
.RurchaseRe .r_item .r_content ul li{display:flex;justify-content:content;align-items: center;height:0.53rem}
.RurchaseRe .r_item .r_content h3{font-size: 0.373rem;font-weight: bold;}
.RurchaseRe .r_item .r_content .r_class .r_title{font-size:0.32rem;color:#808080}
.RurchaseRe .r_item .r_content .r_class .r_money{font-size: 0.533rem;color:black;}
.RurchaseRe .r_item .r_content .r_class .r_value{font-size: 0.32rem;color:black}
</style>
