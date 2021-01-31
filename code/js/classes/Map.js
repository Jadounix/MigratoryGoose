class Map
{
  //Constructeur
  constructor(padding, dimensionX, dimensionY, cellSize, cellNumber, matrice, bonusPicture, malusPicture)
  {
    //Taille de la map
    this.padding = padding;
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.cellSize = cellSize;
    this.cellNumber = cellNumber;
    this.bonusPicture = new Image();
    this.malusPicture = new Image();
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
  mapInitialisation(ctx, x, y, i, j)
  {
    for(let i = 0; i<this.dimensionX/this.cellSize; i++)
		{
			for(let j = 0; j<this.dimensionY/this.cellSize; j++)
      {
        this.matrice[i][j] = false;
      }
		}
    this.CreateBonusCell(ctx,x,y);
    this.CreateMalusCell(ctx,i,j);
  }

  consoleModeDisplayMap()
  {
    console.table(this.matrice);
  }

  turnCellValueOccupied(x, y)
  {
    this.matrice[y][x] = true;
  }

  turnCellValueUnoccupied(x, y)
  {
    this.matrice[y][x] = false;
  }

  CreateBonusCell(ctx, x, y) {
    this.bonusPicture.src = 'images/green_square.png';
    this.bonusPicture.onload = () => {
      ctx.drawImage(this.bonusPicture, x, y);
    }
  }

  //Dessin d'une case bonus sur la map
  DrawBonusCell(ctx, x, y) {
    ctx.drawImage(this.bonusPicture, x, y);
  }

  CreateMalusCell(ctx, x, y) {
    this.malusPicture.src = 'images/red_square.png';
    this.malusPicture.onload = () => {
      ctx.drawImage(this.malusPicture, x, y);
    }
  }

  //Dessin d'une case malus sur la map
  DrawMalusCell(ctx, x, y)
  {
    ctx.drawImage(this.malusPicture, x, y);
  }
}
