var storedFrames = [];
const offscreen = new OffscreenCanvas(width, height);
const offscreenctx = offscreen.getContext("2d");    
const testcanvas = document.querySelector('#testcanvas');

async function makeVideo(){
    console.log("export clicked");

    // mergeImgData(0);

    frames = imgDct["layer1"].getImgObjs()

    var videoWriter = new WebMWriter({
        quality: 0.95,    // WebM image quality from 0.0 (worst) to 0.99999 (best), 1.00 (VP8L lossless) is not supported
        fileWriter: null, // FileWriter in order to stream to a file instead of buffering to memory (optional)
        fd: null,         // Node.js file handle to write to instead of buffering to memory (optional)
    
        // You must supply one of:
        frameDuration: frameDelay, // Duration of frames in milliseconds
        frameRate: null,     // Number of frames per second
    
        transparent: false,      // True if an alpha channel should be included in the video
        alphaQuality: undefined, // Allows you to set the quality level of the alpha channel separately.
                                 // If not specified this defaults to the same value as `quality`.
    });

   
    for (f in frames){
        for (layer in imgDct){
            offscreenctx.putImageData(imgDct[layer].getImgObj()[f], 0, 0)
            testcanvas.putImageData(imgDct[layer].getImgObj()[f], 0, 0)
        }
        // offscreenctx.putImageData(imgDct[0].getImgObj()[f], 0, 0)
        // mergeImgData(f);
        
        var imgBlob;
        // offscreen.convertToBlob().then((blob) => 
        //     handleImgBlob(blob, storedFrames)
        // );
        await offscreen.convertToBlob({type: "image/webp", quality: 0.99}).then(function(blob) {
            imgBlob = blob
        });

        console.log("test", imgBlob)

        // await handleImgBlob(imgBlob);
        await new Promise( (resolve) => {
            blobToDataURL(imgBlob, function(dataurl){
                // storedFrames.push(dataurl);
                videoWriter.addFrame(dataurl);
                resolve();
            });
            
        })
        console.log('converted to dataurl')
   
    }

    console.log(storedFrames[0]);
    
    videoWriter.complete().then(function(webMBlob) {
        // $("video").attr("src", URL.createObjectURL(webMBlob));
        $("a").attr("href", URL.createObjectURL(webMBlob));
        console.log(URL.createObjectURL(webMBlob))
    });


}

async function mergeImgData(f){
    offscreenctx.clearRect(0, 0, offscreen.width, offscreen.height);
    // for (layer in imgDct){
    //     offscreenctx.putImageData(imgDct[layer].getImgObjs()[f], 0,0);
    // }
    imgdata = new ImageData(width, height);
    data = imgdata.data;
    for (l in imgDct){
        
    }

    for (let i = 0; i < width*height; i++){
        color = $("#"+ i).css("background-color")
        color = tinycolor(color).toRgb();
        console.log(i, color)
        imgdata.data[i*4] = color["r"] 
        imgdata.data[i*4+1] = color["g"]
        imgdata.data[i*4+2] = color["b"]
        data[i*4+3] = 255//color["a"]
        // data[pixel+3] =color["a"]
    }
    console.log(imgdata.data)
    offscreenctx.putImageData(imgdata, 0,0);


    testcanvas = document.querySelector('#testcanvas').getContext('2d');
    testcanvas.putImageData(offscreenctx.getImageData(0, 0, offscreen.width, offscreen.height), 0, 0);
    return offscreenctx.getImageData(0, 0, offscreen.width, offscreen.height);
}

async function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}


