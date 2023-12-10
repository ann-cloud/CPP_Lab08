<template>
    <div class="simulation-info">
      <h3>Information about simulation</h3>
      <AlertMessage
        v-for="(alert, index) in alerts"
        :key="index"
        :message="alert.message"
        :type="alert.type"
        @close="removeAlert(index)"
      />
    </div>
  </template>
  
  <script>
  import AlertMessage from './AlertMessage.vue';
  
  export default {
    components: {
      AlertMessage
    },
    data() {
      return {
        alerts: [
          // Приклади повідомлень
        ]
      };
    },
    methods: {
      removeAlert(index) {
        this.alerts.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .simulation-info {
    /* Стилі для контейнера з інформацією про симуляцію */
  }
  </style>
  