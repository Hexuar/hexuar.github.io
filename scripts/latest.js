let latest = {
    title: document.getElementById("latestTitle"),
    desc: document.getElementById("latestDesc"),
    timestamp: document.getElementById("latestTimestamp"),
    iframe: document.getElementById("latestFrame"),
    info: document.getElementById("latestInfo"),
}

fetch("./projects/projects.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        });
        latest.title.href = "./project.html?id=" + data[0].id;
        latest.title.innerHTML = data[0].title;
        latest.desc.innerHTML = data[0].description;
        latest.timestamp.innerHTML = data[0].created;
        latest.info.innerHTML = data[0].info;
        latest.iframe.src = "projects/" + data[0].id + "/";
    });