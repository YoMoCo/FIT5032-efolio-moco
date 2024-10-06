<template>
    <div class="d-flex justify-content-center align-items-center">
      <pre>{{ jsondata }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const jsondata = ref(null);
  
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://getallbooks-n5bhtgb6aq-uc.a.run.app'); 
      jsondata.value = response.data;  
    } catch (error) {
      console.error('Error fetching books:', error);
      jsondata.value = { error: 'Failed to fetch books' };
    }
  };
  
  onMounted(() => {
    fetchBooks();
  });
  </script>
  
  <style scoped>
  pre {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    max-width: 80%;
    overflow-x: auto;
    font-size: 16px;
  }
  </style>
  