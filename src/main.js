import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import axios from 'axios';

import ModalLogin from '@/./components/Authorization/ModalLogin.vue';
import ModalRegister from '@/./components/Authorization/ModalRegister.vue';
import HomeContent from '@/./components/Home/HomeContent.vue';
import ProfileContent from '@/./components/Profile/ProfileContent.vue';

const routes = [
  {
    path: '/', component: HomeContent,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        let accessToken = store.getters.getAccessToken;

        console.log(accessToken);

        if (accessToken != null) {
          const response = axios.get('http://localhost:8080/api/auth/getUserByRefreshToken', {
            token: accessToken,
          });

          console.log(response);

          if (response.data != null) {
            const userId = response.data.id;
            const username = response.data.username;
            const email = response.data.email;

            this.$store.dispatch('authenticate', {
              authenticated: true,
              userId,
              username,
              email,
            });
          }
        }
        next();
      }
    }
  },
  { path: '/sign-in', component: ModalLogin },
  { path: '/sign-up', component: ModalRegister },
  {
    path: '/profile',
    component: ProfileContent,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        alert('You need to log in first 🤓');
        next('/sign-in');
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
