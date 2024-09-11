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
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, getDoc } from "firebase/firestore";
  import db from "../firebase/init.js"; 
  
  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const router = useRouter();
  
  const auth = getAuth();
  
  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
  
      if (!userDoc.exists()) {
        errorMessage.value = "User not found in Firestore!";
        return;
      }
  
      const userData = userDoc.data();
      const userRole = userData.role;
  
      auth.currentUser.role = userRole; 
  
      router.push("/");
    } catch (error) {
      // Handle sign-in errors
      console.log(error.message);
      errorMessage.value = error.message;
    }
  };
  </script>
  