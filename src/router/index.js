import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '@/stores/user'

const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Manage = () => import('@/views/ManageView.vue')
const Song = () => import('@/views/SongView.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard')
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // checking if the page the user is trying to navigate to requires authentication, if it does not, we call the next function, allowing the user to proceed
  if (!to.meta.requiresAuth) {
    next() //the next function does not return the function so we must return it
    return
  }
  //checking the store for the user's authentication status
  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
