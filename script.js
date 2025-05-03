const pageList = document.getElementById("pageList");

class Page {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;

        this.addToPageList();
    }

    addToPageList() {
        let li = document.createElement("li");

        let div = document.createElement("div");
        div.className = "page-element";
        div.href = "./pages/" + this.id + "/index.html";
        div.onclick = function () {
            location.href = this.href;
        };

        let title = document.createElement("h4");
        title.className = "page-element";
        let titleText = document.createTextNode(this.title);
        title.appendChild(titleText);
        div.appendChild(title);

        let description = document.createElement("p");
        description.className = "page-element";
        let descriptionText = document.createTextNode(this.description);
        description.appendChild(descriptionText);
        div.appendChild(description);

        li.appendChild(div);
        pageList.appendChild(li);
    }
}

// Load all pages
fetch("./pages/pages.json")
    .then((result) => (data = result.json()))
    .then((data) => {
        data.forEach((page) => {
            new Page(page.id, page.title, page.description);
        });
    });
