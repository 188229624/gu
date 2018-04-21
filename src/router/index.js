import Vue from 'vue'
import Router from 'vue-router'
import app from '../App'
import goods from '@/components/goods/goods'
import comment from '@/components/comment/comment'
import seller from '@/components/merchant/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
        path:'/goods',
        name:'goods',
        component:goods
    },
    {
        path:'/comment',
        name:'comment',
        component:comment
    },
    {
        path:'/seller',
        name:'seller',
        component:seller
    }
  ]
})
