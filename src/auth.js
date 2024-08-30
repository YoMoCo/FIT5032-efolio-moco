import { ref } from 'vue'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

const login = (username, password) => {
  const validUsername = 'admin'
  const validPassword = 'password'

  console.log('Login attempt with:', username, password)

  if (username === validUsername && password === validPassword) {
    console.log('Credentials are valid. Setting isAuthenticated to true.')
    localStorage.setItem('isAuthenticated', 'true')  // Save auth state to localStorage
    isAuthenticated.value = true  // Update the reactive state
    return true
  } else {
    console.log('Invalid credentials')
    return false
  }
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
}

const useAuth = () => {
  return {
    isAuthenticated,
    login,
    logout,
  }
}

export default useAuth
