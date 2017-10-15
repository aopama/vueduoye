<template>
  <div id="app">
    <ul>
      <li><a href="addchild.html">添加孩子</a><p>addchild.html</p></li>
      <li><a href="appointment.html">预约体验课</a><p>appointment.html</p></li>
      <li><a href="buylesson.html">购买课时包</a><p>buylesson.html</p></li>
      <li><a href="buyscheme.html">购买教学方案</a><p>buyscheme.html</p></li>
      <li><a href="classplay.html">教学方案</a><p>classplay.html</p></li>
      <li><a href="login.html">密码登录</a><p>login.html</p></li>
      <li><a href="login.html#Register">注册</a><p>login.html#Register</p></li>
      <li><a href="login.html#Zpassword">找回密码</a><p>login.html#Zpassword</p></li>
      <li><a href="my.html">我的</a><p>my.html</p></li>
      <li><a href="mybaby.html">我的宝贝</a><p>mybaby.html</p></li>
      <li><a href="purchase.html">购买记录</a><p>purchase.html</p></li>
      <li><a href="setting.html">设置</a><p>setting.html</p></li>
      <li><a href="syllabus.html">约课</a><p>syllabus.html</p></li>
      <li><a href="teachingplan.html">生成教学方案</a><p>teachingplan.html</p></li>
      <li><a href="bell.html">上课铃</a><p>bell.html</p></li>
      <li><a href="classinfo.html">课程详情</a><p>classinfo.html</p></li>
      <li><a href="formulate.html">制定上课计划</a><p>formulate.html</p></li>
      <li><a href="index.html">首页</a><p>index.html</p></li>
      <li><a href="system.html">教学体系</a><p>system.html</p></li>
      <li><a href="ourteacher.html">我们的老师</a><p>ourteacher.html</p></li>
      <li><a href="Tdetails.html">老师详情</a><p>Tdetails.html</p></li>
      <li><a href="Tscheme.html">教学方案</a><p>Tscheme.html</p></li>
      <li><a href="protocol.html">用户注册协议</a><p>protocol.html</p></li>
    </ul>
  </div>
</template>

<script>
import cHead from '@/components/header.vue'

export default {
  name: 'app',
  data () {
    return {
      name:'购买记录'
    }
  },
  components:{

  }
}
</script>

<style>
html,body{
  background-color:#fff
}
li{text-align:center;border-bottom:2px solid #f0f0f0;padding: .3rem;width: 49.9%;float:left;}
a{
  display: block;
  color: #008bd8!important;font-size:.4rem;}
 li p{font-size:14px;}
  li:nth-child(odd){
    border-right:1px solid #f0f0f0;
  }
</style>


