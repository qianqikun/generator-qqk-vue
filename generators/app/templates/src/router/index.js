import Vue from 'vue'
import VueRouter from 'vue-router'
import routeList from './routeList'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routeList
})

export default router
