<template>
    <div>
      <h1>Sign in</h1>
      <p>
        <input type="text" placeholder="Email" v-model="email" />
      </p>
      <p>
        <input type="password" placeholder="Password" v-model="password" />
      </p>
      <p>
        <button @click="signin">Sign in via Firebase</button>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  
  const auth = getAuth();
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Firebase Sign-in Successful!");
        // Redirect to the home page or a specific route after sign-in
        router.push("/");
        console.log(auth.currentUser); // To check the current signed-in user
      })
      .catch((error) => {
        // Log any errors during sign-in
        console.log(error.code);
      });
  };
  </script>