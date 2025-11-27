function LoadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            console.log("Loaded '" + src + "':", img);
            resolve(img);
        };
        img.onerror = () => {
            console.log("Error loading '" + src + "':", img);
            reject();
        };
        img.src = src;
    });
}

let normalMap;
let provinceMap;
let terrainMap;
let heightMap;
let waterColorMap;
let riverMap;
let summerColorMap;
let borderMap = new Image();
let shadeMap = new Image();
let waterMap = new Image();
let riverMask = new Image();
let landColorMap = new Image();

async function LoadMaps() {
    normalMap = await LoadImage('maps/world_normal.png');
    provinceMap = await LoadImage('maps/provinces.png');
    terrainMap = await LoadImage('maps/terrain.png');
    heightMap = await LoadImage('maps/heightmap.png');
    waterColorMap = await LoadImage('maps/colormap_water.png');
    riverMap = await LoadImage('maps/rivers.png');
    summerColorMap = await LoadImage('maps/colormap_summer.png');

    borderMap.src = generateColorBorders(provinceMap, {r:0, g:0, b:0, a:128});
    shadeMap.src = generateShadeMap(normalMap, terrainMap, 1.5, false);
    waterMap.src = blurImage(waterColorMap, 3);
    riverMask.src = removeGrays(riverMap);
    landColorMap.src = generateLandColorMap(summerColorMap, terrainMap, riverMask);

    load();
}
LoadMaps();