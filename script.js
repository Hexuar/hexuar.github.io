class Page {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  addToPageList() {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "./pages/" + this.id + "/index.html";
    let node = document.createTextNode(this.name);

    a.appendChild(node);
    li.appendChild(a);
    pageList.appendChild(li);
  }
}




const pageList = document.getElementById("pageList");
const pages = [new Page("test", "Test Page")];

pages.forEach(page => {
  page.addToPageList();
});