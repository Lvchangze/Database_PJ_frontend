import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Main from '@/components/Main'
import Search from '@/components/Search'
import AddNewPatient from '@/components/AddNewPatient'
import AddNewRoomNurse from '@/components/AddNewRoomNurse'
import ModifyStaff from "@/components/ModifyStaff";

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
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
      redirect: 'Search',
      children: [
        {
          path: '/Search',
          name: 'Search',
          component: Search,
        },
        {
          path: '/AddNewPatient',
          name: 'AddNewPatient',
          component: AddNewPatient,
        },
        {
          path: '/AddNewRoomNurse',
          name: 'AddNewRoomNurse',
          component: AddNewRoomNurse,
        },
        {
          path: '/ModifyStaff',
          name: 'ModifyStaff',
          component: ModifyStaff,
        }
      ]
    },
  ]
})
