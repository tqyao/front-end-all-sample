import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from "@/token";


// import Login from '@/components/Login'
// import Home from '@/components/Home'
// import Welcome from '@/components/Welcome'

const Login = () => import(/* webpackChunkName: "group-index" */ '@/components/Login')
const Home = () => import(/* webpackChunkName: "group-index" */ '@/components/Home')
const Welcome = () => import(/* webpackChunkName: "group-index" */ '@/components/Welcome')


// import Users from '@/components/user/Users'
// import Rights from '@/components/power/Rights'
// import Roles from '@/components/power/Roles'

const Users = () => import(/* webpackChunkName: "group-user" */ '@/components/user/Users')
const Rights = () => import(/* webpackChunkName: "group-user" */ '@/components/power/Rights')
const Roles = () => import(/* webpackChunkName: "group-user" */ '@/components/power/Roles')

// import Goods from '@/components/goods/List'
// import Cate from '@/components/goods/Cate'
// import Params from '@/components/goods/Params.vue'
// import Add from '@/components/goods/Add.vue'
const Goods = () => import(/* webpackChunkName: "group-goods" */ '@/components/goods/List')
const Cate = () => import(/* webpackChunkName: "group-goods" */ '@/components/goods/Cate')
const Params = () => import(/* webpackChunkName: "group-goods" */ '@/components/goods/Params')
const Add = () => import(/* webpackChunkName: "group-goods" */ '@/components/goods/Add')

// import Order from '@/components/order/Order.vue'
// import Report from '@/components/report/Report.vue'
const Order = () => import(/* webpackChunkName: "group-Order_Report" */ '@/components/order/Order.vue')
const Report = () => import(/* webpackChunkName: "group-Order_Report" */ '@/components/report/Report.vue')


Vue.use(VueRouter)


const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    children: [
      // {path:'/welcome',component: Welcome},
      // {path:'/home',redirect: '/welcome'},
      {path: '/home', component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles', component: Roles},
      {path: '/goods', component: Goods},
      {path: '/categories', component: Cate},
      {path: '/params', component: Params},
      {path: '/goods/add', component: Add},
      {path: '/orders', component: Order},
      {path: '/reports', component: Report},
    ]
  }
]

const router = new VueRouter({
  routes
})

/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    if (!getToken()) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
