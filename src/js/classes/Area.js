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

  //Fonction qui vérifie que la somme de deux probas est bien inférieure à 1
  checkSumProbabilities(elt1, elt2, correctElt1, correctElt2) {
    let sum = elt1 + elt2;
    if (sum > 1) {
      elt1 = correctElt1;
      elt2 = correctElt2;
      showErrorMsg();
    }
    return [elt1, elt2];
  }

  //Fonction qui créée les différents éléments de la simulation : food or hurricane, en fonction des paramètres entrés
  createElement() {
    let rdn = Math.random();
    let hurricaneValue = 0;
    let foodValue = 0;

    switch (this.areaType) {
      case 'blue':
        hurricaneValue = getParameter("disasterRateBlue");
        foodValue = getParameter("foodRateBlue");
        break;

      case 'orange':
        hurricaneValue = getParameter("disasterRateOrange");
        foodValue = getParameter("foodRateOrange");
        break;

      case 'purple':
        hurricaneValue = getParameter("disasterRatePurple");
        foodValue = getParameter("foodRatePurple");
        break;

      case 'green':
        hurricaneValue = getParameter("disasterRateGreen");
        foodValue = getParameter("foodRateGreen");
        break;

      default:
        console.log("error : area type undefined");
    }

    //On vérifie que la somme des paramètres entrés est bien inférieure à 1
    hurricaneValue = this.checkSumProbabilities(hurricaneValue, foodValue, 0.01, 0.01)[0];
    foodValue = this.checkSumProbabilities(hurricaneValue, foodValue, 0.01, 0.01)[1];

    if (this.hasElement == 'no') //La case est vide
    {
      if (rdn < hurricaneValue) {
        this.hasElement = 'hurricane';
      } else if (rdn < foodValue + hurricaneValue) {
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
    x = convertGridCellToPixel(x);
    y = convertGridCellToPixel(y);

    switch (this.hasElement) {
      case 'food':
        this.picture.src = 'images/food.png';
        canvasContext.drawImage(this.picture, x, y);
        break;
      case 'hurricane':
        this.picture.src = 'images/hurricane.png';
        canvasContext.drawImage(this.picture, x, y);
        break;
      case 'tree':
        this.picture.src = 'images/tree.png';
        canvasContext.drawImage(this.picture, x, y);
        break;
      default:
        ('error type of element area');
    }
  }

}
