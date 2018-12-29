import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import firebase from './components/firebase.js'
import User from './components/User.vue'
import About from './components/About.vue'
import PeekUser from './components/PeekUser.vue'
import nprogress from 'nprogress'

Vue.use(Router)

const router =  new Router({
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
      component: About
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/peekuser/:uid',
      name: 'peekuser',
      component: PeekUser
    },
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else next()
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else next()
  }
  else next()
})

router.afterEach(() => {
  setTimeout(function () {nprogress.done()}, 300)
})

export default router
