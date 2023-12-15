<template>
    <div :class="`alert-message ${type}`">
      <div class="building-number"> Building {{ buildingId }}</div>
      <div class="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      buildingId: {
        type: Number,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'error' // 'error', 'warning', 'success'
      }
    }
  };
  </script>
  
  <style scoped>
  .alert-message {
    padding: 10px 30px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .info {
    background-color: #3b9fe2; 
  }
  
  .error {
    background-color: #e70e0e; 
  }
  
  .warning {
    background-color: #f2ec38; 
  }
  
  .success {
    background-color: #5CB85C; 
  }
  
  .building-number
  {
    margin-right: 50px;
  }
  .alert-message button {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  </style>
  