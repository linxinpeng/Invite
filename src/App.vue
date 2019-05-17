<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
!function(b, a){
    var c = b.documentElement;
    a = function() {
        var a = c.clientWidth;
        a && (c.style.fontSize = a/375 * 100 + "px")
    };
    window.addEventListener("orientationchange" in window ? "orientationchange" : "resize", a, !1);
    b.addEventListener("DOMContentLoaded", a, !1)
}(document, window);
export default {
  name: 'App',
  data(){
    return{
      currentTime: '',
    }
  },
  created(){
    if(!location.href.includes('over')){
      var overTime = new Date("2019-5-31 23:59:59")
      var startTime = new Date(this.CurentTime())
      if(startTime.getTime() > overTime.getTime()){
        this.$router.replace('./over?time=over')
      }
    }
  },
  methods:{
    //获取当前时间
    CurentTime()
        { 
            var now = new Date();
            
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒
            
            var clock = year + "-";
            
            if(month < 10)
                clock += "0";
            
            clock += month + "-";
            
            if(day < 10)
                clock += "0";
                
            clock += day + " ";
            
            if(hh < 10)
                clock += "0";
                
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm + ":"; 
            
            if (ss < 10) clock += '0'; 
            clock += ss; 
            return(clock); 
    }
  }
}
</script>

<style>
body{background: rgb(254,182,61);font-family: 'PingFang SC'}
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}
html{color:#000;overflow-y:scroll;overflow:-moz-scrollbars-vertical}
body,button,input,select,textarea{font-family:arial,'Hiragino Sans GB','Microsoft Yahei','微软雅黑','宋体',\5b8b\4f53,Tahoma,Arial,Helvetica,STHeiti}
em{font-style:normal}
ul,ol{list-style:none}
a{text-decoration:none}
a:hover{text-decoration:underline}
legend{color:#000}
fieldset,img{border:0}
table{border-collapse:collapse;border-spacing:0}
img{-ms-interpolation-mode:bicubic}
textarea{resize:vertical}
.left{float:left}
.right{float:right}
.overflow{overflow:hidden}
.hide{display:none}
.block{display:block}
.inline{display:inline}
.error{color:#F00;}
label,button{cursor:pointer}
.clearfix:after{content:'\20';display:block;height:0;clear:both}
.clearfix{zoom:1}.clear{clear:both;height:0;line-height:0;font-size:0;visibility:hidden;overflow:hidden}
.wordwrap{word-break:break-all;word-wrap:break-word}
pre.wordwrap{white-space:pre-wrap}
body{text-align:center}
body,form{position:relative}
td{text-align:left}
img{border:0}
a{text-decoration:none;color: #333333}
</style>
