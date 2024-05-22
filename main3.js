const container = document.getElementById("canvas-container");
const canvas = document.getElementById("editingLayer");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const canvas2 = document.getElementById("img");
const ctx2 = canvas2.getContext("2d", { willReadFrequently: true });

const img = new ImageData(64, 64);
const offscreen = new OffscreenCanvas(64,64);

var strokeArray = [];

for (let i = 0; i < img.data.length; i += 4){
  img.data[i+0] = 255;
  img.data[i+1] = 0;
  img.data[i+2] = 0;
  img.data[i+3] = 255;
}
ctx2.putImageData(img, 0, 0);

// ctx.fillStyle = "#eeeeee";
ctx.lineWidth = 1;
// ctx.fillRect(0,0,canvas.width,canvas.height);
var brushDown = false;
var panning = false;

var rect = canvas.getBoundingClientRect();
var z = 1;
var x = 0,  y = 0; // center of canvas portion in renderer (img coords)
var rW = rect.width, rH = rect.height; // dimensions of renderer window (cnv coords)
var w = img.width, h = img.height; // width and height of portion in render window (img coords)
var xC = x, yC = y; // offset to corner coords (img coords)
var xO = 0, yO = 0; // see above but (cnv coords)
var xMouse = 0, yMouse = 0; // (cnv coords)

defaultDrawImg();

// const offscreen = new OffscreenCanvas(64,64);
// const gl = offscreen.getContext("webgl");

ctx2.imageSmoothingEnabled = false;

function updateXYMouse(e){
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    xMouse = (e.clientX - rect.left) * scaleX,  
    yMouse = (e.clientY - rect.top) * scaleY; 
}
function mouseToRawCoords(){
  return [Math.floor((xMouse - xO) / z) + xC, Math.floor((yMouse - yO) / z) + yC];
  
}

function defaultDrawImg(){
  var rect = canvas.getBoundingClientRect();
  z = Math.min(Math.floor(rect.width / img.width), Math.floor(rect.height / img.height));
  w = z * img.width;
  h = z * img.height;
  xC = Math.floor((rW-w)/2);
  yC = Math.floor((rH-h)/2);
  ctx.drawImage(canvas2, xC, yC, w, h);
}

function draw(e) {
    if(!brushDown) return;
    updateXYMouse(e);
    /*const pixel = new ImageData(1,1);
    pixel.data[0] = 255;
    ctx.putImageData(pixel, x, y);
    console.log(x + " " + y)*/
    
    
    ctx.lineTo(xMouse, yMouse);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xMouse, yMouse);
    console.log(xMouse + " " + yMouse)

    //ctx2.putImageData(ctx.getImageData(0,0,canvas.width,canvas.height), 0,0)

    //updateViewer(ctx2,canvas,0,0,canvas.width,canvas.height, x,y,canvas.width*z, canvas.height*z)
}

function startBrush(e){
    brushDown = true;
    ctx.beginPath();
    draw(e);
}
function endBrush(e){
  brushDown = false;
}
function zoom(e){
  z += Math.floor(e.wheelDelta/Math.abs(e.wheelDelta));
  if(z<=0) return;
  // x = e.pageX;
  // y = canvas2.height - e.pageY;

  updateXYMouse(e);
  rc = mouseToRawCoords();
  xC = rc[0] - Math.floor(0.5 * (rW / z));
  yC = rc[1] - Math.floor(0.5 * (rH / z));
  w = rW-xC  
  h = rH-yC
  
  console.log(`${xMouse} ${yMouse} ${xC} ${yC}`);

  updateViewer(ctx,canvas, xC, yC, w,h, 0,0,w*z, h*z)
}

function panClick(e){
  panning = true;
  x = e.pageX;
  y = e.pageY;
  pan(e);
}
function panClickUp(e){
  panning = false;
}
function pan(e){
  if(!panning) return;
  const bounding = canvas.getBoundingClientRect();
  const xPos = e.clientX - bounding.left; 
  const yPos = e.clientY - bounding.top;
  dx = x - xPos; // positive dx shift canvas to left
  dy = y - yPos;
  console.log(`panning ${dx} ${dy}`)
  updateViewer(ctx2,canvas, xC+dx, yC+dy, w,h, 0,0,w*z, h*z)
}

function updateViewer(context, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
  context.reset();
  context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function clickDownHandler(e){
  if(e.which == 1){
    startBrush(e);
  }
  if(e.which == 2){
    panClick(e);
  }
}
function clickUpHandler(e){
  if(e.which == 1){
    endBrush(e);
  }
  if(e.which == 2){
    panClickUp(e);
  }
}

function pixelClick(){
  this.color = "#000000ff"
}


canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
canvas.addEventListener("mousedown", clickDownHandler);
canvas.addEventListener("mouseup", clickUpHandler);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("wheel", zoom);



class Pixel{
  constructor(xL, yL, w){
    this.topX = xL, this.topY = yL;
    this.botX = xL+w, this.botY = yL+w;
    this.width = w;
    this.color = "#00000000";
    this.addEventListener("mousedown", pixelClick);
  }
  // updatePos(){
  //   this.topX
  // }
  setColor(colorstr){
    this.color = colorstr;
  }
}

class PixelCanvas{
  constructor(wid, hei){
    this.width = wid;
    this.height = hei;
    this.pixelArray = [];

    for (let i = 0; i < hei; i +=1){
      for(let j = 0; i < wid, j +=1;){
        this.pixelArray.push(new Pixel(j*z, i*z, z));
      }
    }
    // transform(){
    //   for (let i = 0; i < hei; i +=1){
    //     for(let j = 0; i < wid, j +=1;){
    //       this.pixelArray[i*wid + j].updatePos();
    //     }
    //   }
    // }
      
  }
}