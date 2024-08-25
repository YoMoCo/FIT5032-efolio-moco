<template>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="form">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" id="username" v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <p v-if="error" class="text-danger">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref(null)
  const router = useRouter()
  
  const handleLogin = () => {
    // Hardcoded credentials
    const validUsername = 'admin'
    const validPassword = 'password'
  
    if (username.value === validUsername && password.value === validPassword) {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/')
    } else {
      error.value = 'Invalid username or password'
    }
  }
  </script>