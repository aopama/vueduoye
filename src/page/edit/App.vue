<template>
	<div id="app">
		<cHead :name="name" left="true" right="true">
	      	<i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back"></i>
	      	<a slot="headerRight" class="c-white" href="javascript:void(0);" @click="finish">完成</a>
	    </cHead>
	    <div class="edit_main">
	        <p class="edit_tit">头像</p>
	        <div class="head_warp cl" id="url2">
	            <div class="left z" >
	                <img :src="curldizhi+url" />
	            </div>
	            <!-- <div class="right z">
	                <span id="upimg" class="btnup">点击上传</span>
	            </div> -->
	        </div>
	        <p class="edit_tit">昵称</p>
	        <div class="name">
	            <input class="z" type="text" id="name" placeholder="昵称"  v-model="myname" >
	            <!--<i @click="clear" class="right icon-guanbi1 y"></i>-->
	        </div>
	        <p class="edit_tit">性别</p>
	        <div class="sex cl">
              <span class="radio_group man z pos">
                  <input type="radio" value="1" v-model="picked" id="one"/>
                  <label for="one">男</label>
              </span>
              <span class="radio_group man z pos">
                  <input type="radio" value="2" v-model="picked" id="two"/>
                  <label for="two">女</label>
              </span>
	            <!-- <div class="man z pos">
	              	<i class="z iconfont" :class="{ 'icon-danxuan': isa, 'icon-danxuan1': isb }"></i>
	              	<input type="radio" id="one" value="1" v-model="picked">
	              	<span class="z">男</span>
	            </div>
	            <div class="woman z pos">
	                <i class="z iconfont" :class="{ 'icon-danxuan': isc, 'icon-danxuan1': isd }"></i>
	                <input type="radio" id="two" value="2" v-model="picked">
	                <span class="z">女</span>
	            </div> -->
	            <!-- <i class="iconfont icon-danxuan"></i> -->
	        </div>
	        <div class="btn">
	            <button class="finish" @click="finish">完成</button>
	        </div>
	    </div>
      <!-- {{url}} -->
	</div>
