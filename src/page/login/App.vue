<template>
  <div class="login">
    <cHead :name="name" left="true" right="true" :style="headclass">
      <i slot="headerLeft" class="iconfont icon-jiantou-copy-copy" @click="back()"></i>
      <i v-if="show!='#editpaword'" style="margin-left:.2rem" slot="headerLeft" class="iconfont icon-shouye" @click="index"></i>
      <a slot="headerRight" v-if="rightIf" class="formulate" :style="headclass" :href="rightHornHref">{{rightHorn}}</a>
    </cHead>
    <div class="appContent">
      <!--密码登录 start-->
      <template  v-if="show==''">
        <div class="loginInput">
          <div class="toplogo"><img src="static/img/logoa.png"></div>
          <lInput icon="icon-shouji">
            <input v-focus v-model="phone" slot="input" class="input" type="tel" placeholder="请输入手机号">
          </lInput>
          <lInput icon="icon-lock">
            <input v-focus ref="loginPassword" slot="input" key="loginP" class="input" type="password" placeholder="请输入密码">
          </lInput>
          <div class="btnAll">
            <lButton :name="btnName" v-on:c="do_login"></lButton>
            <div class="minfujian">
              <a class="z c-gray" href="#Yzm">验证码登录</a>
              <a class="y c-gray" href="#Zpassword">忘记密码?</a>
              <div class="fclear"></div>
            </div>
          </div>
        </div>
      </template>
      <!--密码登录 end-->
      <!--验证码登录 start-->
      <template  v-if="show=='#Yzm'">
        <div class="loginYzm">
          <div class="toplogo"><img src="static/img/logoa.png"></div>
          <lInput icon="icon-shouji">
            <input v-focus v-model="phone" slot="input" class="input" type="tel" placeholder="请输入手机号">
          </lInput>
          <div class="yanzhengma imgyanzheng">
            <lInput icon="icon-iconfontyanzhengma" style="width:6.66rem;float:left;">
              <input v-model="verify" v-focus:true slot="input" ref="yanzhenma" class="input" key="lyzm" type="text" placeholder="请输入验证码">
            </lInput>
            <div class="y getYanzhenma">
              <img class="" :src="curldizhi+'/index.php?g=api&amp;m=checkcode&amp;a=index&amp;length=4&amp;use_noise=1&amp;use_curve=0&amp;type=redis&amp;rediskey='+hash" ref="yanzm" @click="changeimg($event)" style="cursor: pointer;" title="点击获取">
              <!-- onclick="this.src='http://www.qiaoxi.com/index.php?g=api&amp;m=checkcode&amp;a=index&amp;length=4&amp;use_noise=1&amp;use_curve=0&amp;time='+Math.random();" -->
            </div>
            <div class="fclear"></div>
          </div>
          <div class="yanzhengma">
            <lInput icon="icon-iconfontyanzhengma" style="width:6.66rem;float:left;">
              <input v-focus:true slot="input" ref="yanzhenma" class="input" key="lyzm" type="tel" placeholder="请输入验证码">
            </lInput>
            <button class="y getYanzhenma" data-n="60" data-b="1" @click="send_sms('login',$event)" key="loginYzm">获取验证码</button>
            <div class="fclear"></div>
          </div>
          <div class="btnAll">
            <lButton :name="btnName" v-on:c="sms_login"></lButton>
            <div class="minfujian">
              <a class="z" href="#">密码登录</a>
              <div class="fclear"></div>
            </div>
          </div>
        </div>
      </template>
      <!--验证码登录 end-->
      <!--注册 start-->
      <template  v-if="show=='#Register'">
        <div class="Register">
          <lInput icon="icon-shouji">
            <input v-focus v-model="registerPhone" slot="input" class="input" type="tel" placeholder="请输入手机号">
          </lInput>
          <div class="yanzhengma imgyanzheng">
            <lInput icon="icon-iconfontyanzhengma" style="width:6.66rem;float:left;">
              <input v-model="verify" v-focus:true slot="input" ref="yanzhenma" class="input" key="lyzm" type="text" placeholder="请输入验证码">
            </lInput>
            <div class="y getYanzhenma">
              <img class="" :src="curldizhi+'/index.php?g=api&amp;m=checkcode&amp;a=index&amp;length=4&amp;use_noise=1&amp;use_curve=0&amp;type=redis&amp;rediskey='+hash" ref="yanzm" @click="changeimg($event)" style="cursor: pointer;" title="点击获取">

            </div>
            <div class="fclear"></div>
          </div>
          <div class="yanzhengma">
            <lInput icon="icon-iconfontyanzhengma" style="width:6.66rem;float:left;">
              <input v-focus:true slot="input" class="input" ref="ryzma" type="tel" key="ryzm" placeholder="请输入验证码">
            </lInput>
            <button class="y getYanzhenma" data-n="60" data-b="1" @click="send_sms('reg',$event)" key="Registeryzm">获取验证码</button>
            <div class="fclear"></div>
          </div>
          <lInput icon="icon-lock">
            <input v-focus slot="input" ref="rPassword" key="registerP" class="input" type="password" placeholder="请输入密码">
          </lInput>
          <div class="btnAll pt-40">
            <p class="successKeyi"><input v-model="isBoo" value="1" type="checkbox" name="" id="">阅读并同意 <a class="c-blue" href="protocol.html">《乔希家的书用户注册协议》</a></p>
            <lButton :name="btnName" class="mt-40" v-on:c="reg"></lButton>
          </div>
        </div>
      </template>
      <!--注册 end-->
      <!--找回密码 start-->
      <template  v-if="show=='#Zpassword'">
        <div class="Zpassword">
          <lInput icon="icon-shouji">
            <input v-focus v-model="phone" slot="input" class="input" type="tel" placeholder="请输入手机号">
          </lInput>
          <div class="yanzhengma imgyanzheng">
            <lInput icon="icon-iconfontyanzhengma" style="width:6.66rem;float:left;">
              <input v-model="verify" v-focus:true slot="input" ref="yanzhenma" class="input" key="lyzm" type="text" placeholder="请输入验证码">
            </lInput>
            <div class="y getYanzhenma">
              <img class="" :src="curldizhi+'/index.php?g=api&amp;m=checkcode&amp;a=index&amp;length=4&amp;use_noise=1&amp;use_curve=0&amp;type=redis&amp;rediskey='+hash" ref="yanzm" @click="changeimg($event)" style="cursor: pointer;" title="点击获取">

            </div>
            <div class="fclear"></div>
          </div>
          <div class="yanzhengma">
            <lInput icon="icon-iconfontyanzhengma">
              <input v-focus:true slot="input" class="input" ref="zyzm" key="zyzm" type="tel" placeholder="请输入验证码">
            </lInput>
            <button class="y getYanzhenma" data-n="60" data-b="1" @click="send_sms('login',$event)" key="Zpassword">获取验证码</button>
            <div class="fclear"></div>
          </div>
          <lInput icon="icon-lock">
            <input v-focus slot="input" class="input" ref="zpassword" key="zpassword" type="password" placeholder="请输入新密码">
          </lInput>
          <div class="btnAll">
            <lButton :name="btnName" class="mt-40" v-on:c="forgetpass"></lButton>
          </div>
        </div>
      </template>
      <!--找回密码 end-->
      <!--修改密码 start-->
      <template v-if="show=='#editpaword'">
        <div class="editpaword">
          <lInput icon="icon-lock">
            <input v-focus slot="input" ref="editjiupa" class="input" type="password" placeholder="请输入旧密码">
          </lInput>
          <lInput icon="icon-lock">
            <input v-focus slot="input" ref="editnewpa" class="input" type="password" placeholder="请输入新密码">
          </lInput>
          <div class="btnAll">
            <lButton :name="btnName" v-on:c="resetpass"></lButton>
          </div>
        </div>
      </template>
      <!--修改密码 end-->
    <!-- {{verify}}
    {{cImgurldizhi}} -->
    </div>

  </div>
