class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

    static initializePixelGrid(width, height) {
        var pixelGrid = new Array(height);
        for(var y = 0; y < height; y++) {
            pixelGrid[y] = new Array(width);
        }
        return pixelGrid;
    }

}

class RGBA {
    constructor(redValue, greenValue, blueValue, alphaValue) {
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }

}
//var colour = new RGBA(255, 100, 50, 225)
//console.log(colour.red);
//console.log(colour.green);
//console.log(colour.blue);
//console.log(colour.alpha);

//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//}

// function definitions here



 function colourise(img, colour, level) {

     var pixels = ImageUtils.getPixels(img);
     var all = pixels.data.length;
     var data = pixels.data;

     for (var i = 0; i < all; i += 4) {
         var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
         var modifiedRGBA = colourisePixel(originalRGBA, colour, level);

         setPixel(data, i, modifiedRGBA);
     }

     ImageUtils.putPixels(pixels, img.width, img.height);
 }

 function colourisePixel(originalRGBA, colour, level) {

     var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var newRed = originalRGBA.red - diffRed;

     var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var newGreen = originalRGBA.green - diffGreen;

     var diffBlue = (originalRGBA.blue - colour.blue) * (level / 100);
    var newBlue = originalRGBA.blue - diffBlue;

     return new RGBA(newRed, newGreen, newBlue, originalRGBA.alpha);

 }

function setPixel(data, i, colour) {
    data[i] = colour.red;
    data[i+1] = colour.green;
    data[i+2] = colour.blue;
    data[i+3] = colour.alpha;
}


function sepiaPixel(colour) {

    var modifiedRed = colour.red * 0.393 + colour.green * 0.769 + colour.blue * 0.189
    var modifiedGreen = colour.red * 0.349 + colour.green * 0.686 + colour.blue * 0.168
    var modifiedBlue = colour.red * 0.272 + colour.green * 0.534 + colour.blue * 0.131

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
}

function sepia(img) {
    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all;i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var sepiaRGBA = sepiaPixel(originalRGBA);

        data[i] = sepiaRGBA.red;
        data[i+1] = sepiaRGBA.green;
        data[i+2] = sepiaRGBA.blue;
        data[i+3] = sepiaRGBA.alpha;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}



$(document).ready(function() {
    var img = new Image();
    img.src = "img/cat.jpg";
    sepia(img)

});

