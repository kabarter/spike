import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2ZhBu-5QP4Ffo6z5qBjBl_JjBVfq9uI4",
    authDomain: "spike-90e45.firebaseapp.com",
    projectId: "spike-90e45",
    storageBucket: "spike-90e45.appspot.com",
    messagingSenderId: "841243009957",
    appId: "1:841243009957:web:ddd51ff546145e05f03e4c",
    // measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//signup 
const signupform = document.querySelector("signup form");
signupform.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupform["singup email"].value;
    const password = signupform["signup password"].value;
    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user
    })
})