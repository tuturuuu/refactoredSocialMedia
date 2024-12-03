import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/chatting',
      name: 'chatting',
      component: () => import('../views/ChattingView.vue'),
      children: [
        {
          path: 'room/:name/:id', // Nested route
          component: () => import('../components/messageComponent.vue'), // Loaded into MainView's router-view
        },
      ],
    },
    {
      path: '/detailedUser/:id',
      name: 'detailedUser',
      component: () => import('../views/DetailedUserView.vue'),
    },
  ],
})

export default router
