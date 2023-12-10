<template>
  <div class="modal" v-if="showModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <h2>You need to log in first</h2>
        <router-link to="/sign-in"><button class="login-button" @click="login">Login</button></router-link>
        <p>Have no account yet?</p>
        <router-link to="/sign-up"><button class="signup-button" @click="signup">Sign up</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit('closeNeedToLogin');
    },
  }
};
</script>

<style scoped>
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
  padding: 10px 30px;
  background-color: #EFF6EE;
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
