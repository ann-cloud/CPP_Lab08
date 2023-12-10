<template>
  <div>
    <ModalNeedToLogin v-if="showNeedToLoginModal" @closeNeedToLogin="showNeedToLoginModal = false"/>
    <button class="simulation-button" @click="handleButtonClick">
      Go to simulation
    </button>
  </div>
</template>

<script>
import ModalNeedToLogin from '@/components/Authorization/ModalNeedToLogin.vue';

export default {
  name: 'SimulationButton',
  components: {
    ModalNeedToLogin,
  },
  data() {
    return {
      showNeedToLoginModal: false,
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    handleButtonClick() {
      if (this.authenticated) {
        this.$router.push('/simulation');
      } else {
        this.showNeedToLoginModal = true;
      }
    },
  },
};
</script>

<style scoped>

.simulation-button {
  background-color: #417B5A;
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px #999;
}

.simulation-button:hover {background-color: #45a049}

.simulation-button:active {
  background-color: #45a049;
  box-shadow: 0 2px #666;
  transform: translateY(2px);
}
</style>
