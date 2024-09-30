<template>
    <div id="app">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input v-model="isbn" type="text" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input v-model="name" type="text" id="name" required />
        </div>
        <button type="submit">Add Book</button>
        <p v-if="message">{{ message }}</p>
        <p v-if="error">{{ error }}</p>
      </form>
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
        isbn: isbn.value,
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
  