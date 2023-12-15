<template>
    <div v-if="isVisible" class="message-popup" :class="messageTypeClass">
    <div class="message-type">{{ messageType.toUpperCase() }}</div>
    <button @click="closePopup" class="close-button">×</button>
    <div class="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
        message: '',
        messageType: 'info', // 'info', 'success', 'warning', 'error'
      };
    },
    computed: {
      messageTypeClass() {
        return `message-${this.messageType}`;
      },
    },
    methods: {
      showMessage(message, type = 'info') {
        this.message = message;
        this.messageType = type;
        this.isVisible = true;
  
        setTimeout(() => {
          this.closePopup();
        }, 5000);
      },
      closePopup() {
        this.isVisible = false;
        this.message = '';
      },
    },
  };
  </script>
  
  <style scoped>

  .message-type
  {
    font-weight: bold;
  }
  .message-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 100px;
    max-width: 300px;
    z-index: 5;
  }
  
  .message-info {
    background-color: #3b9fe2b6;
    color: #fff;
  }
  
  .message-success {
    background-color: #5cb85cb1;
    color: #fff;
  }
  
  .message-warning {
    background-color: #f2ec38b4;
    color: #000000;
  }
  
  .message-error {
    background-color: #e74d3ca3;
    color: #fff;
  }
  
  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
    color: #000000;
  }
  </style>
  