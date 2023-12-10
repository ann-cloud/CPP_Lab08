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
          <h1 style="color: #273043;">Are you sure you want to delete {{ type }}?</h1>
          <button class="confirm-button" @click="confirmDelete">Yes</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        required: true,
      }
    },
    name: 'ConfirmDeleteComponent',
    data() {
      return {
        showModal: true
      };
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.$emit('closeConfirmDeleteModal');
      },
      confirmDelete() {
        this.showModal = false;
        this.$emit('deleteConfirmed');
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
  
  .confirm-button {
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
  
  .confirm-button:hover {
    background-color: #45a049;
  }
  
  </style>
  