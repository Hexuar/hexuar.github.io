async function readJsonFile(dir) {
    let data = await fetch(dir);
    let jsonData = await data.json();
    return jsonData;
}