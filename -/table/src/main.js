import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// if (process.env.NODE_ENV === 'production') {
//   /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
//   if (process.env.VUE_APP_FLAG === 'pro') {
//     //production 生产环境
//     axios.defaults.baseURL = 'http://api.xinggeyun.com';//路径
//     console.log('1')
//   } else {
//     //test 测试环境
//     axios.defaults.baseURL = 'http://10.39.45.108:10001';
//     console.log('2')

//   }
// }
// else { //dev 开发环境 
//   axios.defaults.baseURL = 'http://10.39.45.108:10001/';//路径
//   // console.log('')
// }
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
