//Authentication
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
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        Map.Modal.getInstance(modal).close();
        window.location.replace("/pages/mail.html");
        // signupForm.reset();
        
    })
    .catch((error) => {
        const errorCache = error.code;
        const errorMessage = error.message;
        signupForm.reset();
    });
});

