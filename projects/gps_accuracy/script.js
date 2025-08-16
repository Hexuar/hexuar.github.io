const statusP = document.getElementById("status");
const p = document.getElementById("container");
const data = [];
const scanTime = prompt("Scantime: ") * 1000;
const startTime = new Date().getTime();
let ID;

if("geolocation" in navigator) {
    ID = navigator.geolocation.watchPosition((position) => {
        data.push(Math.round(position.coords.accuracy));
        p.textContent = "data = {" + data + "}";
    });
}
else {
    p.textContent = "Geolocation not avaliable.";
}

function Update() {
    let time = new Date().getTime();

    if(time - startTime > scanTime) {
        navigator.geolocation.clearWatch(ID);
        statusP.textContent = "Complete!";
    }
    else {
        statusP.textContent = "Scanning... " + Math.round((time - startTime) / 1000);
    }

    requestAnimationFrame(Update);
}
Update();