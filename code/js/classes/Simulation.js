class Simulation {
  //Constructeur
  constructor(map, birds, areas) {
    this.map = new Map(); //Les paramètres sont donnés par config.js
    this.birds = [new Bird("migratory", 10, 8, 23, 'images/bird.png'), new Bird("sedentary", 10, 14, 8, 'images/bird2.png')];
    this.areas = new Array(nbCell);
    for (let i = 0; i < this.areas.length; i++) {
      this.areas[i] = new Array(widthMap / cellSize);
    }

    let rdnCaseNumber = Math.floor(Math.random() * nbCell / 10); //Retourne un nombre aléatoire entre 0 et le nombre de cellules/10
    let rdnHeight = Math.floor(Math.random() * heightMap / cellSize); //Retourne un nombre aléatoire entre 0 et heightMap / cellSize - 1
    let rdnWidth = Math.floor(Math.random() * widthMap / cellSize); //Retourne un nombre aléatoire entre 0 et widthMap / cellSize - 1

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


  initialisation() {
    canvasMap.height = heightMap + 2 * padding;
    canvasMap.width = widthMap + 2 * padding;

    this.map.mapInitialisation();
    this.map.drawBoard();

    this.putTypeCell();

    nbMigratory.innerHTML = "Nombre d'individus dans la population de migrateurs : " + 0;
    nbSedentary.innerHTML = "Nombre d'individus dans la population de sédentaires : " + 0;

    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        area.colorMap(area.positionX, area.positionY);
      }
    }

    for (let bird of this.birds) {
      bird.createBirdPicture(bird.positionX, bird.positionY);
    }
  }

  //Méthodes
  move() {

    for (let bird of this.birds) {
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(nbCell, step, this.map.matrice);
      this.map.turnOccupied(bird.positionX, bird.positionY);

      bird.checkCellType(this.areas[bird.positionX][bird.positionY]);
      bird.checkCellElement(this.areas[bird.positionX][bird.positionY]);
    }

    //On efface tout ce qu'il y a dans le canvas
    canvasContext.clearRect(0, 0, canvasMap.width, canvasMap.height);
    //On dessine la grille
    this.map.drawBoard();

    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        area.colorMap(area.positionX, area.positionY);
        //On remet les cases à zero
        area.hasElement = 'no';
      }
    }
    //Choix aléatoire des cases qui contiendront les malus/bonus
    for (let k = 0; k < this.rdnCaseNumber; k++) {
      this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize);
      this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize);

      area = this.areas[this.rdnWidth][this.rdnHeight];
      area.createElement();
      area.putElementPicture(this.rdnWidth, this.rdnHeight);
    }
    this.rdnCaseNumber = Math.floor(Math.random() * nbCell / 100);

    //Dessin des oiseaux sur le canvas et actualisation du nombre d'individus
    for (let bird of this.birds) {
      bird.drawBirdPicture(bird.positionX, bird.positionY);

      if (bird.species == 'migratory') {
        nbMigratory.innerHTML = "Nombre d'individus dans la population de migrateurs : " + bird.nbIndividuals;
      } else if (bird.species == 'sedentary') {
        nbSedentary.innerHTML =  "Nombre d'individus dans la population de sédentaires : " + bird.nbIndividuals;
      } else {
        console.log('error: Unknown bird species');
      }
    }
  }



}
