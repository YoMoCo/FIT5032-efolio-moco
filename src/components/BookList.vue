<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" style="width: 100%; max-width: 500px;">
      <div class="card-header text-center">
        <h5 class="card-title">Books with ISBN &gt; 1000</h5>
      </div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li v-for="book in books" :key="book.id" class="mb-2">
            <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const books = ref([]);
const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000));
    const querySnapshot = await getDocs(q);
    const booksArray = [];
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() });
    });
    books.value = booksArray;
  } catch (error) {
    console.error('Error fetching books: ', error);
  }
};

onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  font-size: 18px;
}

.card {
  background-color: #f8f9fa;
}

.card-header {
  background-color: #90a1b4;
  color: white;
  padding: 10px;
}

.card-body {
  padding: 20px;
}
</style>
