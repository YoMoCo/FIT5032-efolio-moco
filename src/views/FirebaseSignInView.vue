   <template>
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h1 class="text-center mb-4">Sign in</h1>
        <div class="form-group mb-3">
          <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
        </div>
        <button class="btn btn-primary w-100" @click="signin">Sign in via Firebase</button>
        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      </div>
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
  
      console.log("Firebase Register Successful!");
      router.push("/");
      console.log(auth.currentUser);
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
      console.log(error.message);
      errorMessage.value = error.message;
    }
  };
  </script>