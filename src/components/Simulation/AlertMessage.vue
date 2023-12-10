<template>
    <div :class="`alert-message ${type}`">
      <p>{{ message }}</p>
      <button @click="$emit('close')">X</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'info' // 'info', 'warning', 'success'
      }
    }
  };
  </script>
  
  <style scoped>
  .alert-message {
    padding: 10px;
    border-radius: 5px;
    color: white;
    position: relative;
    margin: 10px 0;
  }
  
  .info {
    background-color: #5BC0DE; /* блакитний */
  }
  
  .warning {
    background-color: #F0AD4E; /* жовтий */
  }
  
  .success {
    background-color: #5CB85C; /* зелений */
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
  