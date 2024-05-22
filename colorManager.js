var pColor = '#000000';
var sColor = '#ffffff';
const p = document.querySelector('#primColor');
const s = document.querySelector('#secColor');
const palette = document.querySelector('#palette');
// p.object.style.backgroundColor = pColor;
// s.object.style.backgroundColor = sColor;

var selected = true; //true is prim is selected, false if sec

function updatePrimaryColor(e){
    pColor = $("#color-picker1").spectrum("get").toHexString();
    console.log(pColor);
}
function updateSecondaryColor(e){
    sColor = $("#color-picker2").spectrum("get").toHexString();
    console.log(sColor);
}


// $("#primColor").spectrum({
//     preferredFormat: 'hex',
//     color: 'rgba(0,0,0,1)',
//     showAlpha: true,
//     showInput: true,
//     showButtons: false
// });
// $("#secColor").spectrum({
//     preferredFormat: 'hex',
//     color: 'rgba(255,255,255,1)',
//     showAlpha: true,
//     showInput: true,
//     showButtons: false
// });

$("#color-picker").spectrum({
    flat: true,
    showInput: true,
    preferredFormat: 'hex',
    showAlpha: true,
    showButtons: false
});

$("#color-picker").on("dragstop.spectrum", function(e, color) {
    console.log("color updated")
    // color = $("#color-picker").spectrum("get").toHexString();
    if (selected){
        pColor = color;
        p.style.backgroundColor = pColor;
    }else{
        sColor = color;
        s.style.backgroundColor = sColor;
    }

});

$("#palette").spectrum({
    flat: true,
    showPaletteOnly: true,
    showPalette:true,
    palette: [
        ['#172038', '#253a5e', '#3c5e8b', '#4f8fba', '#73bed3', '#a4dddb'],
        ['#19332d', '#25562e', '#468232', '#75a743', '#a8ca58', '#d0da91'],
        ['#4d2b32', '#7a4841', '#ad7757', '#c09473', '#d7b594', '#e7d5b3'],
        ['#341c27', '#602c2c', '#884b2b', '#be772b', '#de9e41', '#e8c170'],
        ['#241527', '#411d31', '#752438', '#a53030', '#cf573c', '#da863e'],
        ['#1e1d39', '#402751', '#7a367b', '#a23e8c', '#c65197', '#df84a5'],
        ['#090a14', '#10141f', '#151d28', '#202e37', '#394a50', '#577277']
    ]
    
    
});

palette.addEventListener("mousedown", function(e){
    console.log('palette color: ' + palette.spectrum("get").toHexString());

})

function primSelect(){
    selected = true;
    p.style.border = "2px solid white";
    s.style.border = "2px solid #aaaaaa";
    
}
function secSelect(){
    selected = false;
    s.style.border = "2px solid white";
    p.style.border = "2px solid #aaaaaa";
}
