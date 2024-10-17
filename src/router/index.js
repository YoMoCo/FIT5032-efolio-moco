import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'
import useAuth from '../auth' 
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseSignInView from '@/views/FirebaseSignInView.vue'
import AddNewBook from '@/views/AddNewBook.vue'
import BookList from '../components/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddNewBookEntry from '@/views/AddNewBookEntry.vue'
import WeatherView from '@/views/WeatherView.vue'
import BookCountAPI from '@/views/BookCountAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/WeatherView',
    name: 'WeatherView',
    component: WeatherView
  },
  {
    path: '/BookCountAPI',
    name: 'BookCountAPI',
    component: BookCountAPI
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/books',
    name: 'booklist',
    component: BookList 
  },
  {
    path: '/AddNewBook',
    name: 'AddNewBook',
    component: AddNewBook
  },
  {
    path: '/AddNewBookEntry',
    name: 'AddNewBookEntry',
    component: AddNewBookEntry
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignInView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }  
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView 
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI 
  }
]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = useAuth()  

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuthenticated.value) {
     
      next({ name: 'AccessDenied' })
    } else {
      next() 
    }
  } else {
    next() 
  }
})

export default router
