// 0: pencil, 1: eraser, 2: bucket, 3: picker
var currentTool = 0;
var picker = false;
var erase = false;
var frameDelay = 1000;
var playingAnim = false;

// var toolbuttons = document.querySelector(".tool");

$( ".tool" ).click(function() {
    console.log("tool click");
    $( ".tool" ).css('background-color', 'var(--dark2)');
  });

// function pointer(){
//     $('#render-window').css("cursor", "auto");
// }
function pencil(){
    $('#render-window').css("cursor", "crosshair");
    currentTool = 0;
}
function eraser(){
    $('#render-window').css("cursor", "url('img/img-editor/eraser.png') 0 15, auto");
    currentTool = 1;
}

function paintBucket(){
    $('#render-window').css("cursor", "url('img/img-editor/bucket.png') 15 15, auto");
    currentTool = 2;
}

function eyeDropper(){
    $('#render-window').css("cursor", "url('img/img-editor/picker.png') 0 15, auto");
    currentTool = 3;
}

function updateFPS(){
    fps = document.getElementById("fps").value;
    frameDelay = Math.floor(1000/fps);
}

function forward(){
    selectFrame(document.querySelector('#frame' + String((currentFrameNum + 1)%nf + 1)));
}
function backward(){
    selectFrame(document.querySelector('#frame' + String((currentFrameNum -1)%nf + 1)));
}
function play(){
    playbutton = document.querySelector('#playbutton');
    if(playbutton.classList.contains("fa-play")){
        playbutton.classList.remove("fa-play");
        playbutton.classList.add("fa-pause");
    }else{
        playbutton.classList.remove("fa-pause");
        playbutton.classList.add("fa-play");
    }
    playingAnim = !playingAnim;
    loopFrames();
    
}
async function loopFrames(){
    while(playingAnim){
        await sleep(frameDelay);
        forward();
    }
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function clickDownHandler(){
    if (currentTool==0) brushDown = true;
    if(currentTool==3){picker = true;} 
    if(currentTool==1){erase = true;}
}

function clickUpHandler(){
    if (currentTool==0) {
        brushDown = false;
        prevDiv = null;
    }
    if(currentTool==3){picker = false;}
    if(currentTool==1){erase = false;} 

}

function changeWidth(){
    width = document.getElementById("width").value;
    
    while(container.children.length){
        container.removeChild(container.lastElementChild);
    }
    container.style.gridTemplateColumns = "repeat("+ width+ ", 2px)";
    populate(width, height);
}

function changeHeight(){
    height = document.getElementById("height").value;
    while(container.children.length){
        container.removeChild(container.lastElementChild);
    }
    populate(width, height);
}
