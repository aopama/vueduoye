<template>
  <footer class="footer">
    <ul>
      <li v-for="item in navList" :class="{footerActive:item.href==aclass}">
        <a :href="item.href==aclass?'javascript:;':item.href">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{ item.name }}</p>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
    props: ['aclass'],
    data () {
      return {
        navList:[
          {href:'index.html', icon:'icon-shouye', name:'首页'},
          {href:'syllabus.html', icon:'icon-kechengbiao', name:'约课'},
          {href:'bell.html', icon:'icon-lingdang', name:'上课铃'},
          {href:'my.html', icon:'icon-ren', name:'我的'}
        ]
      }
    }
}
</script>

<style>
  .footer{width:100%;position:fixed;left:0;bottom:0;z-index: 5;}
  .footer ul{width:100%;height:1.29rem;background:#f8f8f8;border-top:1px solid #e0e0e0;}
  .footer ul li{float:left;width:24.9%;height: 100%;}
  .footer ul li a{display: block;height:100%;font-size:.266rem;text-align: center;padding-top:.133rem;color:#979797;}
  .footer ul li.footerActive a{color:#008bd9;}
  .footer ul li a i{font-size:.533rem;}
</style>
