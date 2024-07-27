var layerContainer= document.querySelector('.layer-container');
var defaultLayer = document.querySelector('#layer1');
var addButton = document.querySelector('.add-layer');
// var layer = document.querySelector('.layer');
var currentLayer = "layer1"
// var visButton = document.querySelector("visibility");

// var imgDct = {"layer1": [[new ImageData(width,height), document.querySelector('#canvas1'), document.querySelector('#canvas1').getContext("2d")]]}; // img data, canvas, ctx
var imgDct = {"layer1": new Layer(1)}
var hiddenLayers = {};

defaultLayer.style.border = "2px solid white";

defaultLayer.addEventListener("mousedown", function(e){
    select(defaultLayer);
});

window.addEventListener("load", (event) => {
    c = document.querySelector('#canvas1');
    c.width = 50;
    c.height = 50;

    $(".layer-container").sortable({
        update: function(event, ui) {
            rerenderLayers();
        }   
    });
    $(".frame-container").sortable({
        // update: function(event, ui) {
        //     rerenderLayers();
        // }   
    });
});

function toggleVis(visButton){
    layerbox = visButton.parentNode.parentNode;
    if(visButton.classList.contains("fa-eye")){
        visButton.classList.remove("fa-eye");
        visButton.classList.add("fa-eye-slash");
        //add to hiddenlayers
        hiddenLayers[layerbox.id] = 1;
        layerbox.style.backgroundColor = "var(--dark1)";
    }else{
        visButton.classList.remove("fa-eye-slash");
        visButton.classList.add("fa-eye");
        //remove from hidden layers
        delete hiddenLayers[layerbox.id];
        layerbox.style.backgroundColor = "#00000000";
    }
    // console.log(hiddenLayers);
    clear();
    rerenderLayers();
}

function makeNewLayer(){
    // console.log(layerContainer.children.length);
    i = "layer" + (layerContainer.children.length+1);
    var div = document.createElement('div');
    div.setAttribute("id", i);

    button = document.createElement("button");
    button.innerHTML = "<i class='visibilityicon fa-regular fa-eye' onclick='toggleVis(this)'></i>";
    button.classList.add('visibility');
    div.appendChild(button);

    var div2 = document.createElement('div');
    div2.classList.add('thumbnail-div');

    c = makeCanvas(i)
    // console.log(c)
    // c.getContext("2d").scale(5,5)
    div2.appendChild(c);
    div.appendChild(div2);
    

    label = document.createElement('input');
    label.setAttribute("value", "Layer " + (layerContainer.children.length+1));
    label.classList.add('layer-name');
    div.appendChild(label);
    
    div.classList.add('layer');
    

    div.addEventListener("mousedown", function(e){
        select(div);
    });

    layerContainer.insertBefore(div, layerContainer.firstChild);
    

    imgDct[i] = new Layer(layerContainer.children.length);
    // console.log(imgDct);
}

function makeCanvas(i){
    // imgDct = frameDct[currentFrame];
    var img = new ImageData(width, height);
    var canv = document.createElement('canvas');
    canv.setAttribute("id", i.replace("layer", "canvas" ));
    var ctx = canv.getContext("2d");
    canv.width = 50;
    canv.height = 50;
    // console.log(i, currentFrameNum-1);

    // if (imgDct[i]==null){
    //     imgDct[i] = [];
    // }
    // for (let n = 0; n < nf; n++){
    //     imgDct[i][n] = [img, canv, ctx];
    // }
//    console.log("img dct: ", imgDct);
    
    canv.classList.add('layer-thumbnail');
    return canv;
}

function select(d){
    // console.log(d.id);
    document.querySelector("#"+currentLayer).style.border = "2px solid black";
    d.style.border = "2px solid white";
    currentLayer = d.id;
}

function rerenderLayers(){
    layerList = Array.prototype.slice.call( layerContainer.children).reverse();
    console.log("layer list: " + layerList[0].id);
    for (var d = 0; d < container.children.length; d++){ //for each pixel?
        displayCanvToDiv(container.children[d]);
    }

}



addButton.addEventListener("mousedown", function(e){
    makeNewLayer();
})

