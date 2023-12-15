
<template>
  <header class="header">
    <div class="header-user" @mouseenter="openOverlay" @mouseleave="closeOverlay">
      <span class="user-icon">
        <img alt="😎" src="../assets/img/user.png">
      </span>
      <span class="user-status">{{ displayUsername }}</span>
    </div>
    <HeaderUserOverlay v-if="overlayVisible" @close-overlay="closeOverlay" @mouseenter="openOverlay"/>
  </header>
</template>

<script>
import HeaderUserOverlay from './HeaderUserOverlay.vue';

export default {
  name: 'HeaderComponent',
  components: {
    HeaderUserOverlay,
  },
  data() {
    return {
      overlayVisible: false
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.getUsername;
    },
    displayUsername() {
      return this.authenticated ? this.username : 'Guest';
    },
  },
  methods: {
    openOverlay() {
      this.overlayVisible = true;
    },
    closeOverlay() {
      this.overlayVisible = false;
    }
  }
};

</script>

<style scoped>
.header {
  background-color: #1e2a3a;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
  justify-content: flex-end;
}

.header-user {
  display: flex;
  align-items: center;
}

.user-icon {
  margin-right: 10px;
  /* Стилі для іконки користувача */
}

.user-status {
  /* Стилі для тексту статусу користувача */
}
</style>
