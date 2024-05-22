class Layer {
    constructor(n) {
        this.imgObjs = [new ImageData(width,height)]
        console.log('#canvas' + n);
        this.tncanvas = document.querySelector('#canvas' + n);
        console.log(this.tncanvas);
        this.tnctx = document.querySelector('#canvas' + n).getContext("2d");
        // this.tnctx.scale(50,50);
    }

    appendFrame(){
        this.imgObjs.push(new ImageData(width,height))
    }
    changeLayers(c){
        this.tnctx.clearRect(0, 0, width,height);
        this.tnctx.putImageData(this.imgObjs[c], 0, 0);
    }

    getImgObjs(){
        return this.imgObjs;
    }
    getCanvas(){
        return this.tncanvas;
    }

    updateColor(id, c, i){
        img = this.imgObjs[i];
        img.data[(id*4) + 3] = c["a"]*255;
        img.data[id*4] = c["r"];
        img.data[id*4+1] = c["g"];
        img.data[id*4+2] = c["b"];
    }
    updateThumbnail(i){
        this.tnctx.putImageData(i, 0, 0);
    }

}




class Frame{
    constructor(n) {
        this.tncanvas = document.querySelector('#canvas' + n);
        this.tnctx = document.querySelector('#canvas' + n).getContext("2d");
    }
}
