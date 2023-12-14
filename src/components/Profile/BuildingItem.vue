<template>
    <div class="building-item">
      <div class="building-info">
        <p>
            <strong>{{ `Building ${buildingNumber}:` }}</strong>
            Floors: {{ floorsCount }}
        </p>
      </div>
      <div class="action-buttons">
        <button @click="viewBuilding">
            <img src="@/assets/img/see.png" alt="View building">
        </button>
        <button @click="editBuilding">
            <img src="@/assets/img/edit.png" alt="Edit building">
        </button>
        <button @click="deleteBuilding">
            <img src="@/assets/img/delete.png" alt="Delete building">
        </button>
      </div>
    </div>
    <ViewBuildingModal v-if="showBuildingModal" :buildingNumber="buildingNumber" @closeBuildingModal="showBuildingModal = false"/>
    <ConfirmDeleteModal v-if="showDeleteModal" :type="'building'" @closeConfirmDeleteModal="showDeleteModal = false"/>
    <EditBuildingModal v-if="showEditModal" :buildingNumber="buildingNumber" @closeEditModal="showEditModal = false"/>
  </template>
  
  <script>
  import ViewBuildingModal from './ViewBuildingModal.vue';
  import ConfirmDeleteModal from './ConfirmDeleteModal.vue';
  import EditBuildingModal from './EditBuildingModal.vue'

  export default {
    components: {
      ViewBuildingModal,
      ConfirmDeleteModal,
      EditBuildingModal
    },
    props: {
      buildingNumber: {
        type: Number,
        required: true,
      },
      floorsCount: {
        type: Number,
        required: true,
      },
    },
    data() {
    return {
      showBuildingModal: false,
      showDeleteModal: false,
      showEditModal: false,
    };
  },
    methods: {
      viewBuilding() {
        this.showBuildingModal = true;
      },
      editBuilding() {
        this.showEditModal = true;
      },
      deleteBuilding() {
        this.showDeleteModal = true;
      },
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
  