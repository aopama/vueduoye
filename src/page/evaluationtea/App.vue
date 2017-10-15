<template>
	<div id="app">
		<cHead style="background:#008bd9;color:#ffffff;" left="left" right="true" :name="name">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
    </cHead>
	  <div class="info">
	  	<div class="info-news">
	  		<div class="news-sub">
    			<span class="sub-series">{{dataList.csename}}</span>
    			<span class="sub-num">{{dataList.ranking}}</span>
    			<span class="sub-name">{{dataList.curname}}</span>
    		</div>
    		<div style="height:1px;border-top: 1px solid #e9ecf3;"></div>
    		<div class="news-tea">
    			<div class="tea-face">
    				<img :src="curldizhi+dataList.tface"/>
    			</div>
    			<span class="tea-name">{{dataList.e_name}}</span>
    		</div>
    		<div style="height:1px;border-top: 1px solid #e9ecf3;"></div>
    		<div class="news-stu">
    			<div class="stu-face">
    				<img :src="curldizhi+dataList.chface"/>
    			</div>
    			<span class="stu-name">{{dataList.chname}}</span>
    			<span class="stu-rank">level{{dataList.level}}</span>
    			<!-- <span class="stu-date">2017-07-30</span> -->
    			<span class="stu-time">{{dataList.starttime}}</span>
    		</div>
	  	</div>
	  	<div class="info-eval">
	  		<div class="eval-evaling" v-if="dataList.evaluate_star_teacher == 0 ">
	  			<div style="height: 1.3333rem;"></div>
	  			<div style="height:1px;border-top: 1px solid #EAEAEA;"></div>
	  			<span class="evaling-title">您对老师的评价</span>
	  			<div class="evaling-star">
	  				<span v-for="(n,index) in 5" class="star starbig iconfont icon-wujiaoxing-shi" @click="stareval(index)" :class="{'starlight':index<numstar}"></span>
	  			</div>
	  			<textarea type="text" class="evaling-text" v-model="str" rows="3" autofocus="autofocus" maxlength="100" placeholder="您的评价是老师的动力！"></textarea>
	  			<button class="evaling-submit" @click="sub_evaluate">发表评价</button>
	  		</div>
	  		<div class="eval-evaled" v-else>
	  			<div class="evaled-title ft-30">您的评价</div>
	  			<div style="height:1px;border-top: 1px solid #EAEAEA;"></div>
	  			<div class="evaled-star">
	  				<span v-for="(n, index) in 5" class="star iconfont icon-wujiaoxing-shi" :class="{'starlight':index<dataList.evaluate_star_teacher}"></span>
	  			</div>
	  			<p class="evaled-text ft-26" style="line-height: 0.6rem;text-align:justify; text-justify:inter-ideograph;">
	  			{{dataList.evaluate_comment_teacher}}
	  				<!-- 作为家长，我非常感谢老师的辛勤付出，孩子能遇到这么好的老师，在这么好的环境里学习，我们家长很放心也很满意。我们相信孩子在老师点点滴滴的教育下，会一天天地进步。希望孩子在以后会越来越好。谢谢老师，辛苦了！} -->
	  			</p>
	  		</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
	import cHead from '@/components/header.vue';
	import { Toast, Indicator } from 'mint-ui'
	import { sub_evaluate } from '@/api/api.js'
	export default {
	  name:'app',
		data () {
		  	return {
		  		curldizhi:'',
			    name:'评价老师',
			    str:"",
			    dataList: [],
			    numstar:'0',
			    userobj: JSON.parse(localStorage.user)
			}
		},
		created () {
			this.curldizhi = this.cImgurldizhi;
			this.dataList = JSON.parse(localStorage.evaluationtea)[0]
			
		},
		methods:{
			back () {
	          history.go(-1);
	        },
	        stareval (index) {
	        	this.numstar = index+1
	        },
	        sub_evaluate () {
	        	if(this.numstar<=0){
	        		console.log('请评价')
	        		return
	        	}
	        	if(this.str == ''){
	        		Toast({
					  message: '请写评语',
					  position: 'bottom',
					  duration: 5000
					})
	        		return
	        	}
	        	sub_evaluate({
	        		cid:this.dataList.id,
	        		star:this.numstar,
	        		info:this.str,
	        		cklogin:this.userobj.data.token
	        	}).then( res => {
	        		if(res.data.statusCode == 1){
	        			history.go(-1);
	        			var geteval=JSON.parse(localStorage.getItem("evaluationtea"))
	        			var geteval1=geteval[0]
	        			geteval1.evaluate_star_teacher = this.numstar
	        			geteval1.evaluate_comment_teacher = this.str
	        			localStorage.evaluationtea=JSON.stringify(geteval)
	        			
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
	.info{width:100%;height:100%;position:fixed;background:#fff;margin-top:1.2rem}
	.info .info-news{margin-top: 0.2667rem;background: #f6f9ff;padding: 0 0.5333rem;}
  .info .info-news .news-sub{font-size:.3733rem;height:1.1733rem;line-height:1.1733rem}
	.info .info-news .news-sub>span:nth-child(2){margin-left:.2667rem;margin-right:.2667rem}
	.info .info-news .news-tea{font-size:.3733rem;height:1.1733rem;line-height:1.1733rem}
	.info .info-news .news-tea .tea-face{display:inline-block;width:.8rem;height:.8rem}
	.info .info-news .news-tea .tea-face>img{width:100%;height:100%;border-radius:.4rem;-webkit-border-radius:.4rem;-moz-border-radius:.4rem}
	.info .info-news .news-tea .tea-name{padding:0 .4rem 0 .2rem;vertical-align:middle}
	.info .info-news .news-stu{font-size:.3733rem;position:relative;height:1.1733rem;line-height:1.1733rem}
	.info .info-news .news-stu .stu-face{display:inline-block;width:.8rem;height:.8rem}
	.info .info-news .news-stu .stu-face>img{width:100%;height:100%;border-radius:.4rem;-webkit-border-radius:.4rem;-moz-border-radius:.4rem}
	.info .info-news .news-stu .stu-name{padding:0 .4rem 0 .2rem;vertical-align:middle}
	.info .info-news .news-stu .stu-rank{font-size:.2667rem;padding:.06667rem 0.12rem;background:#17C196;vertical-align:middle;color: white;border-radius:0.0533333rem;}
	.info .info-news .news-stu .stu-date{font-size:.32rem;color:grey;position:absolute;right:1rem}
	.info .info-news .news-stu .stu-time{font-size:.32rem;color:grey;position:absolute;right:0}
	.info .info-eval .eval-evaling{padding:0 .5333rem;position:relative;text-align:center;}
	.info .info-eval .eval-evaling .evaling-title{background:#fff;font-size:.4rem;position:absolute;top:1.1rem;right:3.1rem;padding:0 .6rem}
	.info .info-eval .eval-evaling .evaling-star{height:2.4rem;line-height:2.4rem;}
	.info .info-eval .star{vertical-align:middle;font-size:.56rem;color:#d4d4d4;margin-right:0.24rem;}
	.info .info-eval .starbig{font-size: 0.73333rem !important;margin: 0 0.173333rem;}
	.info .info-eval .starlight{color:#fdaa01}
	.info .info-eval .eval-evaling .evaling-text{width:100%;line-height:.6667rem;font-size:.3467rem;color:#333333;padding:.1333rem .4rem;outline-color:#008BDA;border-color:#EAEAEA;border-radius:.0667rem}
	.info .info-eval .eval-evaling .evaling-submit{font-size:.4267rem;color:#fff;width:100%;height:1.1733rem;border:none;border-radius:.1333rem;background:#008BD9;margin-top:.9733rem}
	.info .info-eval .eval-evaled{padding: 0 0.5333rem;}
	.info .info-eval .eval-evaled .evaled-title{height: 1.3333rem;line-height: 1.3333rem;}
	.info .info-eval .eval-evaled .evaled-star{height: 1.3333rem;}
</style>