</template>

<script>
  import cHead from '@/components/header.vue';
  import lInput from '@/page/login/components/input.vue'
  import lButton from '@/page/login/components/button.vue'
  import { do_login, send_sms, forgetpass, sms_login, reg, resetpass, verifycode } from '@/api/api.js'
  import { Toast, Indicator, MessageBox } from 'mint-ui'

  export default {
    data () {
      return {
        curldizhi:'',
        name: '密码登录', //title
        rightHorn:'注册',   //右上角title
        btnName:'',
        headclass:{
          background:'#008bd9',
          color:'#ffffff'
        },
        rightHornHref:'#Register',  //右上角点击切换地址
        rightIf:null,   //右上角内容是否显示
        show:'',
        phone: '',
        registerPhone: '',
        isBoo:true,
        verify:'',
        hash:''
      }
    },
    watch: {
      phone (v) {
        this.phone = v.replace(/\s+/g,'');
      }
    },
    created () {
      this.hash = md5(this.hqrandom());
      this.curldizhi = this.cImgurldizhi;
      window.addEventListener('hashchange',() => {
          this.getHash();
      });
      this.getHash();
    },
    methods: {
      hqrandom(){
        var num = ""
        for(var i = 0;i<6;i++){
          num= Math.floor(Math.random()*10)
        }
        return num
      },
      index () {
        window.location.replace('index.html');
      },
      back () {
        history.go(-1);
      },
      getHash () {
        var sHash = window.location.hash;
        if(sHash=='#Zpassword'||sHash=='#editpaword'){
          this.rightIf=false;
        }else{
          this.rightIf=true;
        }
        this.verify=''
        this.headclass = {background:'#ffffff',color:'#008bd9'}
        switch(sHash){
          case '':
                this.show = '';
                this.name = '';
                this.rightHorn = '注册';
                this.btnName = '登录';
                this.rightHornHref = '#Register';
                break;
          case '#Yzm':
                this.show = '#Yzm';
                this.name = ''
                this.btnName = '登录';
                break;
          case '#Register':
                this.show = '#Register';
                this.name = '注册';
                this.rightHorn = '登录';
                this.btnName = '注册';
                this.rightHornHref = '#';
                this.headclass = {background:'#008bd9',color:'#ffffff'};
                break;
          case '#Zpassword':
                this.show = '#Zpassword';
                this.name = '找回密码';
                this.btnName = '重置密码';
                this.headclass = {background:'#008bd9',color:'#ffffff'};
                break;
          case '#editpaword':
                this.show = '#editpaword';
                this.name = '修改密码';
                this.btnName = '确认';
                this.headclass = {background:'#008bd9',color:'#ffffff'};
                break;
          default:
            this.show = '';
            this.name = '密码登录';
        }
      },
      Interval (el) {
        let Num = el.getAttribute('data-n');
        el.timer = setInterval(function(){
          if(Num>0){
            el.setAttribute('data-b',0)
            el.innerHTML=Num+'s';
            Num--;
          }else{
            clearInterval(el.timer);
            el.setAttribute('data-b',1)
            el.innerHTML='获取验证码';
            Num=60
          }
          el.setAttribute('data-n',Num);
        },1000)
      },
      changeimg (event) {
        this.hash = md5(this.hqrandom());
        this.verify = ''
        event.target.src=this.curldizhi+"/index.php?g=api&m=checkcode&a=index&length=4&use_noise=1&use_curve=0&time="+Math.random()+"&type=redis&rediskey="+this.hash
      },
      testyzm () {
        let verify = this.verify
        if(!verify){
          Toast('图形验证码不能为空')
          return false
        }else if(verify.length!=4){
          Toast('请输入正确的图形验证码')
          return false
        }
        return verify
      },
      testPhone (p) {
        let phone = parseInt(p||this.phone);
        if(!phone){
          Toast('手机号不能为空');
          return false;
        }else if(!/^1(3|5|6|7|8|9)\d{9}$/g.test(phone)){
          Toast('手机号格式有误');
          return false;
        }
        return phone;
      },
      testPassword (p) {
        let password = p? p.value:this.$refs.loginPassword.value;

        if(!password){
          Toast('密码不为空');
          return false;
        }else if(password.length>16||password.length<6){
          Toast('密码长度不能小于6位和大于16位');
          return false;
        }
        return password;
      },
      send_sms (type, ev) {
        let selfEl = ev.scrElement||ev.target;
        if(selfEl.getAttribute('data-b')==0) return ;

        let phone = this.testPhone((this.name=='注册'?this.registerPhone:false));
        if(!phone){
          return ;
        }

        let yzm = this.testyzm()
        if(yzm){
          verifycode({verify:this.verify,rediskey:this.hash}).then(res=>{
            if(res.data.state==1){
              Indicator.open({
                spinnerType: 'fading-circle'
              })
              send_sms({phone, type}).then(res => {
                Indicator.close();
                let result = res.data;
                if(result.statusCode===1){
                  this.Interval(selfEl)
                }
                Toast(result.message)
              }, () => {
                Indicator.close();
              });
            }else{
              Toast('验证码错误')
              this.hash = md5(this.hqrandom())
              this.$refs.yanzm.setAttribute('src',this.curldizhi+"/index.php?g=api&m=checkcode&a=index&length=4&use_noise=1&use_curve=0&time="+Math.random()+"&type=redis&rediskey="+this.hash)
              this.verify = ''
            }
          })
        }
      },
      forgetpass () {
        let phone = this.testPhone();
        if(!phone){
          return ;
        }
        let verify = this.testyzm()
        if(!verify)return

        let yzm = this.$refs.zyzm.value;
        if(!yzm){
          Toast('请输入验证码');
          return ;
        }

        let password = this.testPassword(this.$refs.zpassword);
        if(!password){
          return ;
        }
        let rediskey = this.hash

        MessageBox.confirm('新密码为:'+password).then(action => {
          Indicator.open({
            spinnerType: 'fading-circle'
          })
          forgetpass({phone, yzm, password,verify,rediskey}).then( res => {
            Indicator.close();
            var result = res.data;
            if(result.statusCode==1){
              setTimeout(() => {
                window.location.replace('login.html')
            },2000)
            }
            Toast(result.message);
          }, () => {
            Indicator.close()
          })
        },()=>{
            Indicator.close();
        });

      },
      do_login () {
        let phone = this.testPhone();
        if(!phone){
          return ;
        }

        let password = this.testPassword();
        if(!password){
          return ;
        }
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        do_login({
          phone: phone,
          password: password
        }).then( res => {
          Indicator.close();
          var result = res.data;
          if(result.statusCode==1){
            localStorage.user = JSON.stringify(result);
            if(l_search.reg){
              window.location.replace(l_search.reg+'.html');
            }else{
              window.location.assign('index.html');
            }
            console.log(result)
          }else{
            Toast(result.message);
          }
        }, () => {
          Indicator.close();
        })
      },
      sms_login () {
        let phone = this.testPhone();
        if(!phone){
          return ;
        }
        let verify = this.testyzm()
        if(!verify)return

        let yzm = this.$refs.yanzhenma.value;
        if(!yzm){
          Toast('请填写验证码')
          return ;
        }
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        let rediskey = this.hash
        sms_login({phone, yzm,verify,rediskey}).then( res => {
          Indicator.close();
          var result = res.data;
          if(result.statusCode==1){
            localStorage.user = JSON.stringify(result);
            if(l_search.reg){
              window.location.replace(l_search.reg+'.html');
            }else{
              window.location.assign('index.html');
            }
          }else{
            Toast(result.message);
          }
        }, () => {
          Indicator.close();
        })
      },
      reg () {
        let phone = this.testPhone(this.registerPhone);
        if(!phone){
          return ;
        }

        let verify = this.testyzm()
        if(!verify)return

        let yzm = this.$refs.ryzma.value;
        if(!yzm){
          Toast('请输入验证码');
          return ;
        }

        let password = this.testPassword(this.$refs.rPassword);
        if(!password){
          return ;
        }

        let isBoo = this.isBoo;
        if(!isBoo){
          Toast('请阅读乔西家的书用户注册协议并点击同意注册');
          return false;
        }
        let rediskey = this.hash
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        reg({phone, password, yzm, agreement:1,verify,rediskey}).then( res => {
          Indicator.close();
          var result = res.data;
          if(result.statusCode==1){
            Toast('注册成功3秒后自动登录');
            setTimeout(()=>{
              localStorage.user = JSON.stringify(result);
              window.location.assign('index.html');
            },3000);
          }else{
            Toast(result.message);
          }
        }, () => {
          Indicator.close()
        })

      },
      resetpass () {
        let j = this.$refs.editjiupa.value;
        if(!j){
          Toast('请输入旧密码');
          return false;
        }else if(j.length>16||j.length<6){
          Toast('密码长度不能小于6位和大于16位');
          return false;
        }
        let n = this.$refs.editnewpa.value;
        if(!n){
          Toast('新密码不为空');
          return false;
        }else if(n.length>16||n.length<6){
          Toast('新密码长度不能小于6位和大于16位');
          return false;
        }
        if(j==n){
          Toast('新密码和旧密码相同,请重新设置');
          return ;
        }
        let user = JSON.parse(localStorage.user).data;
        MessageBox.confirm('确认修改密码,新密码为:'+n).then(action => {
          Indicator.open();
          resetpass({id: user.id, oldpass: j, newpass: n, cklogin:user.token}).then( res => {
            Indicator.close();
            const result = res.data;
            if(result.statusCode==1){
              setTimeout( () => {
                window.location.replace('my.html');
              },2000)
            }
            Toast(result.message);
          })
        },()=>{
          Indicator.close();
        });
      }
    },
    directives: {
      focus: {
        inserted (el, binding) {
          let parent = el.parentNode;
          el.onfocus = function(){
            parent.className = 'input-item input-item-active';
            if(binding.arg=='true'){
              parent.nextElementSibling.className = 'y getYanzhenma active';
            }
          };
          el.onblur = function(){
            parent.className = 'input-item';
            if(binding.arg=='true'){
              if(binding.arg=='true'){
                parent.nextElementSibling.className = 'y getYanzhenma';
              }
            }
          };
        }
      }
    },
    components: {
      cHead, lInput, lButton
    }
  }
