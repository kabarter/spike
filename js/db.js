// Import the functions from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    deleteDoc, 
    query, 
    where, 
    enableIndexedDbPersistence 
    } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
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
    // measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCourses(db) {
    const coursesCol = collection(db, "courses");
    const courseSnapshot = await getDocs(coursesCol);
    const courseList = courseSnapshot.docs.map((doc) => doc.data());
    return courseList;
}

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          console.log("Persistence failed")

      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.log("Persistence is not valid")
      }
  });


//Accessing HTML elements for form and UL
const courseList = document.getElementById('course-list');
const form = document.getElementById('add-course-form')


// setting up LI and creating delete
function renderCourses(dc){
    let li = document.createElement("li");
    let code = document.createElement("span");
    let name = document.createElement("span");
    let cross = document.createElement("div");
    
    li.setAttribute('data-id', dc.id);
    code.textContent = dc.data().code;
    name.textContent = dc.data().name;
    cross.textContent = 'X';

    li.appendChild(code);
    li.appendChild(name);
    li.appendChild(cross);

    courseList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "courses", id))
    })
}

//creating snapshot
const courses = getDocs(collection(db, 'courses')).then((snapshot) => {
    snapshot.forEach((doc) =>{
        renderCourses(doc)
    })
})

const q = query(collection(db, "courses"), where("name", "==", "EN"));
const querySnapshot =  await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
})

// const upDoc = doc(db, "registration");
//   updateDoc(upDoc, {
//      course_ID: "Zoo Keeper"
//  })


//submitting the form
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "courses"), {
        name: form.name.value,
        code: form.code.value,
    })
    
})