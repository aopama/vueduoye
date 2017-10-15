<template>
  <div id="app">
    <cHead style="background:#008bd9;color:#ffffff;" left="left" right="true" :name="name">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>
    <div class="nobaby" v-if="have === false">
    	<div class="addChild">
          <img class="syllabusChild" src="static/img/child.png" alt="">
          <p class="mt-40">暂无上课记录</p>
        </div>
    </div>
    <div class="haverec" v-else-if="have === true">
    	<div class="info" v-for="item in dataList">
    		<div class="info-sub">
    			<span class="sub-series" v-if="item.ranking!='demo'">{{item.csename}}</span>
    			<span class="sub-num" v-if="item.ranking!='demo'">{{item.ranking}}</span>
    			<span class="sub-name">{{item.curname}}</span>
    		</div>
    		<div class="info-tea">
    			<div class="tea-face">
    				<img :src="curldizhi+item.tface"/>
    			</div>
    			<span class="tea-name">{{item.e_name}}</span>
    			<span v-for="(n, index) in 5" class="star iconfont icon-wujiaoxing-shi staring" :class="{'stared':index<item.evaluate_star_child}"></span>
    		</div>
    		<div class="info-self">
    			<p style="text-align:justify">
    				<!-- Terrific job, Apple! You did outstanding conjugating the verb to come. You were also able to capitalize the days of the week/beginning word of the sentence; keep ... -->
                    {{item.evaluate_comment_child}}
    			</p>
    		</div>
    		<div style="height:1px;border-top: 1px solid #EAEAEA;"></div>
    		<div class="info-stu">
    			<div class="stu-face">
    				<img :src="curldizhi+item.chface"/>
    			</div>
    			<span class="stu-name">{{item.chname}}</span>
    			<span class="stu-rank">level{{item.level}}</span>
    			<!-- <span class="stu-date"></span> -->
    			<span class="stu-time">{{item.starttime}}</span>
    		</div>
    		<div style="height:1px;border-top: 1px solid #EAEAEA;"></div>
    		<div class="info-opt">
    			<a href="javascript:void(0)" v-if="item.ranking!='demo'" @click="skip(item.id)" class="opt-eval">评价老师</a>
    		</div>
    	</div>
    </div>
    <p class="text-c pd-30 ft-20" v-if="meile">全部加载完成</p>

  </div>
</template>
<script>
  import cHead from '@/components/header.vue';
  import { Toast, Indicator } from 'mint-ui'
  import { getAllClassInfoByPid } from '@/api/api.js'

  export default {
    name:'app',
    data () {
      return {
        curldizhi:'',
        name:'上课记录',
        userobj: JSON.parse(localStorage.user),
        dataList: [],
        have:true,
        isLight:[true,false,false,false,false],
        meile:false
      }
    },
    created () {
        this.curldizhi = this.cImgurldizhi;
        this.getAllClassInfoByPid()
    },
    // computed: {
    //     selectinfo: function (id){
    //         var self = this
    //         var oid = id
    //         console.log(id)
    //         // var dataList = this.dataList
    //         return self.dataList.filter(function(user){
    //             return user.id == oid
    //             // console.log(user)
    //         })
    //     }
    // },
    methods: {
        back () {
          history.go(-1);
        },
        returnval (id) {
            var self = this
            var oid = id
            return self.dataList.filter(function(user){
                return user.id == oid
            })
        },
        skip (id) {
            // console.log(JSON.stringify(this.returnval(id)))
            // console.log(id)
            localStorage.evaluationtea = JSON.stringify(this.returnval(id))

            window.location.href='evaluationtea.html'
        },
        getAllClassInfoByPid () {
            Indicator.open()
            getAllClassInfoByPid({id:this.userobj.data.id,cklogin:this.userobj.data.token}).then( res => {
                Indicator.close()
                let result = res.data
                if(result.statusCode == 1){
                    this.dataList = result.data
                    this.meile = true
                }else if(result.statusCode == -8){
                    this.have=false
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
#app,html,body{background: #f0f0f0;}
.nobaby{position: fixed;background: white;width: 100%;height: 100%;}
.addChild{margin-top:4.24rem;text-align: center}
.addChild>img{width:2.666rem;height:4.133rem;display:block;margin:auto;}
.addChild>p{font-size:.4rem;color:#808080;text-align:center;}
.addChild>a{display:block;width:3.6rem;height:1.066rem;text-align:center;line-height:1.066rem;color:#ffffff;background:#008bd9;font-size:.4rem;border-radius:.1rem;margin:auto;}

	.haverec{background:#f0f0f0;margin-top:1.46667rem;padding:0 .2667rem}
	.haverec .info{width:100%;padding:0 .4rem 0 .4rem;background:#fff;margin-top:0.26667rem;border-radius: 0.08rem;}
  .haverec .info .info-sub{font-size:.3733rem;height:1.1733rem;line-height:1.1733rem}
	.haverec .info .info-sub>span:nth-child(2){margin-left:.2667rem;margin-right:.2667rem}
	.haverec .info .info-tea{font-size:.3733rem;height:.9rem;line-height:.9rem}
	.haverec .info .info-tea .tea-face{display:inline-block;width:.8rem;height:.8rem}
	.haverec .info .info-tea .tea-face>img{width:100%;height:100%;border-radius:.4rem;-webkit-border-radius:.4rem;-moz-border-radius:.4rem}
	.haverec .info .info-tea .tea-name{padding:0 .4rem 0 .2rem;vertical-align:middle}
	.haverec .info .info-tea .star{vertical-align:middle;font-size:.52rem;margin-right:0.24rem;}
	.staring{color:#d4d4d4}
	.stared{color:#fdaa01}
	.haverec .info .info-self{font-size:.32rem;padding:.2667rem 0 .4667rem 0}
	.haverec .info .info-stu{font-size:.3733rem;position:relative;height:1.1733rem;line-height:1.1733rem}
	.haverec .info .info-stu .stu-face{display:inline-block;width:.8rem;height:.8rem}
	.haverec .info .info-stu .stu-face>img{width:100%;height:100%;border-radius:.4rem;-webkit-border-radius:.4rem;-moz-border-radius:.4rem}
	.haverec .info .info-stu .stu-name{padding:0 .4rem 0 .2rem;vertical-align:middle}
	.haverec .info .info-stu .stu-rank{font-size:.2667rem;padding:0.05333rem .12rem;background:#17C196;vertical-align:middle;color: white;border-radius: 0.05333rem;}
	.haverec .info .info-stu .stu-date{font-size:.32rem;color:grey;position:absolute;right:1rem}
	.haverec .info .info-stu .stu-time{font-size:.32rem;color:grey;position:absolute;right:0}
	.haverec .info .info-opt{height:1.3333rem;padding-top:.04rem}
	.haverec .info .info-opt .opt-eval{display:inline-block;border:1px solid #008BDA;font-size:.32rem;color:#008BDA;vertical-align:middle;padding:.13333rem 0.16rem;border-radius: 0.04rem;}
	  
</style>
