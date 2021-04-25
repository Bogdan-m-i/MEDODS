import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-client',
    name: 'About',
    component: () => import('../views/NewClient.vue')
  },
  {
    path: '/simon-say',
    name: 'Simon Say',
    component: () => import('../views/SimonSay.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
