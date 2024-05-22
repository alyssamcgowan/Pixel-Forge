const canvas = document.getElementById("editingLayer");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d", { willReadFrequently: true });

const img = new Image();
img.src = "brush.png";
img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.strokeStyle = pattern;
};


ctx2.fillStyle = "red";
ctx2.fillRect(0,0,canvas.width,canvas.height);
// ctx.fillStyle = "#eeeeee";
ctx.lineWidth = 1;
// ctx.fillRect(0,0,canvas.width,canvas.height);
var brushDown = false;
var panning = false;

// var xOffset = 0;
// var yOffset = 0;
var z = 1;
var x = 0; 
var y = 0;
var w = canvas.width;
var h = canvas.height;
var xC = x;
var yC = y;


// const offscreen = new OffscreenCanvas(64,64);
// const gl = offscreen.getContext("webgl");

ctx2.imageSmoothingEnabled = false;


function draw(e) {
    if(!brushDown) return;
    const bounding = canvas.getBoundingClientRect();
    const xPos = e.clientX - bounding.left;
    const yPos = e.clientY - bounding.top;
    /*const pixel = new ImageData(1,1);
    pixel.data[0] = 255;
    ctx.putImageData(pixel, x, y);
    console.log(x + " " + y)*/
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    console.log(xPos + " " + yPos)

    //ctx2.putImageData(ctx.getImageData(0,0,canvas.width,canvas.height), 0,0)

    updateViewer(ctx2,canvas,0,0,canvas.width,canvas.height, x,y,canvas.width*z, canvas.height*z)
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

  x = e.pageX;
  y = canvas2.height - e.pageY;
  xC = x - Math.floor(0.5 * (canvas2.width / z)); //x constraint
  yC = y - Math.floor(0.5 * (canvas2.height / z));
  w = canvas.width-xC  
  h = canvas.height-yC
  
  console.log(`${x} ${y} ${xC} ${yC}`);

  updateViewer(ctx2,canvas, xC, yC, w,h, 0,0,w*z, h*z)
}
function panClick(e){
  panning = true;
  x = e.pageX;
  y = e.pageY;
  console.log(`down`);
  pan(e);
}
function panClickUp(e){
  panning = false;
  console.log("up");
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
  console.log(e.which)
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
//canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
canvas.addEventListener("mousedown", clickDownHandler);
canvas.addEventListener("mouseup", clickUpHandler);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("wheel", zoom);








class MousePath{
  constructor(sx, sy){
    startX = sx;
    startY = sy;
  }

  
}