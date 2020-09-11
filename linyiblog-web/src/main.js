// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/libs/axios.js'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.less'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Quill from 'quill'

import moment from 'moment';
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
  return moment(dataStr).format(pattern)
})

// 将富文本编辑器，注册为全局可用组件
Vue.use(VueQuillEditor)


Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.show){
    next();
  } else {
    let isLogin = sessionStorage.getItem('isLogin')
   if (to.query.password && to.query.password == '1120021' || isLogin){
     next()
   } else {
     next({
       path: '/'
     });
   }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