</template>
<script>
  import cHead from '@/components/header.vue';
  import { Toast, Indicator } from 'mint-ui'
  import { getpersonal,getToken,setpersonal} from '@/api/api.js'
  export default{
  	name:'edit',
  	data () {
  		return {
        curldizhi:'',
  			name:'个人资料',
  			myname:'',	//名字
  			picked:'',	//性别
  			isa:false,
  			isb:true,
  			isc:false,
  			isd:true,
  			imgtoken:null,
  			url:'',
        ismoren:'',
        morennan:'/themes/simplebootx/Public/img/patriarch_1.png',
        morennv:'/themes/simplebootx/Public/img/patriarch_2.png'
  		}
  	},
  	created () {
      this.curldizhi = this.cImgurldizhi;
  		var _self = this;
  		var user = JSON.parse(localStorage.user)
  		Indicator.open()
  		getpersonal({id:user.data.id,cklogin:user.data.token}).then( res => {
  			let result = res.data
  			Indicator.close()
  			if(result.statusCode == 1){
  				_self.myname = result.data.pname
  				_self.picked = result.data.sex
          if(!result.data.faceurl){
            _self.ismoren='1'
          }
          _self.url = result.data.faceurl
          this.sexempty()
  			}
  		})

  		// _self.demo()
  		// var timer = null;
    //     timer = setInterval(function() {
    //        var val = _self.imgtoken;
    //         if (val) {
    //             _self.upto()
    //             clearInterval(timer);
    //         }
    //     }, 20);
  	},
  	watch : {
  		picked: function () {
        if(this.picked == 1){
	    		this.isa = true
	    		this.isb = false
	    		this.isc = false
	    		this.isd = true
          if(this.ismoren=='1'){
            this.url = this.morennan
          }
	    	}else if(this.picked == 2){
	    		this.isa = false
	    		this.isb = true
	    		this.isc = true
	    		this.isd = false
          if(this.ismoren=='1'){
            this.url = this.morennv
          }
	    	}else{
          this.isa = false
          this.isb = true
          this.isc = false
          this.isd = true
          if(this.ismoren=='1'){
            this.url = this.morennan
          }

        }
  		}
  	},
  	methods:{
  		back () {
	        history.go(-1)
	    },
      sexempty () {
        if(this.picked == ''){
          this.isa = false
          this.isb = true
          this.isc = false
          this.isd = true
          if(this.ismoren=='1'){
            this.url = this.morennan
          }

        }
      },
	    finish () {
	    	var _self=this
	        // Indicator.open();
	        var urlt='';
	        // if(_self.url=='static/img/head.png'){
	        //   urlt=='';
	        // }else{
	        //   urlt=_self.url;
	        // }
	        const userobj = JSON.parse(localStorage.user);
	        console.log(userobj.data.id,urlt,_self.picked,_self.myname,userobj.data.token)
	        setpersonal({id:userobj.data.id,sex:_self.picked,pname:_self.myname,cklogin:userobj.data.token}).then(res => {
	        	let result = res.data
	        	if(result.statusCode == 1){
	        		//修改缓存头像//昵称
	                var getuser=JSON.parse(localStorage.getItem("user"));
	                getuser.data.pname=_self.myname;
	                // getuser.data.faceurl=urlt;
	                getuser.data.sex=_self.picked;
	                localStorage.user=JSON.stringify(getuser)
	                window.location.href='my.html'
	        	}
	        })

	    },
	    //上传图片获取token
	    demo () {
	    	let _self=this;
	        //请求获取imgtoken
	        getToken({}).then( res =>{
	        	_self.imgtoken=res.data;
	        })
	    },
	    upto () {
	    		let _self=this;
              	var uploader = Qiniu.uploader({
                  runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                  browse_button: 'upimg',         // 上传选择的点选按钮，必需
                  multi_selection: false,
                  uptoken :_self.imgtoken, // uptoken是上传凭证，由其他程序生成
                  get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                  unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                  domain: 'http://opcr7ahpg.bkt.clouddn.com/',     // bucket域名，下载资源时用到，必需
                  'bucket':'vipchelc',
                  container: 'url2',             // 上传区域DOM ID，默认是browser_button的父元素
                  max_file_size: '100mb',             // 最大文件体积限制
                  flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                  max_retries: 3,                     // 上传失败最大重试次数
                  dragdrop: true,                     // 开启可拖曳上传
                  drop_element: 'url2',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                  chunk_size: '4mb',                  // 分块上传时，每块的体积
                  auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                  filters:{
                    mime_types:[{title:'Image files',extensions:'jpg,jpeg,png'}]
                  },
                  init: {
                      'FilesAdded': function(up, files) {
                          plupload.each(files, function(file){
                              // 文件添加进队列后，处理相关的事情
                          });
                      },
                      'BeforeUpload': function(up, file) {
                          // 每个文件上传前，处理相关的事情

                      },
                      'UploadProgress': function(up, file) {
                            // 每个文件上传时，处理相关的事情
                      },
                      'FileUploaded': function(up, file, info) {
                          // Toast({
                          //     message:'上传成功！',
                          //     position: 'bottom',
                          //     duration:1000
                          //   })
                        var url=JSON.parse(info);
                        _self.url=UrlPj.qiniuImg+url.key;

                      },
                      'Error': function(up, err, errTip) {
                          console.log(errTip)
                      },
                      'UploadComplete': function() {
                            //队列文件处理完毕后，处理相关的事情
                      }

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
	#app,body,html{background: #f0f0f0;}
.radio_group{float:left;color: #202020;font-size: 0.34667rem;}
.radio_group input{float:left;background: ;padding: 0;margin: 0;border: 0;width:0.4rem;height:0.4rem;visibility:hidden;}
.radio_group label{position:relative;font-size: 0.34667rem;line-height:0.48rem;float: left;padding-left: 0.28rem;}
.radio_group label:after{content:"";display:block;width:0.48rem;height:0.48rem;background:#ffffff;position:absolute;top:0px;left:-0.4rem;border-radius: 50%;box-sizing: border-box;border:0.02667rem solid #d7d7d7;}
.radio_group input:checked+label:after{content:"";display:block;width:0.48rem;height:0.48rem;background:#008bd9;border-radius:50%;border:0;}
.radio_group input:checked+label:before{content:"";display:block;position:absolute;top:0.106667rem;left:-0.306667rem;width:0.25333rem;height:0.16rem;border:0.04rem solid #ffffff;z-index:5;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);border-top:0;border-right:0;}

    .edit_main{margin-top:1.12rem;}
    .edit_main .edit_tit{color:#333333;font-size:0.32rem;height:0.8rem;padding:0.28rem 0 0 0.4rem;}
    .edit_main .head_warp{width:100%;background:#fff;padding:0 0.4rem;height:2.3333rem;padding-top:0.4667rem;}
    .edit_main .head_warp .left{display:inline-block;width:1.3333rem;height:1.3333rem;border-radius:50%;overflow:hidden;}
    .edit_main .head_warp .left img{width:100%;height:100%;}
    .edit_main .head_warp .right .btnup{color:#808080;font-size:0.32rem;margin-left:0.4rem;}
    .edit_main .name{height:1.1733rem;line-height:1.1733rem;background:#fff;width:100%;padding:0 0.4rem;}
    .edit_main .name input{font-size: 0.4rem;color:#000;border: none;line-height:0.7rem;width:100%;padding:0.25rem 0;}
    .edit_main .name .icon-guanbi1{color:#aaa;font-size: 0.6rem;line-height: 1.2rem;}
    .edit_main .sex{width: 100%;height:1.17333rem;line-height: 1.1733rem;background:#fff;padding:0 0.4rem;}
    .edit_main .sex>span{margin-right:1rem;margin-top: 0.32rem;}
    /*.edit_main .sex span{color:#202020;font-size:0.3467rem;}
    .edit_main .sex i{font-size: 0.5rem;color:#008bd9;margin-right:0.1733rem;}
    .edit_main .sex i.icon-danxuan1{color:#b3b3b3;}
    .edit_main .sex .man{margin-right:0.8533rem;}
    .edit_main .sex .pos{position:relative;}
    .edit_main .sex input{position:absolute;top:0.3rem;left:0;width: 0.5rem;height: 0.5rem; -webkit-appearance: none;outline: none;background: none;border:0;}*/

    .edit_main .btn{width: 100%;padding:0 0.4rem;margin-top:1.0667rem;}
    .edit_main .btn .finish{width: 100%;background:#008bd9;height:1.12rem;line-height:1.12rem;font-size: 0.4rem;color:#fff;text-align: center;border: none;outline: none;border-radius: 0.1rem;}
    /* 清除浮动 */
.cl:before, .cl:after{ content:" "; display: table }
.cl:after{ clear: both }
.clb{clear:both;}
.cl { *zoom: 1 }
</style>