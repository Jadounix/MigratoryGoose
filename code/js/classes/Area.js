class Area {
  constructor(areaType, positionX, positionY, hasElement) {
    this.areaType = areaType;
    this.positionX = positionX;
    this.positionY = positionY;
    this.hasElement = hasElement; //food, hurricane, tree or no
    this.picture = new Image();
  }

  colorMap(x, y) {
    switch (this.areaType) {
      case 'blue':
        this.colorAreaBlue(x, y);
        break;
      case 'orange':
        this.colorAreaOrange(x, y);
        break;
      case 'green':
        this.colorAreaGreen(x, y);
        break;
      case 'purple':
        this.colorAreaPurple(x, y);
        break;
      default:
        console.log('error type of area');
    }
  }

  colorAreaBlue(x, y) {
    canvasContext.fillStyle = 'rgba(0,0,255,0.5)';
    canvasContext.fillRect(convertGridCellToPixel(x), convertGridCellToPixel(y), cellSize, cellSize);
  }

  colorAreaGreen(x, y) {
    canvasContext.fillStyle = 'rgba(160,255,135,0.5)';
    canvasContext.fillRect(convertGridCellToPixel(x), convertGridCellToPixel(y), cellSize, cellSize);
  }

  colorAreaOrange(x, y) {
    canvasContext.fillStyle = 'rgba(245,202,128,0.5)';
    canvasContext.fillRect(convertGridCellToPixel(x), convertGridCellToPixel(y), cellSize, cellSize);
  }

  colorAreaPurple(x, y) {
    canvasContext.fillStyle = 'rgba(210,179,245,0.7)';
    canvasContext.fillRect(convertGridCellToPixel(x), convertGridCellToPixel(y), cellSize, cellSize);
  }

  createElement() {
    let rdn = Math.random();
    let hurricaneValue = 0;
    let foodValue = 0;

    switch (this.areaType) {
      case 'blue':
        hurricaneValue = 0.6; //Sur une case bleu j'ai 60% de chance d'avoir une tempête
        foodValue = 0.2;
        break;

      case 'orange':
        hurricaneValue = 0.3;
        foodValue = 0.2;
        break;

      case 'purple':
        hurricaneValue = 0.3;
        foodValue = 0.2;
        break;

      case 'green':
        hurricaneValue = 0.3;
        foodValue = 0.2;
        break;

      default:
        ("");
    }

    if(this.hasElement == 'no') //La case est vide
    {
      if (rdn < hurricaneValue) {
        this.hasElement = 'hurricane';
      }

      if (rdn < foodValue) {
        this.hasElement = 'food';
      }
    }

  }

  createElementPicture(x, y) {
    x = convertGridCellToPixel(x);
    y = convertGridCellToPixel(y);
    switch (this.hasElement) {
      case 'food':
        this.picture.src = 'images/food.png';
        this.picture.onload = () => {
          canvasContext.drawImage(this.picture, x, y);
        }
        break;
      case 'hurricane':
        this.picture.src = 'images/hurricane.png';
        this.picture.onload = () => {
          canvasContext.drawImage(this.picture, x, y);
        }
        break;
      case 'tree':
        this.picture.src = 'images/tree.png';
        this.picture.onload = () => {
          canvasContext.drawImage(this.picture, x, y);
        }
        break;
      default:
        ('error type of element area');
    }
  }

  drawElementPicture(x, y) {
    canvasContext.drawImage(this.picture, convertGridCellToPixel(x), convertGridCellToPixel(y));
    console.log(this.picture.src);
  }

} //Fin de la classe
