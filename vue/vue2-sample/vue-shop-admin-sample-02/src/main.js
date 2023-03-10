import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import request from "@/plugins/axios";
import '@/assets/font_q690hyp7oin/iconfont.css'
import '@/assets/font_3868342_a5bks2xgyhd/iconfont.css'

// 导入quill-editor富文本组件
import VueQuillEditor from 'vue-quill-editor'
// 导入quill-editor富文本组件样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.prototype.$http = request

Vue.config.productionTip = false

// 时间格式化过滤器
Vue.filter('dataFormat', (timestamp) => {
  let datetime = parseInt(timestamp)
  if (isNaN(datetime)) {
    return timestamp
  }
  datetime = new Date(datetime)
  let yy, mm, dd, h, m, s
  yy = datetime.getFullYear()
  mm = datetime.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm
  dd = datetime.getDate()
  dd = dd < 10 ? '0' + dd : dd
  h = datetime.getHours()
  h = h < 10 ? '0' + h : h
  m = datetime.getMinutes()
  m = m < 10 ? '0' + m : m
  s = datetime.getSeconds()
  s = s < 10 ? '0' + s : s
  return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
