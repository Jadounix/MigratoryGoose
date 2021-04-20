class Simulation {

  //Constructeur
  constructor() {
    //Map permettant de savoir si une case est vide ou non
    this.map = new Map();

    //Liste des populations d'oiseaux sur la map
    this.birds = [new Bird("migratory", getParameter("nbBirds"), 8, 23, 0.5, 'alive', 'images/birdM.png'), new Bird("sedentary", getParameter("nbBirds"), 14, 7, 0.5, 'alive', 'images/birdS.png')];

    //Liste des zones
    this.areas = new Array(heightMap / cellSize);
    for (let i = 0; i < this.areas.length; i++) {
      this.areas[i] = new Array(widthMap / cellSize);
    }

    //Graph utilisé par l'algorithme A* pour la recherche du plus court chemin
    this.graph = new Array(heightMap / cellSize);
    for (let i = 0; i < this.graph.length; i++) {
      this.graph[i] = new Array(widthMap / cellSize);
    }
    //Initialisation du graph
    for (let i = 0; i < heightMap / cellSize; i++) {
      for (let j = 0; j < widthMap / cellSize; j++) {
        this.graph[i][j] = 1;
      }
    }

    //Nombre de déplacements des oiseaux durant lequels les elements (nourritures et tempêtes) ne bougent pas
    this.elementTime = 6;

    //Nombres aléatoires permettant le placements des différents éléments de l'environnement sur la map
    //Math.floor(Math.random() * x) retourne un nombre entre 0 et x - 1
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


  //Création des zones d'abres qui doivent être fixes : les arbres ne bougent pas.
  //On donne à certaines cases choisies au hasard (et qui ne sont pas dans l'eau) la valeur 'tree'.
  createTrees() {
    for (let t = 0; t < getParameter("nbTrees"); t++) {
      this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize); //Retourne un nombre aléatoire entre 0 et heightMap / cellSize - 1
      this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize); //Retourne un nombre aléatoire entre 0 et widthMap / cellSize - 1
      if (this.areas[this.rdnWidth][this.rdnHeight].areaType != 'blue') {
        this.areas[this.rdnWidth][this.rdnHeight].hasElement = 'tree';
        //Les cases contenant des arbres sont des passages plus difficiles pour les oiseaux : elle ont un poid plus important
        this.graph[this.rdnWidth][this.rdnHeight] = 2;
      }
    }
  }

  //Méthode d'initialisation de la map et de la simulation
  initialisation() {
    //Modification de la taille du canvas en fonction de la taille de la map
    canvasMap.height = heightMap + 2 * padding;
    canvasMap.width = widthMap + 2 * padding;
    //Initialisation des valeurs des nombres d'inividus sous la map
    nbMigratory.innerHTML = 0;
    nbSedentary.innerHTML = 0;
    //Initialisation des valeurs true/false de la map qui permettent de gérer l'occupation des cases par les oiseaux
    this.map.mapInitialisation();
    //Dessin de la grille sur la map
    this.map.drawBoard();
    //Initialisation des types de chaque zone de la map
    this.putTypeMap();

    //Création des arbres
    this.createTrees();

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

  //On sépare l'initialisation des oiseaux avec l'initialisation de la map afin que celle-ci aparaisse dès le départ, mais que les oiseaux ne soit crées
  //que lorsque l'utilisateur en a modifié le nombre
  initiateNbBirds() {
    for (let bird of this.birds) {
      bird.nbIndividuals = getParameter("nbBirds");
    }
  }

  //Fonction principale appelée à chaque tour de la simulation
  move() {

    //Déplacement des oiseaux et interactions avec l'environnement
    for (let bird of this.birds) {
      //On suuprime de la carte les populations qui n'ont plus d'oiseaux
      if (bird.state == 'death') {
        this.birds.splice(this.birds[bird], 1);
      }

      //Déplacement des oiseaux et interactions avec l'environnement
      this.map.turnUnoccupied(bird.positionX, bird.positionY);
      bird.moveBehavior(this.map.matrice, this.areas, this.graph);
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
      for (let k = 0; k < nbCell; k++) {
        this.rdnHeight = Math.floor(Math.random() * heightMap / cellSize);
        this.rdnWidth = Math.floor(Math.random() * widthMap / cellSize);
        area = this.areas[this.rdnWidth][this.rdnHeight];
        area.createElement();
      }
      this.elementTime = 0;
    }

    //Dessin des oiseaux sur le canvas et actualisation du nombre d'individus sur l'interface
    for (let bird of this.birds) {
      bird.drawBirdPicture(bird.positionX, bird.positionY);

      if (bird.species == 'migratory') {
        nbMigratory.innerHTML = bird.nbIndividuals;
        nbMigratoryData = bird.nbIndividuals;
      } else if (bird.species == 'sedentary') {
        nbSedentary.innerHTML = bird.nbIndividuals;
        nbSedentaryData = bird.nbIndividuals;
      } else {
        console.log('error: Unknown bird species');
      }
    }

    this.elementTime++;
  }



}
