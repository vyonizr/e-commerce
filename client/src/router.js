import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Catalogues from './views/Catalogues.vue'
import AddProduct from './views/AddProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/catalogues',
      name: 'catalogues',
      component: Catalogues
    },
    {
      path: '/add-product',
      name: 'addProduct',
      component: AddProduct
    },
    {
      path: '/users/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/users/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/carts/:productId',
      name: 'oneProduct',
      component: () => import('./views/ProductDetail.vue')
    }
  ]
})
