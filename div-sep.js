const container = document.querySelector('#canvas-container');
container.setAttribute('draggable', false);
let brushDown = false, panDown = false;

var z = 1;
var width = 64, height =64 ;
dragElement(container);

function populate(w, h) {
    width = w, height = h;
    //container.style.setProperty('--size', size)
    
    for (let i = 0; i < width * height; i++) {
      const div = document.createElement('div');
      div.classList.add('pixel');
      div.setAttribute('draggable', false);
  
      div.addEventListener('mouseover', function(e){
          if(!brushDown) return;
          div.style.backgroundColor = "#000000";

          
      })
      div.addEventListener('mousedown', function(e){
        if(!brushDown) return;
        div.style.backgroundColor = "#000000";
        
        
      })
  
      container.appendChild(div);
    }
    // console.log(container.children[0]);
}

function pan(e){
    if(!panDown) return;
    console.log("pan");
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

window.addEventListener("mousedown", function(e){
    if(e.which == 2){
        panDown = true;
        pan(e);
    }else{
        brushDown = true;
        console.log(brushDown);
    }
    
})
window.addEventListener("mouseup", function(e){
    if(e.which == 2){
        panUp = false;
    }else{
        brushDown = false;
        console.log(brushDown);
    }
})
container.addEventListener("wheel", function(e){
    z += Math.floor(e.wheelDelta/Math.abs(e.wheelDelta));
    if(z<=0) return;
    // if((1 + (z/5))* height*2 <) return;
    container.style.transform = "scale("+ (1+(z/5)) + ")"; 
    console.log(e.clientY, $("#canvas-container").height()*(1+(z/5)) *0.5);
})
populate(64,64);
  