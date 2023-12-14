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
    beforeEnter: () => {
      if (store.getters.isAuthenticated) {
        let userId = store.getters.getUserId;

        if (userId !== undefined && !isNaN(userId) && userId != null) {
          const promise = axios.get('http://localhost:8080/api/auth/users/' + userId);

          // using .then, create a new promise which extracts the data
          promise.then((response) => {
            if (response.data == null || response.data === undefined) {
              store.dispatch('authenticate', {
                authenticated: false,
                userId: undefined,
                username: undefined,
                email: undefined,
              });
            }
            else {
              const userId = response.data.id;
              const username = response.data.username;
              const email = response.data.email;

              store.dispatch('authenticate', {
                authenticated: true,
                userId: userId,
                username: username,
                email: email,
              }).catch(() => {
                store.dispatch('authenticate', {
                  authenticated: false,
                  userId: undefined,
                  username: undefined,
                  email: undefined,
                });
              })
            }
          })
        }
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
      try {
        if (store.getters.isAuthenticated) {
          let userId = store.getters.getUserId;

          if (userId !== undefined && !isNaN(userId) && userId != null) {
            const promise = axios.get('http://localhost:8080/api/auth/users/' + userId);

            promise.then((response) => {
              if (response.data == null || response.data === undefined) {
                store.dispatch('authenticate', {
                  authenticated: false,
                  userId: undefined,
                  username: undefined,
                  email: undefined,
                });

                next(from);
              }
              else {
                const userId = response.data.id;
                const username = response.data.username;
                const email = response.data.email;

                store.dispatch('authenticate', {
                  authenticated: true,
                  userId: userId,
                  username: username,
                  email: email,
                }).catch(() => {
                  store.dispatch('authenticate', {
                    authenticated: false,
                    userId: undefined,
                    username: undefined,
                    email: undefined,
                  });
                })

                next();
              }
            })
          }

        } else {
          alert('You need to log in first 🤓');
          next('/sign-in');
        }
      } catch (error) {
        console.log(error);
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
