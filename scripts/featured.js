let featured = {
    title: document.getElementById("featuredTitle"),
    desc: document.getElementById("featuredDesc"),
    timestamp: document.getElementById("featuredTimestamp"),
    iframe: document.getElementById("featuredFrame"),
    info: document.getElementById("featuredInfo"),
}

fetch("./projects/projects.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        featuredProject = {}
        for (let i = 0; i < data.projects.length; i++) {
            if (data.projects[i].id === data.featured) {
                featuredProject = data.projects[i]
                break;
            }
        }
        featured.title.href = "./project.html?id=" + featuredProject.id;
        featured.title.innerHTML = featuredProject.title;
        featured.desc.innerHTML = featuredProject.description;
        featured.timestamp.innerHTML = featuredProject.created;
        featured.info.innerHTML = featuredProject.info;
        featured.iframe.src = "projects/" + featuredProject.id + "/";
    });