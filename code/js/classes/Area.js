class Area {
  constructor(areaType, positionX, positionY) {
    this.areaType = areaType;
    this.positionX = positionX;
    this.positionY = positionY;
    this.picture = new Image();
  }

  createArea(ctx, x, y) {
    if (this.areaType == 'bonus') {
      this.picture.src = 'images/green_square.png';
    }
    if (this.areaType == 'malus') {
      this.picture.src = 'images/red_square.png';
    }
    this.picture.onload = () => {
      ctx.drawImage(this.picture, x, y);
    }
  }

  drawArea(ctx, x, y) {
    ctx.drawImage(this.picture, x, y);
  }

}
