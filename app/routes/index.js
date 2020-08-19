import Vue from 'vue'
import Router from 'vue-router'
import store from '#/store'
import core from './../plugins/core'

import App from '#/layouts/App'
import Profile from '#/pages/Profile'

import Index from '#/pages/Index' // news page
import Users from '#/pages/Users'
import Tasks from '#/pages/Tasks'
import Clients from '#/pages/Clients'
import Stats from '#/pages/Stats'

import Auth from '#/layouts/Auth'
import Login from '#/pages/Login'
import Logout from '#/pages/Logout'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
        },
        {
          path: '/users/:param',
          name: 'myUsers',
          component: Users,
        },
        {
          path: '/tasks',
          name: 'tasks',
          component: Tasks,
        },
        {
          path: '/tasks/:param1',
          name: 'tasksByFilter',
          component: Tasks,
        },
        {
          path: '/clients',
          name: 'clients',
          component: Clients,
        },
        {
          path: '/clients/:param1',
          name: 'clientsByFilter',
          component: Clients,
        },
        {
          path: '/stats',
          name: 'stats',
          component: Stats
        }
      ]
    },
    {
      path: '/',
      component: Auth,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/logout',
          name: 'logout',
          component: Logout
        },
      ]
    }
  ]
})
router.beforeEach(function (to, from, next) {
  if (core.$session.get('jwt') === null && to.name !== 'login') {
    next({name: 'login'})
  } else if (core.$session.get('jwt') && to.name === 'login') {
    next({name: 'index'})
  } else {
    next()
  }
})

export default router
