import { createRouter, createWebHistory } from 'vue-router';

//pages
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/request/ContactCoach.vue';
import RequestsReceived from './pages/request/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import UserLogin from './components/auth/UserLogin.vue';
import UserRegistration from './components/auth/UserRegistration.vue'
import store from './store/index.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', 
          redirect: '/coaches'
        },
        { path: '/coaches', 
          component: CoachesList
        },
        { 
            path: '/coaches/:id', 
            component: CoachDetail,
            props: true,
            children: [
                {path: 'contact', component: ContactCoach}
            ]
        },
        { path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
        { path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
        { path: '/auth', 
          redirect: '/auth/login',
          children: [
            {path: 'login', component: UserLogin},
            {path: 'registration', component: UserRegistration}
          ],
          component: UserAuth,
          meta: {requiresUnauth: true}},
        { path: '/:notFound(.*)', component: NotFound}
    ]
})

router.beforeEach((to, from, next) => {
  if(!store.getters.isAuthenticated && to.meta.requiresAuth) {
    next('/auth/login')
  } else if(store.getters.isAuthenticated && to.meta.requiresUnauth) {
    next('/coaches')
  } else {
    next()
  }
})

export default router;