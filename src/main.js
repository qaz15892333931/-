import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


import { Dialog } from 'vant';
Vue.prototype.wx = wx
// 获取字典
import { getDicts } from "@/api/dict";
Vue.prototype.getDicts = getDicts
// 用于和后台交互，发送请求
import axios from 'axios'
Vue.prototype.$ajax = axios

import wx from 'weixin-js-sdk'
//全局图片地址
Vue.prototype.$imgUrl = 'https://weixin.abzc.net'
// 全局注册
Vue.use(Dialog);

Vue.prototype.$imgUrl = 'http://192.168.1.116:7500'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
// 日期
import yuns from '@/assets/js/yun'
Vue.use(yuns)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
