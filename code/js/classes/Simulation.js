class Simulation {

  //Constructeur
  constructor() {
    //La simualtion prend en paramètre une map, une liste d'oiseaux et un tableau de zones/
    this.map = new Map();
    this.birds = [new Bird("migratory", 10, 8, 23, 'images/birdM.png'), new Bird("sedentary", 15, 14, 7, 'images/birdS.png')];
    this.areas = new Array(nbCell);
    for (let i = 0; i < this.areas.length; i++) {
      this.areas[i] = new Array(widthMap / cellSize);
    }

    //Nombre d'arbre sur la map
    this.nbTree = 70;

    this.elementTime = 6;

    //Nombres aléatoires permettant le placements des différents éléments de l'environnement sur la map
    //Math.floor(Math.random() * x) retourne un nombre entre 0 et x - 1
    this.rdnCaseNumber = Math.floor(Math.random() * nbCell / 100);
    this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize);
    this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize);
  }

  //Méthodes

  //Méthode permettant de donner le type de chaque case de la map
  putTypeMap() {
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

  //Méthode d'initialisation de la map et de la simulation
  initialisation() {
    //Modification de la taille du canvas en fonction de la taille de la map
    canvasMap.height = heightMap + 2 * padding;
    canvasMap.width = widthMap + 2 * padding;
    //Initialisation des valeurs des nombres d'inividus sous la map
    nbMigratory.innerHTML = "Nombre d'individus dans la population de migrateurs : " + 0;
    nbSedentary.innerHTML = "Nombre d'individus dans la population de sédentaires : " + 0;
    //Initialisation des valeurs true/false de la map qui permettent de gérer l'occupation des cases par les oiseaux
    this.map.mapInitialisation();
    //Dessin de la grille sur la map
    this.map.drawBoard();
    //Initialisation des types de chaque zone de la map
    this.putTypeMap();

    //Création des arbres
    this.createTree();

    //Colorisation des difféerntes zones de la map
    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        area.colorMap(area.positionX, area.positionY);
        area.createElementPicture(area.positionX, area.positionY);
      }
    }

    //Affichage des images des oiseaux
    for (let bird of this.birds) {
      bird.createBirdPicture(bird.positionX, bird.positionY);
    }
  }

  //Création des zones d'abres qui doivent être fixes : les arbres ne bougent pas.
  //On donne à certaines cases choisies au hasard (et qui ne sont pas dans l'eau) la valeur 'tree'.
  createTree() {
    for (let t = 0; t < this.nbTree; t++) {
      this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize); //Retourne un nombre aléatoire entre 0 et heightMap / cellSize - 1
      this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize); //Retourne un nombre aléatoire entre 0 et widthMap / cellSize - 1
      if (this.areas[this.rdnHeight][this.rdnWidth].areaType != 'blue') {
        this.areas[this.rdnHeight][this.rdnWidth].hasElement = 'tree';
      }
    }
  }

  //Fonction principale appelée à chaque tour de la simulation
  move() {

    //Déplacement des oiseaux et interactions avec l'environnement
    for (let bird of this.birds) {
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(this.map.matrice, this.areas);
      this.map.turnOccupied(bird.positionX, bird.positionY);

      bird.checkCellType(this.areas[bird.positionX][bird.positionY]);
      bird.checkCellElement(this.areas[bird.positionX][bird.positionY]);
    }

    //On efface tout ce qu'il y a dans le canvas
    canvasContext.clearRect(0, 0, canvasMap.width, canvasMap.height);
    //On redessine la grille
    this.map.drawBoard();

    let area;
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        area = this.areas[i][j];
        //On re colorise les cases
        area.colorMap(area.positionX, area.positionY);
        area.drawElementPicture(area.positionX, area.positionY);
      }
    }

    if (this.elementTime >= 5) {
      for (let i = 0; i < heightMap / cellSize; i++) {
        for (let j = 0; j < widthMap / cellSize; j++) {
          area = this.areas[i][j];
          if (area.hasElement != 'tree') {
            area.hasElement = 'no';
          }
        }
      }

      //Choix aléatoire des cases qui contiendront les différents éléments possibles
      for (let k = 0; k < this.rdnCaseNumber; k++) {
        this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize);
        this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize);
        area = this.areas[this.rdnWidth][this.rdnHeight];
        area.createElement();
      }
      this.rdnCaseNumber = Math.floor(Math.random() * nbCell / 100);

      this.elementTime = 0;
    }

    //Dessin des oiseaux sur le canvas et actualisation du nombre d'individus sur l'interface
    for (let bird of this.birds) {
      bird.drawBirdPicture(bird.positionX, bird.positionY);

      if (bird.species == 'migratory') {
        nbMigratory.innerHTML = "Nombre d'individus dans la population de migrateurs : " + bird.nbIndividuals;
      } else if (bird.species == 'sedentary') {
        nbSedentary.innerHTML = "Nombre d'individus dans la population de sédentaires : " + bird.nbIndividuals;
      } else {
        console.log('error: Unknown bird species');
      }
    }

    this.elementTime++;
  }



}
