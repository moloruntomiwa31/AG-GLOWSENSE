import { defineStore, acceptHMRUpdate } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { ref } from "vue";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);
  const userSet = ref(false);

  // Authenticate users and store additional information
  const signUp = async (email, password, firstName, lastName, phoneNumber) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      user.value = res.user;
      // Store additional user information
      await setDoc(doc(db, "users", res.user.uid), {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        isAdmin: false,
      });
    }
  };

  const logIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res) {
      // Retrieve additional user information
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      if (userDoc.exists()) {
        user.value = { ...res.user, ...userDoc.data() };
      } else {
        user.value = res.user;
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Store additional user information if needed
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          first_name: user.displayName.split(" ")[0],
          last_name: user.displayName.split(" ")[1],
          email: user.email,
          isAdmin: false,
        });
      }
      user.value = { ...user, ...userDoc.data() };
    } catch (e) {
      console.error("Error signing in with Google: ", e);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    user.value = null;
  };

  return { user, userSet, signUp, logIn, signInWithGoogle, logOut };
});

// Get user on page load
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      useUserStore().user = { ...user, ...userDoc.data() };
    } else {
      useUserStore().user = user;
    }
  } else {
    useUserStore().user = null;
  }
  useUserStore().userSet = true;
});

// HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
