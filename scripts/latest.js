const title = document.getElementById("latestTitle");
const desc = document.getElementById("latestDesc");
const timestamp = document.getElementById("latestTimestamp");
const iframe = document.getElementById("latestFrame");
const info = document.getElementById("latestInfo");


fetch("./projects/projects.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        });
        title.innerHTML = data[0].title;
        desc.innerHTML = data[0].description;
        timestamp.innerHTML = data[0].created;
        info.innerHTML = data[0].info;
        iframe.src = "projects/" + data[0].id + "/";
    });