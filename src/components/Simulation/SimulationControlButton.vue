<template>
    <button :class="`btn ${buttonType}`" @click="onClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      buttonType: {
        type: String,
        default: 'start' // 'start' or 'stop'
      }
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .start {
    background-color: #417B5A; /* зелений */
  }
  
  .stop {
    background-color: #D9534F; /* червоний */
  }
  
  /* Додайте стилі для інших станів кнопки за необхідності */
  </style>
  