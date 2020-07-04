import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入
import http from '../http.js'
//将其挂载到原型上
Vue.prototype.$http = http

import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';
Vue.prototype.$msg = Toast

Vue.use(Vant);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
