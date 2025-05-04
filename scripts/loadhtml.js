function getHTML(href) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.response;
}

function loadHTML(href) {
    const div = document.createElement("div");
    div.innerHTML = getHTML(href);
    document.body.appendChild(div);
}

