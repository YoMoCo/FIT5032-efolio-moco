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
import useAuth from '../auth'

const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuth()

const handleLogin = () => {
  console.log('Attempting to log in...')
  if (auth.login(username.value, password.value)) {
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>
