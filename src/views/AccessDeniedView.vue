<template>
    <div class="container">
      <h2>Access Denied</h2>
      <p>You must be logged in to view this page.</p>
      <router-link to="/login" class="btn btn-primary">Login</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 50px;
  }
  </style>
  