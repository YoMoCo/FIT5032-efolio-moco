
   <template>
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h1 class="text-center mb-4">Firebase Register</h1>
        <div class="form-group mb-3">
          <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
        </div>
        <button class="btn btn-primary w-100" @click="register">Save to Firebase</button>
      </div>
    </div>
  </template>


<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../firebase/init.js";

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
