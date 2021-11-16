import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/mainpage'),
    redirect:'top',
    children: [
      {
        path:'top',
        component:()=>import('../views/mainpage/top')
      },
      {
        path: 'emergency',
        name: 'emergency',
        component: () => import('../views/emergency/testem'),


      },
      {
        path: 'security',
        name: 'security',
        component: () => import('../views/security/testsec'),


      },
      {
        path: 'firecontrol',
        name: 'firecontrol',
        component: () => import('../views/firecontrol/testfire'),


      },
      {
        path: 'environment',
        name: 'environment',
        component: () => import('../views/environment/testenv'),


      },
    ]
  },



]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
