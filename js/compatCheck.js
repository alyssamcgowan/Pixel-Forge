var mobilepopup = document.querySelector('#mobilePopup');
var mobilepopupbg = document.querySelector('#mobilePopupBG');

window.addEventListener("load", (event) => {
    if(detectMobile()){
        mobilepopup.display = "block";
        mobilepopupBG.display = "block";
        console.log("mobile");
    }else{
        console.log("not mobile");
    }
    
  
});
  


function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}