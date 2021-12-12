//setup materializa components
document.addEventListener("DOMContentLoaded", function(){
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
})




document.addEventListener("DOMContentLoaded", function(){
    //Nav Menu
    const menus = document.querySelector(".side-menu");
    M.Sidenav.init(menus,{edge: "right" });
    //Add tasks
    const forms = document.querySelector(".side-form");
    M.Sidenav.init(forms, {edge: "left" });
});


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