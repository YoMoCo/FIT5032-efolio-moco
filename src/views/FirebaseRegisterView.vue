
   <template>
    <div>
      <h1>Create an Account</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="register">Save to Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import db from "../firebase/init.js"; // Firestore initialization
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      const userEmail = email.value.toLowerCase();
  
      const adminDoc = await getDoc(doc(db, "AdminUser", userEmail));
  
      const role = adminDoc.exists() ? "admin" : "user";
  
      await setDoc(doc(db, "users", user.uid), {
        email: userEmail,
        role: role,
      });
  
      console.log("Firebase Register Successful as " + role + "!");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  </script>
  