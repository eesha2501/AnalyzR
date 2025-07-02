import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPP9O381rNIkf2Dpb2wC48mvx9jOEZMl4",
  authDomain: "analyzr-01.firebaseapp.com",
  projectId: "analyzr-01",
  appId: "1:214172503935:web:3a1e18df146b384a23d44a",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Setup provider
const provider = new GoogleAuthProvider();

// ✅ Sign in with Google
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// ✅ Sign out
export const logout = () => signOut(auth);

// ✅ Export auth object for listeners
export { auth };
