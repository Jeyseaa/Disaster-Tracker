import { initializeApp } from 'firebase/app'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyCZNzV46ZpxIPOZIsBoAzOpnl6mdyCP_RM",
  authDomain: "disaster-76d62.firebaseapp.com",
  databaseURL: "https://disaster-76d62-default-rtdb.firebaseio.com",
  projectId: "disaster-76d62",
  storageBucket: "disaster-76d62.appspot.com",
  messagingSenderId: "208851692863",
  appId: "1:208851692863:web:e5e654aceb8dec4ee1778a",
  measurementId: "G-F0WTCPNT87"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, firestore, database };

// Function to handle user sign up
const handleSignUpSubmit = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;
      console.log('User created:', user);
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorMessage);
    });
};
