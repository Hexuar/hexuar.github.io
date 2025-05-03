const dataCanvas = document.createElement('canvas');
const dataCtx = dataCanvas.getContext('2d');

function removeGrays(image) {
    dataCanvas.width = image.width;
    dataCanvas.height = image.height;

    dataCtx.drawImage(image, 0, 0);
    const newImage = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height);
    const newData = newImage.data;

    for(let i = 0; i < newData.length; i += 4) {
        if(newData[i] === newData[i + 1] && newData[i] === newData[i + 2]) {
            newData[i + 3] = 0;
        }
    }

    dataCtx.putImageData(newImage, 0, 0);
    return dataCanvas.toDataURL('image/png');

}


function blurImage(image, width) {
    dataCanvas.width = image.width;
    dataCanvas.height = image.height;

    dataCtx.filter = 'blur('+ width + 'px)';
    dataCtx.drawImage(image, 0, 0);
    dataCtx.filter = 'none';

    return dataCanvas.toDataURL('image/png');
}


function generateLandColorMap(image, terrainMap, riverMask) {
    dataCanvas.width = image.width;
    dataCanvas.height = image.height;

    dataCtx.drawImage(image, 0, 0);
    const newImage = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height);
    const newData = newImage.data;

    dataCtx.drawImage(terrainMap, 0, 0);
    const terrainMapData = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height).data;

    dataCtx.clearRect(0, 0, dataCanvas.width, dataCanvas.height);

    dataCtx.drawImage(riverMask, 0, 0);
    const riverMaskData = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height).data;

    for(let i = 0; i < newData.length; i += 4) {
        if((terrainMapData[i] == 8 && terrainMapData[i + 1] == 31 && terrainMapData[i + 2] == 130) || (terrainMapData[i] == 55 && terrainMapData[i + 1] == 90 && terrainMapData[i + 2] == 220)) {
            newData[i + 3] = 0;
        }
        if(riverMaskData[i + 3] == 255) {
            newData[i + 3] = 0;
        }
    }
    dataCtx.putImageData(newImage, 0, 0);
    return dataCanvas.toDataURL('image/png');
}


function generateShadeMap(normalMap, terrainMap, intensity, waterShadeEnabled){
    dataCanvas.width = normalMap.width;
    dataCanvas.height = normalMap.height;

    dataCtx.drawImage(normalMap, 0, 0);
    const originalData = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height).data;
    const newImage = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height);
    const newData = newImage.data;

    dataCtx.drawImage(terrainMap, 0, 0);
    const terrainMapData = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height).data;

    for(let i = 0; i < newData.length; i += 4) {
        newData[i + 3] = Math.abs((128 - originalData[i + 1]) * intensity);
        newData[i] = 0;
        newData[i + 1] = 0;
        newData[i + 2] = 0;
        if(!waterShadeEnabled && (terrainMapData[i] == 8 && terrainMapData[i + 1] == 31 && terrainMapData[i + 2] == 130) || (terrainMapData[i] == 55 && terrainMapData[i + 1] == 90 && terrainMapData[i + 2] == 220)) {
            newData[i + 3] = 0;
        }
    }
    dataCtx.putImageData(newImage, 0, 0);
    return dataCanvas.toDataURL('image/png');
}


function generateColorBorders(image, color){
    dataCanvas.width = image.width;
    dataCanvas.height = image.height;

    dataCtx.drawImage(image, 0, 0);

    const originalImage = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height);
    const originalData = originalImage.data;

    const newImage = dataCtx.getImageData(0, 0, dataCanvas.width, dataCanvas.height);
    const newData = newImage.data;

    for(let i = 0; i < newData.length; i += 4) {
        let isBorder = false;
        //if(originalData[i] != originalData[i - 4] || originalData[i + 1] != originalData[i - 3] || originalData[i + 2] != originalData[i - 2]) isBorder = true;
        if(originalData[i] != originalData[i + 4] || originalData[i + 1] != originalData[i + 5] || originalData[i + 2] != originalData[i + 6]) isBorder = true;
        //if(originalData[i] != originalData[i - (originalImage.width * 4)] || originalData[i + 1] != originalData[i - (originalImage.width * 4) + 1] || originalData[i + 2] != originalData[i - (originalImage.width * 4) + 2]) isBorder = true;
        if(originalData[i] != originalData[i + (originalImage.width * 4)] || originalData[i + 1] != originalData[i + (originalImage.width * 4) + 1] || originalData[i + 2] != originalData[i + (originalImage.width * 4) + 2]) isBorder = true;

        if(isBorder) {
            newData[i] = color.r;
            newData[i+1] = color.g;
            newData[i+2] = color.b;
            newData[i+3] = color.a;
        }

        else {
            newData[i+3] = 0;
        }
    }
    dataCtx.putImageData(newImage, 0, 0);
    return dataCanvas.toDataURL('image/png');
}