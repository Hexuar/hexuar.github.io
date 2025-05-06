const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);

const iframe = document.createElement("iframe");
iframe.src = "./projects/" + searchParams.get("id") + "/index.html";
iframe.classList.add("project");
document.body.appendChild(iframe);