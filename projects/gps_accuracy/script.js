const p = document.getElementById("container");

const data = [];

if("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        data.push(position.coords.accuracy);
        console.log(position.coords.accuracy);
        p.textContent = data;
    });
}
else {
    p.textContent = "Geolocation not avaliable.";
}