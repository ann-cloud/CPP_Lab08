<template>
  <div class="header-user-overlay" @mouseleave="closeOverlay">
    <router-link to="/sign-in">
      <div class="overlay-row" v-if="!authenticated">Log in</div>
    </router-link>
    <router-link to="/sign-up">
      <div class="overlay-row" v-if="!authenticated">Sign up</div>
    </router-link>
    <router-link to="/">
      <div class="overlay-row" v-if="authenticated && currentRoute !== '/'">Home</div>
    </router-link>
    <router-link to="/profile">
      <div class="overlay-row" v-if="authenticated && currentRoute !== '/profile'">Profile</div>
    </router-link>
    <!-- <router-link to="/simulation">
      <div class="overlay-row" v-if="authenticated && currentRoute !== '/simulation'">Simulation</div>
    </router-link> -->
    <div class="overlay-row" v-if="authenticated" id="logout" @click="handleButtonClick">Log out</div>
    <ModalConfirmLogout v-if="showModal" @logoutConfirmed="closeOverlay"/>
  </div>
</template>

<script>
import ModalConfirmLogout from '@/components/Authorization/ModalConfirmLogout.vue';

export default {
  components: {
    ModalConfirmLogout,
  },
  name: 'HeaderUserOverlayComponent',
  data() {
    return {
      showModal: false,
      currentRoute: this.$route.path, 
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    '$route'(to) {
      // Update currentRoute when the route changes
      this.currentRoute = to.path;
    },
  },
  methods: {
    handleButtonClick() {
      this.showModal = true;
    },
    closeOverlay() {
      this.$emit('close-overlay');
    },
  },
};
</script>

<style scoped>
.header-user-overlay {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #848AA0;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  border-radius: 5px;
}

.overlay-row {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.overlay-row:hover {
  background-color: #2c3e50;
}
</style>
  