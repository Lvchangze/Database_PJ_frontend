import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Main from '@/components/Main'
import SearchAndModify from '@/components/SearchAndModify'
import AddNewPatient from '@/components/AddNewPatient'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {//与后端联通时，此处要改，默认是login
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/SearchAndModify',
          name: 'SearchAndModify',
          component: SearchAndModify,
        },
        {
          path: '/AddNewPatient',
          name: 'AddNewPatient',
          component: AddNewPatient,
        }
      ]
    },
  ]
})
