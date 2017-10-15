<template>
  <div id="app">
    <cHead :name="name" left="true">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back"></i>
    </cHead>
    <div class="appContent main">
      <childmsg :csex="childSex" class="mt-20" :childNamea="childNamea" havechild="true" v-on:toggle="showName"></childmsg>
      <askAbout :peixun="peixun"></askAbout>
      <div class="interactionbtn">
        <button @click="addChild">完成</button>
      </div>
    </div>
    <englishName v-if="xianshi" v-on:toggle="showName" v-on:childNameb="childNameb"></englishName>
  </div>
</template>

<script>
  import cHead from '@/components/header';
  import askAbout from '@/components/askAbout';
  import childmsg from '@/components/childmsg';
  import englishName from '@/components/englishName';
  import { Toast, Indicator } from 'mint-ui'
  import { addchildren,lookchildren,editchildren } from '@/api/api.js'

  export default {  
    name: 'app',
    data () {
      return {
        Imageurl:'',
        name: '添加孩子',
        ischild:true,
        xianshi: false,
        childNamea: '',
        childSex:null,
        date: '',
        childobj:{},
        peixun:[1,1,1]
      }
    },
    created:function(){
      this.Imageurl = this.Imgurldizhi;
      if(l_search.cid){
        this.name="编辑孩子"
        this.lookchild()
      }      
    },
    watch:{
      childobj:function(){
        document.getElementById('c_childName').value=this.childobj.data.cname;        
        this.childNamea=this.childobj.data.e_name;
        this.date = this.childobj.data.age;
        this.$children[1].sex=this.childobj.data.sex;
        document.querySelectorAll('#askAbout input')[this.childobj.data.englishtime_training-1].checked=true;
        document.querySelectorAll('#englishBase input')[this.childobj.data.english_basic-1].checked=true;
        document.querySelectorAll('#childJiji input')[this.childobj.data.classroom_attitude-1].checked=true;  
      }
    },    
    methods: {
      back () {
        history.go(-1)
      },
      childNameb (name) {
        this.childNamea = name;
      },
      showName (b) {
        this.xianshi = b;
      },
      regexpInput () {
        //孩子姓名
        const childName = document.getElementById('c_childName');
        childName.value = c_mobile.trim(childName.value);
        if(!childName.value){
          Toast('请填写孩子姓名');
          return false;
        }else if(childName.value.length>6){
          Toast('孩子姓名不能大于6位数');
          return false;
        }
        //孩子英文名
        const childEnglishName = document.getElementById('c_childEnglishName');
        childEnglishName.value = c_mobile.trim(childEnglishName.value);
        if(!childEnglishName.value){
          Toast('请选择或输入孩子英文名');
          return false;
        }else if(childEnglishName.value.length>15){
          Toast('字母长度不能大于15位');
          this.value = '';
          return false;
        }else if(!/^[a-zA-Z]+$/g.test(childEnglishName.value)){
          Toast('英文名格式不正确,请重新输入');
          childEnglishName.value = '';
          return false;
        }
        //孩子生日
        const childBrithday = document.getElementById('c_childBrithday').value;
        //性别
        const childSex = document.querySelectorAll('#c_childSex input:checked')[0].value;
        //接受过多久线上英语培训
        const askAbout = document.querySelectorAll('#askAbout input:checked')[0].value;
        //英语基础如何
        const englishBase = document.querySelectorAll('#englishBase input:checked')[0].value;
        //孩子参与课堂学习的积极程度
        const childJiji = document.querySelectorAll('#childJiji input:checked')[0].value;
        return {
          cname: childName.value,
          e_name: childEnglishName.value,
          age: childBrithday,
          sex: childSex,
          englishtime_training:askAbout,
          english_basic:englishBase,
          classroom_attitude:childJiji
        }
      },
      //查看孩子
      lookchild(){
        var userInfo = JSON.parse(localStorage.user);
        Indicator.open();
        lookchildren({cid:l_search.cid,cklogin:userInfo.data.token}).then(res=>{
          Indicator.close();
          let result = res.data;
          if(result.statusCode==1){            
            this.childobj = result;
          }
        })
      },
      //编辑孩子
      addChild () {
        var userInfo = JSON.parse(localStorage.user);
        //孩子姓名 孩子英文名  孩子生日 性别
        let yz = this.regexpInput();
        if(!yz){
          return ;
        }
        yz['pid'] = userInfo.data.id;
        yz['cklogin'] = userInfo.data.token;
        if(this.name=="添加孩子"){
          Indicator.open();
          addchildren(yz).then(res => {
            Indicator.close();
            let result = res.data;
            if(result.statusCode==1){
              setTimeout(function(){
                location.assign(l_search.reg+'.html');
              },2000)
            }
            Toast(result.message);
            console.log(result);
          }, () => {
            Indicator.close();
          })
        }
        if(this.name=="编辑孩子"){
          yz['cid'] = this.childobj.data.id;
          yz['cklogin'] = userInfo.data.token;          
          Indicator.open();
          editchildren(yz).then(res => {
            Indicator.close();
            let result=res.data;
            if(result.statusCode==1){
              setTimeout(function(){
                location.assign(l_search.reg+'.html');
              },2000)              
              Toast(result.message);
              console.log(result)
            }else{
              Toast(result.message);
            }
          })
        }
      }
    },
    components:{
      cHead, askAbout, childmsg, englishName
    }
  }
</script>

<style>

.bannner img{width: 100%;height: auto;}
.main{padding-left:0.26667rem;padding-right:0.26667rem;}
.infoFill{margin-top: 0.266667rem;}
.infoFill li>.input_group i.xiala{position: absolute;right: 0.24rem;top: 50%;transform:translateY(-50%);color: #808080;}

.choice_tit{font-size:0.37333rem;color: #202020;padding-left:0.28rem;line-height:1.173333rem;}
.choice_con{padding:0.26667rem;overflow: hidden;background:#f1faff;}
.choice_con .radio_group{margin-top:0.36rem;width: 4.08rem;}

</style>
