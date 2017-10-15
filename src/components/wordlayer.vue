<template>
	<div class="popup" @click.self="closelayer">
        <div class="wrap">
          <div class="con">
            <P class="tit">课程新词</P>
            <p class="detail" v-text="keywords?keywords:'暂无'"></p>
            <P class="tit titT">核心语法</P>
            <P class="detail" v-text="grammar_num?grammar_num:'暂无'"></P>
          </div>
          <span class="close" @click="closelayer"><img src="static/img/close.png"></span>
        </div>
      </div>
</template>

<script>
export default{
	name: 'app',
  props:['keywords', 'grammar_num'],//核心单词 ，语法
  data () {
    return{}
  },
  methods:{
    closelayer () {
      this.$parent.closelayer()
    },
  }
}
</script>

<style>
.popup{position: fixed;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index:99;}
.popup .wrap{width: 8rem;padding:0.6rem;background: white;max-height: 10rem;border-radius: 0.08rem;position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);overflow: hidden;}
.popup .con{background:;max-height:8.8rem;overflow:auto;}
.popup .con .tit{font-size: 0.37333rem;color: #008bd8;text-align: center;font-weight: bold;}
.popup .con .titT{margin-top: 0.52rem;}
.popup .con .detail{font-size: 0.346667rem;color: #000000;margin-top: 0.28rem;line-height: 0.48rem;}
.popup .close{position: fixed;top:0.16rem;right:0.16rem;font-size: 0.4rem;}
.popup .close img{width: 0.4rem;height:0.4rem;}
</style>
