// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/normalize.css'//引入全局的css
import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import router from './router'
import 'vant/lib/index.css';
Vue.config.productionTip = false
import  Vant  from 'vant';
import {Toast} from 'vant'
Vue.use(Vuex)
Vue.use(Vant);
import BScroll from 'better-scroll'
/* eslint-disable no-new */
// Toast()

router.beforeEach((to,from,next)=>{
  console.log('to:',to,to.meta.isLogin);
  if(to.name=='shopCar'){
    sessionStorage.current=to.name;
  }
  if(to.meta.isLogin){
    if(sessionStorage.token){
      next();
    }else{
      Toast({
        message: '请先登录',
        position: 'bottom',
        duration: 1000
      });
      setTimeout(()=>{
        next('/member/login');
      },1100)
    }
  }else{
    next();
  }
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
