<template>
    <div class="building-item">
      <div class="building-info">
        <p>
            <strong>{{ `Building ${buildingId}:` }}</strong>
            Apartments Count: {{ apartmentsCount }}
        </p>
      </div>
      <div class="action-buttons">
        <button @click="viewBuilding">
            <img src="@/assets/img/see.png" alt="View building">
        </button>
      </div>
    </div>
    <ViewBuildingModal v-if="showBuildingModal" :buildingId="buildingId" @closeBuildingModal="showBuildingModal = false"/>
  </template>
  
  <script>
  import ViewBuildingModal from './ViewBuildingModal.vue';

  export default {
    components: {
      ViewBuildingModal,
    },
    props: {
      buildingId: {
        type: Number,
        required: true,
      },
      apartmentsCount: {
        type: Number,
        required: true,
      },
    },
    data() {
    return {
      showBuildingModal: false,
    };
  },
    methods: {
      viewBuilding() {
        this.showBuildingModal = true;
      }
    },
  };
  </script>
  
  <style scoped>
  .building-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #EFF6EE;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .building-item:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow on hover */
}

  .building-info {
    margin-left: 10px;
  }
  
  .action-buttons button {
    margin-left: 5px;
    background: none;
    border: none;
  }
  </style>
  