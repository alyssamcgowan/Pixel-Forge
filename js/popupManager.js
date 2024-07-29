$(function(){
    $('.menupopup').draggable({
      handle: ".popupheader"
  });
    $('.menupopup').resizable();
  
});

function xout(xbutton){
    popup = xbutton.parentNode.parentNode;
    console.log(popup);
    popup.style.display = "none";
}
function cancel(xbutton){
    popup = xbutton.parentNode.parentNode.parentNode;
    console.log(popup);
    popup.style.display = "none";
}



function newPopup(){
    popup = document.getElementById("newFilePopup");
    popup.style.display = "block";
}

function preferencesPopup(){
    popup = document.getElementById("preferencesPopup");
    popup.style.display = "block";
}

function adjustmentsPopup(){
    popup = document.getElementById("adjustmentsPopup");
    popup.style.display = "block";
}

function sizePopup(){
    popup = document.getElementById("sizePopup");
    popup.style.display = "block";
}