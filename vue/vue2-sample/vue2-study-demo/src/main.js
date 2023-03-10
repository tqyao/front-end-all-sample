import Vue from 'vue'
// import App from '@/01ref获取子组件引用/App'
// import App from '@/02父组件向子组件传值/App'
// import App from '@/03子组件向父组件传值/App'
// import App from '@/04兄弟组件传值/App'
// import App from '@/06nextTick使用/App'
// import App from '@/07购物车案例/App'
// import App from '@/07购物车案例02/App'
// import App from '@/07购物车组案例03/App'
// import App from '@/08动态组件/App'
// import App from '@/09具名插槽/App'
import App from '@/10插槽重构购物车模块/App'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