</script>

<style>
.toplogo{text-align: center;margin-top: 1.08rem;margin-bottom: 1.64rem;}
.toplogo img{width:5.92rem;}
.headwhite{}
  .appContent{margin:0 .4rem;}
  .appContent .btnAll{padding-top: 1.16rem;}
  .appContent .btnAll .minfujian{padding-top:.6rem;font-size:.346rem;color:#808080;}
  .appContent .btnAll .successKeyi{font-size:.3rem;text-align:center;display:flex;justify-content: center;-webkit-align-items: center;display: box;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center;}
  .appContent .btnAll .successKeyi input{margin-right:.1rem;width:.35rem;height:.35rem;display: block;}

  .yanzhengma{display:-webkit-box;display:box;display:-webkit-flex;display:flex;}
  .yanzhengma .input-item{-webkit-box-flex:1;flex:1;}
  .yanzhengma .getYanzhenma{white-space: nowrap;box-sizing: content-box;padding: 2px 0;margin-left:.2rem;width:4rem;height:1.146667rem;margin-top: .266rem;font-size:.34rem;background:#ffffff;border:1px solid #bebebe;border-radius:.1rem;color:#000000;}
  .imgyanzheng img{width: 100%;height: 1.25333rem;}
  .imgyanzheng .getYanzhenma{border:1px solid #ffffff!important;height: 1.253333333rem;padding: 0}
  .imgyanzheng .getYanzhenma.active{border:1px solid #ffffff!important;color:#000000!important;}
  .getimg{width: 2.3rem;height: 1.30666rem;margin-top: .266rem;padding: 0;}
  .yanzhengma .getYanzhenma.active{color:#008bd9;border:1px solid #008bd9;}
</style>
