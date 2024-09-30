<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Manage Books</h1>

    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card shadow p-3">
          <div class="card-header bg-black text-white">
            <h5 class="card-title">Add Book</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="addBook">
              <div class="form-group mb-3">
                <label for="isbn">ISBN:</label>
                <input type="text" class="form-control" v-model="isbn" id="isbn" required />
              </div>
              <div class="form-group mb-3">
                <label for="name">Name:</label>
                <input type="text" class="form-control" v-model="name" id="name" required />
              </div>
              <button type="submit" class="btn btn-success w-100">Add Book</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow p-3">
          <div class="card-header bg-black text-white">
            <h5 class="card-title">Update Book</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateBook">
              <div class="form-group mb-3">
                <label for="updateIsbn">Update Book by ISBN:</label>
                <input type="text" class="form-control" v-model="updateIsbn" id="updateIsbn" placeholder="Enter ISBN" required />
              </div>
              <div class="form-group mb-3">
                <label for="newName">New Name:</label>
                <input type="text" class="form-control" v-model="newName" id="newName" placeholder="Enter new name" required />
              </div>
              <button type="submit" class="btn btn-success w-100">Update Book</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow p-3">
          <div class="card-header bg-black text-white">
            <h5 class="card-title">Delete Book</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="deleteBook">
              <div class="form-group mb-3">
                <label for="deleteIsbn">Delete Book by ISBN:</label>
                <input type="text" class="form-control" v-model="deleteIsbn" id="deleteIsbn" placeholder="Enter ISBN" required />
              </div>
              <button type="submit" class="btn btn-success w-100">Delete Book</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow p-3">
          <div class="card-header bg-black text-white">
            <h5 class="card-title">Retrieve Books</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="retrieveBooks">
              <div class="form-group mb-3">
                <label for="filterIsbn">Where Minimum ISBN IS:</label>
                <input type="text" class="form-control" v-model="filterIsbn" id="filterIsbn" placeholder="Enter minimum ISBN" />
              </div>
              <div class="form-group mb-3">
                <label for="bookLimit">Limit No. of Results:</label>
                <input type="number" class="form-control" v-model="bookLimit" id="bookLimit" placeholder="Enter result limit" />
              </div>
              <div class="form-group mb-3">
                <label for="orderBy">Order by ISBN No.:</label>
                <select v-model="orderBy" class="form-control">
                  <option value="asc">Lowest to Highest</option>
                  <option value="desc">Highest to Lowest</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success w-100 mb-3">Retrieve Books</button>
            </form>
            <ul class="list-group">
              <li v-for="book in books" :key="book.id" class="list-group-item">
                {{ book.name }} - ISBN: {{ book.isbn }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, orderBy as firebaseOrderBy, limit } from 'firebase/firestore';
import db from '../firebase/init.js';

const isbn = ref('');
const name = ref('');
const updateIsbn = ref('');
const newName = ref('');
const deleteIsbn = ref('');
const filterIsbn = ref('');
const bookLimit = ref(5);
const orderBy = ref('asc');  


const books = ref([]);

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value);  
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }
    await addDoc(collection(db, 'books'), { isbn: isbnNumber, name: name.value });
    isbn.value = '';
    name.value = '';
    alert('Book added successfully!');
  } catch (error) {
    console.error('Error adding book:', error);
  }
};

const updateBook = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '==', Number(updateIsbn.value)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const bookRef = querySnapshot.docs[0].ref;
      await updateDoc(bookRef, { name: newName.value });
      alert('Book updated successfully!');
    } else {
      alert('No book found with this ISBN');
    }
  } catch (error) {
    console.error('Error updating book:', error);
  }
};


const deleteBook = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '==', Number(deleteIsbn.value)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const bookRef = querySnapshot.docs[0].ref;
      await deleteDoc(bookRef);
      alert('Book deleted successfully!');
    } else {
      alert('No book found with this ISBN');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};

const retrieveBooks = async () => {
  try {
    const isbnFilter = filterIsbn.value ? Number(filterIsbn.value) : 0;
    const queryLimit = bookLimit.value ? Number(bookLimit.value) : 5;

    const q = query(
      collection(db, 'books'),
      where('isbn', '>', isbnFilter),
      firebaseOrderBy('isbn', orderBy.value),
      limit(queryLimit)
    );

    const querySnapshot = await getDocs(q);
    books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error retrieving books:', error);
  }
};
</script>

<style scoped>
.card-header {
  background-color: #007bff;
}
</style>
