<template>
    <div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 50vh;">
      <h2 class="mb-4">Access Denied</h2>
      <p class="mb-4">You must be logged in to view this page.</p>
      <router-link to="/FireLogin" class="btn btn-primary btn-lg">Login</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .container {
    max-width: 600px; 
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-weight: bold;
  }
  
  p {
    font-size: 1.2rem; 
  }
  </style>
  