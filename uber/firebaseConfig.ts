import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDdx23086NtclWQGzzE2vr0VK8gkTMEKvk",
  authDomain: "uber-42a30.firebaseapp.com",
  projectId: "uber-42a30",
  storageBucket: "uber-42a30.appspot.com",
  messagingSenderId: "529125135074",
  appId: "1:529125135074:web:6e9c6ee91f2b5c22f304bb",
  measurementId: "G-0VF8ZTE9ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };