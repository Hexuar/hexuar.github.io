const projectList = document.getElementById("projectList");
const template = document.getElementById("projectEntry");

function AddToProjectList(project) {
    const clone = template.content.cloneNode(true);

    let div = clone.querySelector("li");
    div.href = "./project.html?id=" + project.id;
    div.onclick = function () {
        location.href = this.href;
    };

    let elements = clone.querySelectorAll("p");
    elements[0].innerHTML = project.title;
    elements[1].innerHTML = project.description;
    elements[2].innerHTML = project.created;

    projectList.appendChild(clone);
}

// Load all pages
fetch("./projects/projects.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.projects.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        });
        data.projects.forEach((project) => {
            AddToProjectList(project);
        });
    });