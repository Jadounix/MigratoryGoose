class Simulation {
  //Constructeur
  constructor(map, birds, areas) {
    this.map = new Map(); //Les paramètres sont donnés par config.js
    //this.birds = [new Bird("migratory", 10, 8, 23, 'images/bird.png'), new Bird("sedentary", 10, 14, 8, 'images/bird2.png')];
    this.birds = [new Bird("migratory", 10, 8, 23, 'images/bird.png')];
    this.areas = new Array(nbCell);
    for (let i = 0; i < this.areas.length; i++) {
      this.areas[i] = new Array(widthMap / cellSize);
    }

    let rdnCaseNumber = Math.floor(Math.random() * nbCell/10); //Retourne un nombre aléatoire entre 0 et le nombre de cellules/10
    let rdnHeight = Math.floor(Math.random() * heightMap / cellSize); //Retourne un nombre aléatoire entre 0 et heightMap / cellSize - 1
    let rdnWidth = Math.floor(Math.random() * widthMap / cellSize); //Retourne un nombre aléatoire entre 0 et widthMap / cellSize - 1

  }

  convertGridCellToPixel(padding, cellPosition, cellSize) { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
    let pixel = padding + 1 + cellSize * cellPosition;
    return (pixel)
  }

  putTypeCell() {
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        this.areas[i][j] = new Area('blue', i, j, 'no');
      }
    }

    for (let i = Math.round(0 * widthMap / cellSize); i < Math.round(0.75 * widthMap / cellSize); i++) {
      for (let j = Math.round(0.8 * heightMap / cellSize); j < Math.round(heightMap / cellSize); j++) {
        this.areas[i][j] = new Area('orange', i, j, 'no');
      }
    }

    for (let i = Math.round(0.4 * widthMap / cellSize); i < Math.round(widthMap / cellSize); i++) {
      for (let j = Math.round(0 * heightMap / cellSize); j < Math.round(0.2 * heightMap / cellSize); j++) {
        this.areas[i][j] = new Area('purple', i, j, 'no');
      }
    }

    for (let i = Math.round(0.4 * widthMap / cellSize); i < Math.round(0.9 * widthMap / cellSize); i++) {
      for (let j = Math.round(0.2 * heightMap / cellSize); j < Math.round(0.3 * heightMap / cellSize); j++) {
        this.areas[i][j] = new Area('green', i, j, 'no');
      }
    }

    for (let i = Math.round(0.1 * widthMap / cellSize); i < Math.round(0.9 * widthMap / cellSize); i++) {
      for (let j = Math.round(0.3 * heightMap / cellSize); j < Math.round(0.6 * heightMap / cellSize); j++) {
        this.areas[i][j] = new Area('green', i, j, 'no');
      }
    }

    for (let i = Math.round(0.2 * widthMap / cellSize); i < Math.round(0.3 * widthMap / cellSize); i++) {
      for (let j = Math.round(0.6 * heightMap / cellSize); j < Math.round(0.8 * heightMap / cellSize); j++) {
        this.areas[i][j] = new Area('green', i, j, 'no');
      }
    }
  }


  initialisation(ctx, canvas) {
    canvas.height = heightMap + 2 * padding;
    canvas.width = widthMap + 2 * padding;

    this.map.mapInitialisation(ctx);
    this.map.drawBoard(ctx);

    this.putTypeCell();

    nbMigratory.innerHTML = '0';
    nbSedentary.innerHTML = '0';

    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        area.colorMap(this.convertGridCellToPixel(padding, area.positionX, cellSize), this.convertGridCellToPixel(padding, area.positionY, cellSize));
      }
    }

    for (let bird of this.birds) {
      bird.createBirdPicture(ctx, this.convertGridCellToPixel(padding, bird.positionX, cellSize), this.convertGridCellToPixel(padding, bird.positionY, cellSize));
    }
  }

  //Méthodes
  move(ctx, canvas) {
    for (let bird of this.birds) {
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(nbCell, step, this.map.matrice);
      this.map.turnOccupied(bird.positionX, bird.positionY);

      bird.checkCellType(this.areas[bird.positionX][bird.positionY]);
      bird.checkCellElement(this.areas[bird.positionX][bird.positionY]);
    }

    //On efface tout ce qu'il y a dans le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //On dessine la grille
    this.map.drawBoard(ctx);

    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        area.colorMap(this.convertGridCellToPixel(padding, area.positionX, cellSize), this.convertGridCellToPixel(padding, area.positionY, cellSize));
      }
    }
      //Choix aléatoire des cases qui contiendront les malus/bonus
      for(let k = 0; k<this.rdnCaseNumber; k++)
      {
        this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize);
        this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize);

        area = this.areas[this.rdnHeight][this.rdnWidth];

        area.createElement();
        area.putElementPicture(this.convertGridCellToPixel(padding, area.positionX, cellSize),this.convertGridCellToPixel(padding, area.positionY, cellSize));
      }
      this.rdnCaseNumber = Math.floor(Math.random() * nbCell/100);





    //Dessin des oiseaux sur le canvas et actualisation du nombre d'individus
    for (let bird of this.birds) {
      bird.drawBirdPicture(ctx, this.convertGridCellToPixel(padding, bird.positionX, cellSize), this.convertGridCellToPixel(padding, bird.positionY, cellSize));

      if(bird.species == 'migratory')
      {
        nbMigratory.innerHTML = bird.nbIndividuals;
      }
      else if(bird.species == 'sedentary')
      {
        nbSedentary.innerHTML = bird.nbIndividuals;
      }
      else {console.log('error: Unknown bird species');}
    }

    //this.map.consoleModeDisplayMap();
  }



}
