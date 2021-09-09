import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1eb0N8yJ8GJz-u8cqUtUyP8XVdhpZy2o",
  authDomain: "mern-ecommerce-7c169.firebaseapp.com",
  projectId: "mern-ecommerce-7c169",
  storageBucket: "mern-ecommerce-7c169.appspot.com",
  messagingSenderId: "546124281266",
  appId: "1:546124281266:web:62e0ef33fe46001bd120ab",
  measurementId: "G-Z6VWWFSKVR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
