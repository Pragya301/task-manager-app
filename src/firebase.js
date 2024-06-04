

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyCuOCeb72HLMbDvVadRtlBDfrM2oUf7xrU",
  authDomain: "task-manager-4bea7.firebaseapp.com",
  projectId: "task-manager-4bea7",
  storageBucket: "task-manager-4bea7.appspot.com",
  messagingSenderId: "879320143581",
  appId: "1:879320143581:web:02cba38109cfca79396d34",
  measurementId: "G-V23JE3P4T4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
