var frameContainer = document.querySelector('.frame-container');
var frameNumContainer = document.querySelector('.frame-num-container');
var addFrame = document.querySelector('.add-frame');
var defaultFrame = document.querySelector('#frame1');
var currentFrame = "frame1";
var currentFrameNum = 0;
var nf = 1; //number of frames


defaultFrame.style.border = "2px solid white";
defaultFrame.addEventListener("mousedown", function(e){
    selectFrame(defaultFrame);
});

function makeNewFrame(){
    nf++;
    i = "frame" + (frameContainer.children.length+1)
    var div = document.createElement('div');
    div.setAttribute("id", i);
    div.classList.add("frame");
    // var p = document.createElement('p');
    // p.innerHTML = frameContainer.children.length+1;
    // div.appendChild(p);

    div.addEventListener("mousedown", function(e){
        selectFrame(div);
    });
    frameContainer.appendChild(div);


    var div2 = document.createElement('div');
    div2.classList.add("frame-num-box");
    div2.innerHTML = frameContainer.children.length;
    frameNumContainer.appendChild(div2);
    
    for(let n=0; n < Object.keys(imgDct).length; n++){
        // canv = document.createElement('canvas');
        imgDct[Object.keys(imgDct)[n]].appendFrame();

        // if (imgDct[Object.keys(imgDct)[n]]){
        //     imgDct[Object.keys(imgDct)[n]].append([new ImageData(width, height), canv, canv.getContext("2d")]);
        // }else{
        //     imgDct[Object.keys(imgDct)[n]] = [[new ImageData(width, height), canv, canv.getContext("2d")]]
        // }
    }



    return i;
}


function selectFrame(d){
    document.querySelector("#"+currentFrame).style.border = "2px solid black";
    d.style.border = "2px solid white";
    currentFrame = d.id;
    // currentFrameNum = Number(currentFrame.substring());
    // const re = new RegExp("\d+");
    currentFrameNum = Number(/\d+/.exec(currentFrame)[0])-1;

    for (let l =0; l < Object.keys(imgDct).length; l++){

        imgDct[Object.keys(imgDct)[l]].changeLayers(currentFrameNum);

        // imgDct[Object.keys(imgDct)[l]][0][2].clearRect(0, 0, 64,64);
        // imgDct[Object.keys(imgDct)[l]][0][2] .putImageData(imgDct[currentLayer][currentFrameNum][0], 0, 0);
    }
    for (let i = 0; i < width * height; i++){
        d = container.children[i]
        d.style.backgroundColor = "#00000000";
        displayCanvToDiv(d);
    }

}


addFrame.addEventListener("mousedown", function(e){
    fid = makeNewFrame();
    // frameNewLayers(fid);
})
