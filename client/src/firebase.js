// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZyph0eZ9fcTXg3vZESAbuFT6S5kHS3gc",
  authDomain: "quiz-hnf.firebaseapp.com",
  projectId: "quiz-hnf",
  storageBucket: "quiz-hnf.appspot.com",
  messagingSenderId: "78428174157",
  appId: "1:78428174157:web:5e314eb5b349331896a904",
  measurementId: "G-GDMPSF18WS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {
    firebase
}