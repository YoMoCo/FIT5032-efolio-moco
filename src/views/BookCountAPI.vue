<template>
  <div class="d-flex justify-content-center align-items-center">
    <pre>{{ jsondata }}</pre>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const jsondata = ref(null); 
const error = ref(null); 

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://countbooks-n5bhtgb6aq-uc.a.run.app');
    jsondata.value = response.data;
    error.value = null;
  } catch (err) {
    console.error('Error fetching book count:', err);
    error.value = 'Error fetching book count.';
    jsondata.value = null;
  }
};

onMounted(() => {
  getBookCountAPI();
});
</script>
