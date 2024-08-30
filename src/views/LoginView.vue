<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <h2 class="text-center my-4">Login</h2>
        <form @submit.prevent="handleLogin" class="form">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" v-model="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
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

<style scoped>
.container {
  max-width: 600px;
  text-align: center;
  padding: 20px;
  margin-top: 50px; 
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h2 {
  font-weight: bold;
}

.form-label {
  text-align: left; 
}

</style>
