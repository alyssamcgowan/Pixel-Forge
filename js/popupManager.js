$(function(){
    $('#newFilePopup').draggable({
      handle: ".popupheader"
  });
    $('#newFilePopup').resizable();
  
});

function xout(xbutton){
    popup = xbutton.parentNode.parentNode;
    popup.style.display = "none";
}


function newPopup(){
    popup = document.getElementById("newFilePopup");
    popup.style.display = "block";
}