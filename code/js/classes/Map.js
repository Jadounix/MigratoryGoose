class Map
{
  //Constructeur
  constructor(padding, dimensionX, dimensionY, cellSize, cellNumber, matrice)
  {
    //Taille de la map
    this.padding = padding;
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.cellSize = cellSize;
    this.cellNumber = cellNumber;
    //Tableau qui va contenir les valeurs des cases de la map
    this.matrice = new Array(this.dimensionX/this.cellSize);
    for (let i = 0; i < this.matrice.length; i++) {
      this.matrice[i] = new Array(this.dimensionY/this.cellSize);}
  }
  //Méthodes
  //Dessin de la grille sur le canvas
  drawBoard(ctx) {
    for (let x = 0; x <= this.dimensionX; x += this.cellSize) {
      ctx.moveTo(0.5 + x + this.padding, this.padding);
      ctx.lineTo(0.5 + x + this.padding, this.dimensionY + this.padding);
    }
    for (let x = 0; x <= this.dimensionY; x += this.cellSize) {
      ctx.moveTo(this.padding, 0.5 + x + this.padding);
      ctx.lineTo(this.dimensionX + this.padding, 0.5 + x + this.padding);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  //Initialisation de la map avec des valeurs false ie des cases qui ne sont occupées par rien
  mapInitialisation()
  {
    for(let i = 0; i<this.dimensionX/this.cellSize; i++)
		{
			for(let j = 0; j<this.dimensionY/this.cellSize; j++)
      {
        this.matrice[i][j] = false;
      }
		}
  }

  consoleModeDisplayMap()
  {
    console.table(this.matrice);
  }

  turnCellValueOccupied(x, y)
  {
    this.matrice[x][y] = true;
  }

  turnCellValueUnoccupied(x, y)
  {
    this.matrice[x][y] = false;
  }

  //Dessin d'une case bonus sur la map
  DrawBonusCell(ctx,x,y)
  {
    let greenSquareImage = new Image();
    greenSquareImage.src = 'images/green_square.png';
    ctx.drawImage(greenSquareImage, x, y);
  }
}
