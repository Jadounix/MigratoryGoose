class Simulation {
  //Constructeur
  constructor(map, birds, areas) {
    this.map = new Map(padding, widthMap, heightMap, cellSize, nbCell); //Les paramètres sont donnés par config.js
    this.birds = [new Bird("rouge", 10, 0, 0, 'images/bird.jpg'), new Bird("bleu", 10, 0, 3, 'images/bird2.png')];
    this.areas = [new Area('bonus', 3, 4), new Area('malus', 6, 1)];
  }

  convertGridCellToPixel(padding, cellPosition, cellSize) { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
    let pixel = padding + 1 + cellSize * cellPosition;
    return (pixel)
  }

  initialisation(ctx, canvas) {
    canvas.height = heightMap + 2 * padding;
    canvas.width = widthMap + 2 * padding;

    this.map.mapInitialisation(ctx);
    this.map.drawBoard(ctx);

    for (let area of this.areas) {
      area.createArea(ctx, this.convertGridCellToPixel(padding, area.PositionX, cellSize), this.convertGridCellToPixel(padding, area.PositionY, cellSize));
    }

    for (let bird of this.birds) {
      bird.createBirdPicture(ctx, this.convertGridCellToPixel(padding, bird.PositionX, cellSize), this.convertGridCellToPixel(padding, bird.PositionY, cellSize));
    }
  }

  //Méthodes
  move(ctx, canvas) {
    //console.table(this.map.matrice);
    for (let bird of this.birds) {
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(nbCell, step, this.map.matrice);
      this.map.turnOccupied(bird.positionX, bird.positionY);

      //On teste le type de la case à chaque fois
      for (let area of this.areas) {
        bird.checkIncreasePopulation(area.positionX, area.positionY);
        bird.checkDecreasePopulation(area.positionX, area.positionY);
      }
    }

    //On efface tout ce qu'il y a dans le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //On redessine la grille
    this.map.drawBoard(ctx);

    //Dessin des différentes zones du jeu
    for (let area of this.areas) {
      area.drawArea(ctx, this.convertGridCellToPixel(padding, area.positionX, cellSize), this.convertGridCellToPixel(padding, area.positionY, cellSize));
    }

    //Dessin des oiseaux sur le canvas
    for (let bird of this.birds) {
      bird.drawBirdPicture(ctx, this.convertGridCellToPixel(padding, bird.positionX, cellSize), this.convertGridCellToPixel(padding, bird.positionY, cellSize));
    }

    //this.map.consoleModeDisplayMap();
  }



}
