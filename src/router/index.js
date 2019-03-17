import Vue from 'vue'
import Router from 'vue-router'
import SongerList from '@/components/SongerList'
import player from '@/components/player'
Vue.use(Router)

export default new Router({
  mode: 'history',  //默认hash模式，项目地址自动加#。改为history则不会 但./当前目录不能用
  routes: [
    {
      path: '/',
      name: 'SongerList',
      component: SongerList
    },{
       path:'/player',
       name:'player',
       component:player
    }
  ]
})
