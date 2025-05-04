const pageList = document.getElementById("pageList");
const template = document.querySelector("#pageElement");

function AddToPageList(page) {
    const clone = template.content.cloneNode(true);

    let div = clone.querySelector("li");
    div.href = "./pages/" + page.id + "/index.html";
    div.onclick = function () {
        location.href = this.href;
    };

    let elements = clone.querySelectorAll("p");
    elements[0].innerHTML = page.title;
    elements[1].innerHTML = page.description;
    elements[2].innerHTML = page.created;

    pageList.appendChild(clone);
}

// Load all pages
fetch("./pages/pages.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        });
        data.forEach((page) => {
            AddToPageList(page);
        });
    });