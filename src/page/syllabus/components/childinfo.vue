<template>
  <div class="cm-childInfo">
      <div class="cm-childInfo-left">
        <img :src="img" alt="">
      </div>
      <div class="cm-childInfo-center">
         <p>
           <strong v-if="childName" v-text="childName"></strong>
           <i v-if="childSex" :class="cs" class="iconfont"></i>
           <span v-if="childAge" v-text="childAge+'岁'"></span>
           <button v-if="childLevel" v-text="'level'+childLevel"></button>
         </p>
         <span class="cm-classtixi" v-if="childType" v-text="childType"></span>
      </div>
      <div class="cm-childInfo-right" v-if="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
  export default {
    props:['img', 'childName', 'childSex', 'childAge', 'childLevel', 'childType', 'right'],
    data () {
      return {

      }
    },
    computed: {
      cs () {
        if(this.childSex==1||this.childSex=='男'){
          return {'icon-man':true}
        }else{
          return {'icon-nv':true}
        }
      }
    },
    mounted () {
      console.log(this.right)
    }
  }
</script>

<style>
  .cm-childInfo{background:#ffffff;display: -webkit-box;display: box;-webkit-box-align:center;display:-webkit-flex;display: flex;align-items: center;}
  .cm-childInfo .cm-childInfo-left{width:1.6rem;height: 1.6rem;margin-right:.266rem;border-radius:100%;overflow: hidden;}
  .cm-childInfo .cm-childInfo-left img{width: 100%;display: block;}

  .cm-childInfo .cm-childInfo-center{-webkit-box-flex: 1;flex: 1;width:4rem;}
  .cm-childInfo .cm-childInfo-center p{display: -webkit-box;display: box;-webkit-box-align:center;display:-webkit-flex;display: flex;align-items: center;margin-bottom:.266rem;}
  .cm-childInfo .cm-childInfo-center p strong{color:#000000;font-size:.4rem;margin-right:.133rem;max-width:2rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .cm-childInfo .cm-childInfo-center p .iconfont{font-size:.266rem;margin-right:.133rem;line-height: 0px;}
  .cm-childInfo .cm-childInfo-center p .icon-man{color:#008bd8;}
  .cm-childInfo .cm-childInfo-center p .icon-nv{color:#ff7677;}
  .cm-childInfo .cm-childInfo-center p span{font-size:.344rem;color:#808080;margin-right:.133rem;}
  .cm-childInfo .cm-childInfo-center p button{background:#18c196;border:0;padding:.133rem;color:#ffffff;font-size:.266rem;border-radius:.1rem;margin-right:.133rem;}
  .cm-childInfo .cm-childInfo-center .cm-classtixi{display:block;max-width:4rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size:.32rem;color:#008bd9;}

  .cm-childInfo .cm-childInfo-right{}
  .cm-childInfo .cm-childInfo-right a{font-size:.377rem;background:#008bd8;text-align:center;color:#ffffff;padding:.233rem .466rem;border-radius:.8rem;}
</style>
