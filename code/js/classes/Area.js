class Area {
  constructor(areaType, positionX, positionY, sizeWidth, sizeHeight) {
    this.areaType = areaType;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeWidth = sizeWidth;
    this.sizeHeight = sizeHeight;
    this.picture = new Image();
  }

  createArea(x,y,w,h) {
    if (this.areaType == 'bonus') {
      //this.picture.src = 'images/tree.png';
    }

    if (this.areaType == 'malus') {
      //this.picture.src = 'images/hurricane.png';
    }

    // this.picture.onload = () => {
    //   ctx.drawImage(this.picture, this.positionX, this.positionY);
    // }
    // this.picture.src = 'images/water_square.png';
    // this.picture.onload = () => {
    //   ctx.drawImage(this.picture, this.positionX, this.positionY);
    // }
    canvasContext.fillStyle = 'rgba(0,0,255,0.5)';
    canvasContext.fillRect(x, y, w, h);
  }

  drawArea(x,y,w,h) {
    canvasContext.fillStyle = 'rgba(0,0,255,0.5)';
    canvasContext.fillRect(x, y, w, h);
  }


}
