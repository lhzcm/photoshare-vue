import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/friends',
    name: '好友列表',
    component: ()=> import('../views/Friends.vue')
  },
  {
    path: '/chat/:id',
    name: '聊天',
    component: ()=> import('../views/Chat.vue'),
    props: (route) => {return { id: parseInt(route.params.id) }}
  },
  {
    path: '/earth',
    name: '星球',
    component: ()=> import('../views/Earth.vue')
  },
  {
    path: '/dynamic',
    name: '动态',
    component: ()=> import('../views/Dynamic.vue')
  },
  {
    path: '/publish',
    name: '发布',
    component: ()=> import('../views/Publish.vue')
  },
  {
    path: '/mine',
    name: '我的',
    component: ()=> import('../views/Mine.vue')
  },
  {
    path: '/register',
    name: '账号注册',
    component:()=> import('../views/Register.vue')
  },
  {
    path:'/friendadd',
    name:'好友添加',
    component:()=> import('../views/FriendAdd.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
