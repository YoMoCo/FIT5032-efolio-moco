<template>
  <div id="app" class="d-flex justify-content-center align-items-center">
    <div class="card text-center">
      <div class="card-body">
        <h1 class="card-title">Book Counter</h1>
        <button @click="getBookCount" class="btn btn-primary">Get Book Count</button>
        <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const count = ref(null);
  const error = ref(null);
  
  const getBookCount = async () => {
    try {
      const response = await axios.get('https://countbooks-n5bhtgb6aq-uc.a.run.app');
      count.value = response.data.count;
      error.value = null;
    } catch (err) {
      console.error('Error fetching book count:', err);
      error.value = 'Error fetching book count.';
      count.value = null;
    }
  };
  </script>
  