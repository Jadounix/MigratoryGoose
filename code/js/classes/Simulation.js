class Simulation
{
  //Constructeur
  constructor(map, birds, areas)
  {
    //this.map = new Map(p, bw, bh, cellGridSize, numberCell);
    this.map = new Map(10, 400, 400, 40, 10);
    this.birds = [new Bird("rouge", 10, 0, 0, 'images/bird.jpg'), new Bird("bleu", 10, 0, 3, 'images/bird2.png')];
    this.areas = [new Area('bonus', 3, 4), new Area('malus', 6, 1)];
  }

  convertGridCellToPixel(padding, cellPosition, cellSize)
  { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
    let pixel = padding + 1 + cellSize * cellPosition;
    return (pixel)
  }

  initialisation(ctx, p, bw, bh, cellGridSize, numberCell)
  {

		this.map.mapInitialisation(ctx);
		this.map.drawBoard(ctx);

    for(let area of this.areas)
    {
      area.createArea(ctx, this.convertGridCellToPixel(p, area.PositionX, cellGridSize), this.convertGridCellToPixel(p, area.PositionY, cellGridSize));
    }

    for(let bird of this.birds)
    {
      bird.createBirdPicture(ctx, this.convertGridCellToPixel(p, bird.PositionX, cellGridSize), this.convertGridCellToPixel(p, bird.PositionY, cellGridSize));
    }
  }

  //Méthodes
  move(nbCell, cellSize, padding, step, ctx)
  {
    for(let bird of this.birds)
    {
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(nbCell, step, this.map.matrice);
      this.map.turnOccupied(bird.positionX, bird.positionY);

      //On teste le type de la case à chaque fois
      for(let area of this.areas)
      {
        bird.checkIncreasePopulation(area.positionX, area.positionY);
        bird.checkDecreasePopulation(area.positionX, area.positionY);
      }
    }

    //On efface tout ce qu'il y a dans le canvas
    ctx.clearRect(0, 0, 500, 500);
    //On redessine la grille
    this.map.drawBoard(ctx);

    //Dessin des différentes zones du jeu
    for(let area of this.areas)
    {
      area.drawArea(ctx, this.convertGridCellToPixel(padding, area.positionX, cellSize), this.convertGridCellToPixel(padding, area.positionY, cellSize));
    }

    //Dessin des oiseaux sur le canvas
    for(let bird of this.birds)
    {
      bird.drawBirdPicture(ctx, this.convertGridCellToPixel(padding, bird.positionX, cellSize), this.convertGridCellToPixel(padding, bird.positionY, cellSize));
    }
  }

}
