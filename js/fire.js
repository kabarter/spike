// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2ZhBu-5QP4Ffo6z5qBjBl_JjBVfq9uI4",
    authDomain: "spike-90e45.firebaseapp.com",
    projectId: "spike-90e45",
    storageBucket: "spike-90e45.appspot.com",
    messagingSenderId: "841243009957",
    appId: "1:841243009957:web:ddd51ff546145e05f03e4c",
    measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getRegistrations(db) {
    const registrationsCol = collection(db, "registration");
    const registrationSnapshot = await getDocs(registrationsCol);
    const registrationList = registrationSnapshot.docs.map((doc) => doc.data());
    return registrationList;
}

//Accessing HTML elements for form and UL
const registrationList = document.getElementById('registration-list');
const form = document.getElementById('add-registration-form')


// setting up LI and creating delete
function renderRegistration(dc){
    let li = document.createElement("li");
    let course_ID = document.createElement("span");
    let course_name = document.createElement("span");
    let cross = document.createElement("div");
    
    li.setAttribute('data-id', dc.id);
    course_ID.textContent = dc.data().course_ID;
    course_name.textContent = dc.data().course_name;
    cross.textContent = 'x';

    li.appendChild(course_ID);
    li.appendChild(course_name);
    li.appendChild(cross);

    registrationList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "registration", id))
    })
}

//creating snapshot
const registrations = getDocs(collection(db, 'registration')).then((snapshot) => {
    snapshot.forEach((doc) =>{
        renderRegistration(doc)
    })
})

const q = query(collection(db, "registration"), where("course_name", "==", "English Comp I"));
const querySnapshot =  await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
})

const upDoc = doc(db, "registration", "VaHE5LyVO7mWuKEC4KeL");
  updateDoc(upDoc, {
     course_ID: "Unique Books"
 })


//submitting the form
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "registration"), {
        course_name: form.course_name.value,
        course_ID: form.course_ID.value,
    })
    
})