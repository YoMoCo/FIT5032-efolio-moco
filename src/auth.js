import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from './firebase/init'; 

const isAuthenticated = ref(false);
const currentUser = ref({
  email: null,
  role: null,  
});

const auth = getAuth();

const useAuth = () => {
 
  const fetchUserRole = async (userUid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userUid));
      if (userDoc.exists()) {
        // console.log("User document data:", userDoc.data()); 
        currentUser.value.email = userDoc.data().email || 'unknown';
        currentUser.value.role = userDoc.data().role || 'unknown'; 
      } else {
        console.log("User document does not exist.");
        currentUser.value.role = null;
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };



  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isAuthenticated.value = true;
      currentUser.value.email = user.email;
      await fetchUserRole(user.uid); 
    } else {
      console.log('User is logged out');  
      isAuthenticated.value = false;
      currentUser.value.email = null;
      currentUser.value.role = null; 
    }
  });

  const logout = async () => {
    try {
      await signOut(auth); 
      isAuthenticated.value = false;
      currentUser.value.email = null;
      currentUser.value.role = null; 
      console.log('User logged out successfully');  
      console.log(auth.currentUser);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    isAuthenticated,
    currentUser,
    logout,
  };
};

export default useAuth;
