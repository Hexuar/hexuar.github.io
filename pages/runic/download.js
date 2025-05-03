function Download(href, fileType)
{
    var a = document.createElement('a');
    a.download = document.getElementById("fileNameInput").value + "." + fileType;
    a.href = href;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function DownloadSVG(fileType) {
    const htmlStr = svg.outerHTML;
    const blob = new Blob([htmlStr], {type:"image/svg+xml"});
    const url = URL.createObjectURL(blob);

    if(fileType == "svg") Download(url, "svg");
    else DownloadImage(url, fileType, 5.12);

    URL.revokeObjectURL(url);
}

function DownloadImage(url, fileType, scale) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var box = svg.viewBox.baseVal;

    canvas.width = box.width * scale;
    canvas.height = box.height * scale;

    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        Download(canvas.toDataURL("image/"+fileType), fileType);
    }
    image.src = url;
}