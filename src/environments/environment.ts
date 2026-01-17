// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAMXrpFFTESfOXq3sdPMgn-DLeqj9fHZ78",
    authDomain: "ionic-95e2a.firebaseapp.com",
    projectId: "ionic-95e2a",
    storageBucket: "ionic-95e2a.firebasestorage.app",
    messagingSenderId: "535213025237",
    appId: "1:535213025237:web:e8a02123c972c52a96ff5c",
    measurementId: "G-WMV3CWCS9N"
  }
};

// // Initialize Firebase
// const app = initializeApp(environment);
// const analytics = getAnalytics(app);