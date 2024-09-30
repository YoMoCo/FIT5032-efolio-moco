<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
            @click.prevent="navigateToAbout"
          >
            About
          </router-link>
        </li>

        <li class="nav-item" v-if="auth.isAuthenticated.value">
          <router-link to="/AddNewBook" class="nav-link" active-class="active">
            Add New Book
          </router-link>
        </li>


        <li class="nav-item" v-if="auth.isAuthenticated.value">
          <router-link to="/AddNewBookEntry" class="nav-link" active-class="active">
            Add New Book Entry
          </router-link>
        </li>

        <li class="nav-item" v-if="auth.isAuthenticated.value">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>

        <li class="nav-item">
          <button v-if="auth.isAuthenticated.value" @click="logout" class="btn btn-link nav-link">
            Logout
          </button>
          <router-link v-else to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>

        <li class="nav-item ">
          <router-link v-if="!auth.isAuthenticated.value" to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>

        <li class="nav-item" v-if="auth.isAuthenticated.value">
          <span class="nav-link">
            Logged in as: {{ auth.currentUser.value.role || 'unknown' }} ({{ auth.currentUser.value.email || 'no email' }})
          </span>
        </li>

      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../auth'; 

const auth = useAuth();  
const router = useRouter();

const navigateToAbout = () => {
  if (auth.isAuthenticated.value) {
    router.push('/about');
  } else {
    router.push('/access-denied');
  }
};

const logout = () => {
  auth.logout();  
  router.push('/FireLogin');  
};
</script>

