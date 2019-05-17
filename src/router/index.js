import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Invite from '@/components/invite'
import Login from '@/components/login'
import Over from '@/components/over'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/invite',
      name: 'Invite',
      component: Invite
    },{
      path:'/login',
      name:'Login',
      component: Login
    },{
      path:'/over',
      name:'Over',
      component: Over
    }
  ]
})
