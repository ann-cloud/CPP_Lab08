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
          <h1>Edit room</h1>
          <form class="room-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="square">Enter square</label>
                <input type="number" id="square" name="square" v-model="square" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="doors">Enter the number of doors</label>
                <input type="number" id="doors" name="doors" v-model="doors" required>
            </div>
            <div class="form-group">
                <label for="windows">Enter the number of windows</label>
                <input type="number" id="windows" name="windows" v-model="windows" required>
            </div>
            <div class="form-group">
            <label for="normative">Select normative</label>
                <select id="normative" name="normative" v-model="normative" required>
                    <option value="ordinary">Ordinary</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
  
            <button class="save-button" type="submit" @click="saveRoom">Save</button>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
    },
    name: 'RoomModalComponent',
    props: {
      buildingNumber: {
        type: Number,
        required: false,
      },
    },
    data() {
      return {
        showModal: true,
        square: "",
        doors: "",
        windows: "",
        normative: "",
      }
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.$emit('closeEditRoomModal');
      },
      editRoom() {
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  
  .form-group
  {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    font-size: large;
    justify-content: space-between;
    align-items: center;
  }

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
  
  label {
  margin-bottom: 5px;
  padding: 10px
  }

  input, select {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  }

  .save-button {
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
  
  .save-button:hover {
    background-color: #45a049;
  }
  </style>
  