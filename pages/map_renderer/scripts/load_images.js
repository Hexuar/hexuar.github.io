// Load Maps
const normalMap = new Image();
normalMap.src = 'maps/world_normal.png';

const provinceMap = new Image();
provinceMap.src = 'maps/provinces.png';

const terrainMap = new Image();
terrainMap.src = 'maps/terrain.png';

const heightMap = new Image();
heightMap.src = 'maps/heightmap.png';

const waterColorMap = new Image();
waterColorMap.src = 'maps/colormap_water.png';

const riverMap = new Image();
riverMap.src = 'maps/rivers.png';

const summerColorMap = new Image();
summerColorMap.src = 'maps/colormap_summer.png';

const borderMap = new Image();
const shadeMap = new Image();
const waterMap = new Image();
const riverMask = new Image();
const landColorMap = new Image();

// Load Function
window.addEventListener('load', function() {

    console.log(summerColorMap)
    
    borderMap.src = generateColorBorders(provinceMap, {r:0, g:0, b:0, a:128});
    shadeMap.src = generateShadeMap(normalMap, terrainMap, 1.5, false);
    waterMap.src = blurImage(waterColorMap, 3);
    riverMask.src = removeGrays(riverMap);

    riverMask.addEventListener('load', function() {
        
        landColorMap.src = generateLandColorMap(summerColorMap, terrainMap, riverMask);

        landColorMap.addEventListener('load', function() {
            drawMap();
        });
    });
});
