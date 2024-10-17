<template>
  <div id="app" class="d-flex justify-content-center align-items-center">
    <div class="card shadow p-4">
      <div class="card-body">
        <h1 class="text-center card-title">Add Book</h1>
        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input v-model="isbn" type="text" id="isbn" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input v-model="name" type="text" id="name" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Add Book</button>
        </form>
        <p v-if="message" class="mt-3 text-success">{{ message }}</p>
        <p v-if="error" class="mt-3 text-danger">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const isbn = ref('');
  const name = ref('');
  const message = ref(null);
  const error = ref(null);
  
  const addBook = async () => {
    try {
      const newBook = {
        // to make sure all the data is capitalized though number may not applied
        isbn: isbn.value.toUpperCase(),
        name: name.value.toUpperCase() 
      };
      
      const response = await axios.post('https://addbook-n5bhtgb6aq-uc.a.run.app', newBook);
      
      if (response.status === 200) {
        message.value = 'Book added successfully!';
        error.value = null;
        isbn.value = ''; 
        name.value = '';
      } else {
        throw new Error('Failed to add book.');
      }
    } catch (err) {
      console.error('Error adding book:', err);
      error.value = 'Error adding book.';
      message.value = null;
    }
  };
  </script>
  
  <style scoped>

  </style>
  