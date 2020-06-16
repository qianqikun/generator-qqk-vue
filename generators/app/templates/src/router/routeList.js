export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ "../views/404"),
    meta: {
      title: '找不到对应的页面地址',
      noRequireAuth: true
    }
  },
  /* 显示在侧边栏的路由layout的页面 */
  {
    path: '*',
    redirect: '/404'
  }
]
