<template>
  <HomeContent />
  <div class="modal" v-if="showModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header">
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      </div>
      <div class="modal-body">
        <h1>Log in</h1>
        <form class="user-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">User name</label>
            <input type="text" id="username" name="username" v-model="username">
          </div>
          <div class="form-group">
          <label for="password">Password</label>
            <div class="password-container">
              <input :type="passwordFieldType" id="password" name="password" v-model="password">
              <button type="button" class="toggle-password" @mouseenter="togglePasswordVisibility" @mouseleave="togglePasswordVisibility">
                <img src="@/assets/img/see.png" alt="Toggle Password Visibility">
              </button>
            </div>
          </div>

          <button class="login-button" @click="login">Login</button>
          <p>Have no account yet?</p>
          <router-link to="/sign-up"><button class="signup-button" type="submit">Sign up</button></router-link>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import HomeContent from '@/components/Home/HomeContent.vue';
import axios from 'axios';

export default {
  components: {
    HomeContent,
  },
  name: 'ModalLoginComponent',
  data() {
    return {
      showModal: true,
      username: '',
      password: '',
      passwordFieldType: 'password',
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$router.push('/');
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
            username: this.username,
            password: this.password
        });
        
        const userId = response.data.id;
        const username = response.data.username;
        const email = response.data.email;
        const accessToken = response.data.accessToken;

        this.$store.dispatch('authenticate', {
          authenticated: true,
          userId,
          username,
          email,
          accessToken,
        });
        
        console.log('Sign-in successful:', response.data);
        this.$router.push('/')
      } catch (error) {
        alert('Sign in failed!');
        console.error('Error signing ip:', error.response.data.message);
        this.$router.push('/sign-up');
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style scoped>

.form-group
{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  font-size: large;
  justify-content: space-between;
  align-items: center;
}

img
{
  width: 24px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #EFF6EE;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.close-button {
  font-size: 24px; /* Adjust the font size as needed */
  cursor: pointer;
  border: none;
  background: none;
}

.modal-body {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  padding: 10px
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
}

.login-button, .signup-button {
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.login-button {
  background-color: #417B5A;
  margin-top: 30px;
}
.login-button:hover {
  background-color: #45a049;
}

.signup-button {
  background-color: #273043;
}

.signup-button:hover {
  background-color: #435273;
}
</style>
