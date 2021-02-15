class Map {
  //Constructeur
  constructor() {
    //Tableau qui va contenir les valeurs occupé ou non des cases de la map
    this.matrice = new Array(heightMap/cellSize);
    for (let i = 0; i < this.matrice.length; i++) {
      this.matrice[i] = new Array(widthMap/cellSize);
    }
  }

  //Méthodes
  //Dessin de la grille sur le canvas
  drawBoard() {
    for (let x = 0; x <= widthMap; x += cellSize) {
      canvasContext.moveTo(0.5 + x + padding, padding);
      canvasContext.lineTo(0.5 + x + padding, heightMap + padding);
    }
    for (let x = 0; x <= heightMap; x += cellSize) {
      canvasContext.moveTo(padding, 0.5 + x + padding);
      canvasContext.lineTo(widthMap + padding, 0.5 + x + padding);
    }
    canvasContext.strokeStyle = "black";
    canvasContext.stroke();
  }

  //Initialisation de la map avec des valeurs false ie des cases qui ne sont occupées par rien
  mapInitialisation() {
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        this.matrice[i][j] = false;
      }
    }
  }

  //Affichage du tableau dans la console
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
