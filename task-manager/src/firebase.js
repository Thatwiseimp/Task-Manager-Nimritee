import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDefb4aLx0tXoiMzOAqWcCu0FWh9FW9lkE",
  authDomain: "task-manager-d4412.firebaseapp.com",
  projectId: "task-manager-d4412",
  storageBucket: "task-manager-d4412.appspot.com",
  messagingSenderId: "945249937491",
  appId: "1:945249937491:web:d5b52afe49f9b630437ea6",
  measurementId: "G-9W02CS527M"
});

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{ db, auth, provider, firebase }
