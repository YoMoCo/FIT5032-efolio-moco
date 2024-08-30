<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
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
        <li class="nav-item" v-if="!auth.isAuthenticated.value">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button @click="logout" class="btn btn-link nav-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuth from '../auth'

const auth = useAuth()  
const router = useRouter()

const navigateToAbout = () => {
  console.log('Navigating to About. IsAuthenticated:', auth.isAuthenticated.value)  
  if (auth.isAuthenticated.value) {
    router.push('/about')
  } else {
    router.push('/access-denied')
  }
}

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>