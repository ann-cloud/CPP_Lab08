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
        <h1>Sign up</h1>
        <form class="user-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">User name</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" v-model="username" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" v-model="email" required>
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" v-model="phone" @input="validatePhone" required>
          </div>
          <span v-if="phone && !isValidPhone" style="color: red; font-size: 14px; margin: 10px;">
              Please enter a valid phone number.
          </span>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" v-model="password" required>
          </div>

          <div class="form-group">
            <label for="passwordConfirm">Confirm password</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password" v-model="passwordConfirm" required>
          </div>

          <button class="signup-button" type="submit">Sign up</button>
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
  name: 'ModalRegisterComponent',
  data() {
    return {
      showModal: true,
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      passwordFieldType: 'password',
      isValidPhone: true,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$router.push('/');
    },
    validatePhone() {
      const phoneRegex = /^\d{10}$/;
      this.isValidPhone = phoneRegex.test(this.phone);
    },
    async handleSubmit()
    {
      if (this.password !== this.passwordConfirm) {
        alert('Passwords do not match!');
        return;
      }
      if (!this.isValidPhone)
      {
        alert('Enter a valid phone number!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/api/auth/signup', {
          username: this.username,
          email: this.email,
          role: ['admin'],
          password: this.password,
        });
        console.log('Sign-up successful:', response.data);
        this.$router.push('/sign-in');
      } catch (error) {
        alert('Sign up failed!');
        console.error('Error signing up:', error);
      }
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
  margin-left: 50px;
}

.signup-button {
  background-color: #273043;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-top: 30px;
}

.signup-button:hover {
  background-color: #435273;
}
</style>
