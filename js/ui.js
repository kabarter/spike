
// const courses = document.querySelector(".courses");

document.addEventListener('DOMContentLoaded', function() {
    var models = document.querySelectorAll(".models");
    M.model.init(models);

    var items = document.querySelectorAll(".collapsible");
    M.collapsible.init(items)
})



// const renderCourse = (data, id) => {
//     const html = `
//     <div class="content">
//         <form id="add-courses-form">
//             <input type="text" name="cID" placeholder="Enter Course ID">${data.cID}
//             <input type="text" name="name" placeholder="Enter Course Name">${data.name}
            
//         <hr>
//             <button type="submit">Add Course</button>
//         </form>

//         <hr>

//         <ul id="course-list" data-id= "${id}></ul>

//     </div>

//     `;

//     courses.innerHTML = html;
// };