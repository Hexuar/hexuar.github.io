const pageList = document.getElementById("pageList");
const template = document.querySelector("#pageElement");

function AddToPageList(page) {
    const clone = template.content.cloneNode(true);

    let title = clone.querySelector("#title");
    title.innerHTML = page.title;

    let description = clone.querySelector("#description");
    description.innerHTML = page.description;

    let timestamp = clone.querySelector("#timestamp");
    timestamp.innerHTML = page.created;

    pageList.appendChild(clone);
}

// Load all pages
fetch("./pages/pages.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.forEach((page) => {
            AddToPageList(page);
        });
    });
