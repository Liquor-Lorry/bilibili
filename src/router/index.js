import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/register.vue'
import Login from '@/views/Login.vue'
import UserInfo from '@/views/UserInfo.vue'
import Edit from '@/views/Edit.vue'
import Article from '@/views/Article.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    // {
    //   path: '/',
    //   redirect: '/register'
    // },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/userinfo',
      component: UserInfo,
      meta: {
        istoken: true
      }
    },
    {
      path: '/edit',
      component: Edit,
      meta: {
        istoken: true
      }
    },
    {
      path: '/article/:id',
      component: Article
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
