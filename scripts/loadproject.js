const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);

const id = searchParams.get("id")
if(id != undefined) {
    const iframe = document.createElement("iframe");
    iframe.src = "./projects/" + id + "/index.html";
    iframe.classList.add("project");
    iframe.scrolling = "no"; // DEPRECATED!
    document.body.appendChild(iframe);
}

const infoBox = document.getElementById("infoBox");
fetch("./projects/projects.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        let project = data.find(obj => { return obj.id == id });

        if(project.info == undefined) {
            infoBox.hidden = true;
            return;
        }

        let elements = infoBox.querySelectorAll("p");
        elements[0].innerHTML = project.title;
        elements[1].innerHTML = project.info || "";
    });
