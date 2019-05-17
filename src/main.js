// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import Mint from 'mint-ui';
// import fastClick from 'fastClick'
// fastClick.attach(document.body)
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 

axios.defaults.baseURL = location.href.includes('asse.app.shebao.info')?'http://shebao.dai58.cn/':'http://test.shebao.dai58.cn/'
Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(axios)
/* eslint-disable no-new */

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
      document.title = route.meta.title;
      // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const hackIframe = document.createElement('iframe');
          hackIframe.style.display = 'none';
          hackIframe.src = './static/html/fixIosTitle.html?r=' + Math.random();
          document.body.appendChild(hackIframe);
          setTimeout(_ => {
              document.body.removeChild(hackIframe)
          }, 300)
      }
  }
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
