<template>
      <h2 style="color: white;">Information about simulation</h2>
      <AlertMessage
        v-for="(alert, index) in alerts"
        :key="index"
        :buildingId="alert.buildingId"
        :message="alert.message"
        :type="alert.type"
      />
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
        { buildingId: 1, message: "some alert message", type: 'info' },
          { buildingId: 1, message: "some alert message", type: 'error' },
          { buildingId: 1, message: "some alert message", type: 'warning' },
          { buildingId: 1, message: "some alert message", type: 'success' },
          { buildingId: 1, message: "some alert message", type: 'info' },
          { buildingId: 1, message: "some alert message", type: 'error' },
          { buildingId: 1, message: "some alert message", type: 'warning' },
          { buildingId: 1, message: "some alert message", type: 'success' },
          { buildingId: 1, message: "some alert message", type: 'info' },
          { buildingId: 1, message: "some alert message", type: 'error' },
          { buildingId: 1, message: "some alert message", type: 'warning' },
          { buildingId: 1, message: "some alert message", type: 'success' },
        ]
      };
    },
    methods: {

    }
  };
  </script>
  
  