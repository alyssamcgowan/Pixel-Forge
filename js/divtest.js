// const canvas = document.querySelector('#preview');
var ctx = null;
// var img = new ImageData(64, 64);
var layer = document.querySelector('#layer1');
var prevDiv = null;
  
const container = document.querySelector('#canvas-container');
const renderwindow = document.querySelector('#render-window');
// const layerContainer = document.querySelector('#layer-container');


container.setAttribute('draggable', false);
let brushDown = false, panDown = false;
var primColor = "#000000ff", secColor = "000000ff";
var primSwatch = document.querySelector('#primColor');
var brushSize = 1;

var z = 1;
var width = 64, height = 64;
// container.style.width = width*2+1+"px";
// container.style.height = height*2+1+"px";


dragElement(container);

window.addEventListener("load", (event) => {
  // grid-template-columns: repeat(64, 2px);

  container.style.gridTemplateColumns = "repeat("+ width+ ", 2px)";

  populate(width,height);
  container.style.transform = "scale("+ Math.min(renderwindow.clientHeight/height, renderwindow.clientWidth/width)/2 + ")"; 
  z = ((Math.min(renderwindow.clientHeight/height, renderwindow.clientWidth/width)/2)-1)*5;
  container.style.top = "200px";
  container.style.left = "450px";

  // const canvas = document.querySelector('#preview');
  // ctx = canvas.getContext("2d");


  const exp = document.querySelector('.test');
  exp.addEventListener("mousedown", function(e){
    makeVideo();
  })


});


function populate(w, h) {
    width = w, height = h;
    //container.style.setProperty('--size', size)
    // container.empty();
    
    for (let i = 0; i < width * height; i++) {
      const div = document.createElement('div');
      div.setAttribute("id", i);
      div.classList.add('pixel');
      div.setAttribute('draggable', false);
  
      div.addEventListener('mouseover', function(e){

          if (picker){
            document.querySelector('#primColor').style.backgroundColor = div.style.backgroundColor;
            // console.log(div.style.backgroundColor)
          }
          if(erase){
            putColor(div.id, "	rgba(0, 0, 0, 0.0)")
            displayCanvToDiv(div);
          }


          if(!brushDown) return;
          if(e.which==3){
            secColor = document.querySelector('#secColor').style.backgroundColor;
            if (!secColor){secColor = "#ffffff";}
            // div.style.backgroundColor = secColor;
            putColor(div.id, secColor)
          }else{
            primColor = document.querySelector('#primColor').style.backgroundColor;
            if (!primColor){primColor = "#000000";}
            putColor(div.id, primColor)
          }

          if (prevDiv){
            if (!isAdjacent(div.id, prevDiv)){
              line = bresenhamAlgorithm(div.id%width, Math.floor(div.id/width), prevDiv%width, Math.floor(prevDiv/width));
              if(e.which==3){
                drawLine(line, secColor)
              }else{
                drawLine(line, primColor)
              }
              rerenderLayers();
            }
          }
          prevDiv = div.id;

          displayCanvToDiv(div);
      })
      
      div.addEventListener('mousedown', function(e){
        // if(!brushDown) return;
        // if(e.which==3){
        //     secColor = document.querySelector('#secColor').style.backgroundColor;
        //     div.style.backgroundColor = secColor;
        // }else{
        //     primColor = document.querySelector('#primColor').style.backgroundColor;
        //     div.style.backgroundColor = primColor;
        // }
        
          
      })
  
      container.appendChild(div);
    }
}

function putColor(id, color){
  layer = document.querySelector('currentLayer');
  img = imgDct[currentLayer].getImgObjs()[currentFrameNum];
  
  c = tinycolor(color).toRgb();
  // console.log(c["r"]);

  //update color
  imgDct[currentLayer].updateColor(id, c, currentFrameNum);

  // imgDct[currentLayer][0][2].putImageData(img, 0, 0);

  imgDct[currentLayer].updateThumbnail(img);
}

function displayCanvToDiv(d){
  layerList = Array.prototype.slice.call( layerContainer.children).reverse()
  for(let l = 0; l < layerList.length; l++ ){ //for every layer
    // img = imgDct[layerList[l].id][currentFrameNum][0];
    img = imgDct[layerList[l].id].getImgObjs()[currentFrameNum]
    var p = (d.id)*4;
    // console.log(tinycolor({r:img.data[p], g:img.data[p+1], b:img.data[p+2]}));
    
    // if (img.data[p+3]!=0){
      // d.style.backgroundColor = tinycolor({r:img.data[p], g:img.data[p+1], b:img.data[p+2], a:img.data[p+3]});
    // }

    
    
    if (  img.data[p+3]!=0 || ( img.data[p+3]==0 && (l==0 ||  (l != 0 && imgDct[layerList[l-1].id].getImgObjs()[currentFrameNum].data[p+3] == 0)))){
      d.style.backgroundColor = tinycolor({r:img.data[p], g:img.data[p+1], b:img.data[p+2], a:img.data[p+3]});
    }

  }
}

function pan(e){
    if(!panDown) return;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      if(e.which!=2) return;
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = Math.ceil(pos3 / 10) * 10 - Math.ceil(e.clientX / 10) * 10;//pos3 - e.clientX;
      pos2 = Math.ceil(pos4 / 10) * 10 - Math.ceil(e.clientY / 10) * 10; //pos4 - e.clientY; 
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

function isAdjacent(a,b){
  if(Math.abs(a-b)<=1 && Math.abs(a%width - b%width)<=1){return true}
  if(Math.abs(a-b)==width || Math.abs(a-b)==width-1 || Math.abs(a-b)==width+1) {return true}
  return false;
}

function bresenhamAlgorithm(startX, startY, endX, endY) { 
  const deltaCol = Math.abs(endX - startX) // zero or positive number
  const deltaRow = Math.abs(endY - startY) // zero or positive number
  let pointX = startX
  let pointY = startY
  const horizontalStep = (startX < endX) ? 1 : -1 
  const verticalStep = (startY < endY) ? 1 : -1
  const points = [ [],[]]
  let difference = deltaCol - deltaRow
  
  while (true) {
      const doubleDifference = 2 * difference // necessary to store this value
      if (doubleDifference > -deltaRow) { difference -= deltaRow; pointX += horizontalStep }
      if (doubleDifference <  deltaCol) { difference += deltaCol; pointY += verticalStep }
      if ((pointX == endX) && (pointY == endY)) { break } // doesnt include the end point
      // points.push({ "x": pointX, "y": pointY })
      points[0].push(pointX);
      points[1].push(pointY);
  }    
  return points
}

function drawLine(l, color){
  xline =l[0], yline = l[1]
  for (let i = 0; i < xline.length; i++){
    d = yline[i]*width + xline[i];
    putColor(d, color);
    // displayCanvToDiv(document.querySelector(d));
  }
}



window.addEventListener("mousedown", function(e){
  


    if(e.which == 2){
        panDown = true;
        pan(e);
    }else{
        clickDownHandler()
    }
    
})
window.addEventListener("mouseup", function(e){
    if(e.which == 2){
        panUp = false;
    }else{
        clickUpHandler()
    }
})
renderwindow.addEventListener("wheel", function(e){
    z += Math.floor(e.wheelDelta/Math.abs(e.wheelDelta));
    if(z<=0) return;
    // if((1 + (z/5))* height*2 <) return;
    container.style.transform = "scale("+ (1+(z/5)) + ")"; 
    // console.log(e.clientY, $("#canvas-container").height()*(1+(z/5)) *0.5);
})


