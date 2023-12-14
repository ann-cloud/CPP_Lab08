<template>
  <div class="modal" v-if="showModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header">
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
      </div>
      <div class="modal-body">
        <h1 style="color: #273043;">Are you sure you want to log out?</h1>
        <button class="logout-button" @click="confirmLogout">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit('logoutConfirmed');
    },
    async confirmLogout() {
      try {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");

        const userId = this.$store.getters.getUserId;
        const response = await axios.delete(`http://localhost:8080/api/auth/refreshtoken/${userId}`);

        this.$store.dispatch('authenticate', {
          authenticated: false,
          userId: undefined,
          username: undefined,
          accessToken: undefined,
        });

        console.log('Logout successful:', response.data);
        this.$router.push('/sign-in');
        this.closeModal();
      } catch (error) {
        if (this.$store.getters.getAccessToken == null || this.$store.getters.getAccessToken === undefined) {
          alert('Logout failed, so performed clean logout.');
          if (error.response !== undefined)
            console.error('Error logging out:', error.response.data.message);
          return;
        }
        else {
          console.log('Logout successful:');
          this.$router.push('/sign-in');
          this.closeModal();
        }
      }
    }
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
  font-size: 24px;
  /* Adjust the font size as needed */
  cursor: pointer;
  border: none;
  background: none;
}

.modal-body {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
}

.logout-button {
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  background-color: #417B5A;
  margin-top: 50px;
  align-self: flex-end;
}

.logout-button:hover {
  background-color: #45a049;
}
</style>
