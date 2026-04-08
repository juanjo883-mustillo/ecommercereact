
import { initializeApp } from "firebase/app";

const firebaseConfig = {
 apiKey: "AIzaSyBuvoDy1JAr-ShUayBydD9Tu3r8KbWe8vQ",
  authDomain: "ecommerce-react-backend.firebaseapp.com",
  projectId: "ecommerce-react-backend",
  storageBucket: "ecommerce-react-backend.firebasestorage.app",
  messagingSenderId: "1039511856059",
  appId: "1:1039511856059:web:201f4ca0558f1a557e1a9e"
};


export const app = initializeApp(firebaseConfig);

