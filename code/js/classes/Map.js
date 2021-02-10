class Map {
  //Constructeur
  constructor(padding, widthMap, heightMap, cellSize, cellNumber) {
    //Taille de la map
    this.padding = padding;
    this.widthMap = widthMap;
    this.heightMap = heightMap;
    this.cellSize = cellSize;
    this.cellNumber = cellNumber;
    this.mapBackground = new Image();
    //this.mapBackground.src = 'images/fond_map.png';

    //Tableau qui va contenir les valeurs des cases de la map
    this.matrice = new Array(this.heightMap / this.cellSize);
    for (let i = 0; i < this.matrice.length; i++) {
      this.matrice[i] = new Array(this.widthMap / this.cellSize);
    }
  }

  //Méthodes
  //Dessin de la grille sur le canvas
  drawBoard(ctx) {
    for (let x = 0; x <= this.widthMap; x += this.cellSize) {
      ctx.moveTo(0.5 + x + this.padding, this.padding);
      ctx.lineTo(0.5 + x + this.padding, this.heightMap + this.padding);
    }
    for (let x = 0; x <= this.heightMap; x += this.cellSize) {
      ctx.moveTo(this.padding, 0.5 + x + this.padding);
      ctx.lineTo(this.widthMap + this.padding, 0.5 + x + this.padding);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // createBackground(ctx)
  // {
  //   this.mapBackground.onload = () => {
  //     ctx.drawImage(this.mapBackground, padding + 1, padding + 1);
  //   }
  // }
  //
  // drawBackground(ctx)
  // {
  //   ctx.drawImage(this.mapBackground, padding + 1, padding + 1);
  // }

  //Initialisation de la map avec des valeurs false ie des cases qui ne sont occupées par rien
  mapInitialisation(ctx) {
    for (let i = 0; i < this.heightMap / this.cellSize; i++) {
      for (let j = 0; j < this.widthMap / this.cellSize; j++) {
        this.matrice[i][j] = false;
      }
    }
    //this.createBackground(ctx);
  }

  consoleModeDisplayMap() {
    console.table(this.matrice);
  }

  turnOccupied(x, y) {
    this.matrice[y][x] = true;
  }

  turnUnoccupied(x, y) {
    this.matrice[y][x] = false;
  }
}
