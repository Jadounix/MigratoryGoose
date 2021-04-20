class Bird {
  //Constructeur
  constructor(species, nbIndividuals, positionX, positionY, reproductionRate, state, pictureSource) {
    this.species = species;
    this.nbIndividuals = nbIndividuals;
    this.positionX = positionX;
    this.positionY = positionY;
    this.reproductionRate = reproductionRate;
    this.state = state; //Etat : population vivante ou population éteinte
    this.age = 0;
    this.lastVisitedColor = 'orange';
    this.goal = [8, 12];
    this.spentTime = 0;
    this.pictureSource = pictureSource;
    this.birdPicture = new Image();
  }
  //Méthodes
  setXPosition(newPosition) {
    this.positionX = newPosition;
  }
  setYPosition(newPosition) {
    this.positionY = newPosition;
  }
  //Récupération de l'image à afficher et affichage la première fois dans le canvas
  createBirdPicture(x, y) {
    x = convertGridCellToPixel(x);
    y = convertGridCellToPixel(y);
    this.birdPicture.src = this.pictureSource;
    this.birdPicture.onload = () => {
      canvasContext.drawImage(this.birdPicture, convertGridCellToPixel(x), convertGridCellToPixel(y));
    }
  }
  //Dessin de l'oiseau une fois que l'image est déjà crée. x et y représente les coodonées de position
  drawBirdPicture(x, y) {
    canvasContext.drawImage(this.birdPicture, convertGridCellToPixel(x), convertGridCellToPixel(y));
  }

  checkCellDisponibility(tab, x, y) {
    if (tab[y][x] == false) //la case est innocupée
    {
      return true; //Je peux me déplacer sur cette case
    } else {
      return false; //Je ne peux pas me déplacer sur cette case
    }
  }

  checkDeathPopulation() {
    if (this.nbIndividuals <= 0) {
      this.nbIndividuals = 0;
      this.state = 'death';
    }
  }

  reproduction() {
    let rdnReproduction = Math.random();
    if (rdnReproduction < this.reproductionRate) {
      this.nbIndividuals++ //La population augemente d'un individu
    }
  }

  //Augemnte ou diminue le nombre d'oiseaux dans la population en fonction du temps et du taux de reproduction
  lifeCycle(area) {
    if (this.age > birdLlifeExpectancy) {
      if (this.nbIndividuals > 10) {
        this.nbIndividuals -= Math.floor(0.2 * this.nbIndividuals); //Perte de 20% des individus de la population
      } else {
        this.nbIndividuals = this.nbIndividuals - 2;
      }
      this.age = 0;
    }
    this.age++;
    this.checkDeathPopulation();

    switch (this.checkCellType(area[this.positionX][this.positionY])) {
      case 'orange':
        this.reproductionRate = getParameter("reproRateOrange");
        break;
      case 'blue':
        this.reproductionRate = 0;
        break;
      case 'purple':
        this.reproductionRate = getParameter("reproRatePurple");
        break;
      case 'green':
        this.reproductionRate = getParameter("reproRateGreen");
        break;
      default:
        console.log('error : area type undefined');
    }
    this.reproduction();
  }

  checkCellElement(area) {
    switch (area.hasElement) {
      case 'food':
        this.nbIndividuals += Math.floor(0.05 * this.nbIndividuals); //Augementation de 5% des individus de la population
        break;
      case 'hurricane':
        this.nbIndividuals -= Math.floor(0.2 * this.nbIndividuals); //Perte de 20% des individus de la population
        break;
      case 'tree':
        break;
      case 'no':
        //console.log('empty cell');
        break;
      default:
        ('error: area element');
    }
    this.checkDeathPopulation();
  }


  checkCellType(area) {
    return (area.areaType);
  }

  randomMove(tab) {
    let rdn = Math.floor(Math.random() * 4); //Retourne un nombre aléatoire entre 0 et 3
    switch (rdn) {
      case 0: //Déplacement vers le haut
        if (this.positionY > 0 && this.checkCellDisponibility(tab, this.positionX, this.positionY - step)) {
          this.setYPosition(this.positionY - step);
        }
        break;
      case 1: //Déplacement vers la droite
        if (this.positionX < (widthMap / cellSize) - 1 && this.checkCellDisponibility(tab, this.positionX + step, this.positionY)) {
          this.setXPosition(this.positionX + step);
        }
        break;
      case 2: //Déplacement vers la gauche
        if (this.positionX > 0 && this.checkCellDisponibility(tab, this.positionX - step, this.positionY)) {
          this.setXPosition(this.positionX - step);
        }
        break;
      case 3: //Déplacement vers le bas
        if (this.positionY < (heightMap / cellSize) - 1 && this.checkCellDisponibility(tab, this.positionX, this.positionY + step)) {
          this.setYPosition(this.positionY + step);
        }
        break;
      default:
        console.log('No move');
    }
    rdn = Math.floor(Math.random() * 3);
  }

  //Comprtement de déplacement des oiseaux sédentaires et des migrateurs lorsqu'ils restent dans une zone
  oneColorMove(tab, area, zone) {
    let rdn = Math.floor(Math.random() * 4); //Retourne un nombre aléatoire entre 0 et 3
    switch (rdn) {
      case 0: //Déplacement vers le haut
        if (this.positionY > 0) {
          if (this.checkCellType(area[this.positionX][this.positionY - step]) == zone && this.checkCellDisponibility(tab, this.positionX, this.positionY - step)) {
            this.setYPosition(this.positionY - step);
          }
        }
        break;
      case 1: //Déplacement vers la droite
        if (this.positionX < (widthMap / cellSize) - 1) {
          if (this.checkCellType(area[this.positionX + step][this.positionY]) == zone && this.checkCellDisponibility(tab, this.positionX + step, this.positionY)) {
            this.setXPosition(this.positionX + step);
          }
        }
        break;
      case 2: //Déplacement vers la gauche
        if (this.positionX > 0) {
          if (this.checkCellType(area[this.positionX - step][this.positionY]) == zone && this.checkCellDisponibility(tab, this.positionX - step, this.positionY)) {
            this.setXPosition(this.positionX - step);
          }
        }
        break;
      case 3: //Déplacement vers le bas
        if (this.positionY < (heightMap / cellSize) - 1) {
          if (this.checkCellType(area[this.positionX][this.positionY + step]) == zone && this.checkCellDisponibility(tab, this.positionX, this.positionY + step)) {
            this.setYPosition(this.positionY + step);
          }
        }
        break;
      default:
        console.log('No move');
    }
    rdn = Math.floor(Math.random() * 3);
  }

  //Comprtement de déplacement des oiseaux migrateurs
  migratoryMove(tab, area, graphTrees) {
    switch (this.lastVisitedColor) {
      case 'orange':
        if (this.spentTime < spentTimeOnWintering) {
          //L'oiseau reste en zone orange
          this.oneColorMove(tab, area, 'orange');
          this.spentTime++;
        } else {
          //L'oiseau migre vers la zone violette => on change l'objectif
          this.goal = [18, 2];
          //L'oiseau est arrivé dans la coleur suivante
          /*Attention = l'appel à la fonction findBestPath qui correspond à la recherche du plus court chemin se fait même si elle est dans les conditions de la boucle if
          Il n'y a donc pas besoin de refaire un appel de cette fonction en plus
          */
          if (this.findBestPath(tab, graphTrees) == true) {
            this.spentTime = 0; //Le temps passé dans cette zone redevient 0
            this.lastVisitedColor = 'purple'; //On modifie la dernière zone rencontrée
          }
        }
        break;
      case 'purple':
        if (this.spentTime < spentTimeOnNursering) {
          //L'oiseau reste en zone violette
          this.oneColorMove(tab, area, 'purple');
          this.spentTime++;
        } else {
          //L'oiseau migre en zone orange => on change l'objectif
          this.goal = [15, 28];
          //L'oiseau est arrivé dans la coleur suivante
          if (this.findBestPath(tab, graphTrees) == true) {
            this.spentTime = 0; //Le temps passé dans cette zone redevient 0
            this.lastVisitedColor = 'orange'; //On modifie la dernière zone rencontrée
          }
        }
        break;
      default:
        console.log('error : lastVisitedColor undefined');
    }
  }

  findBestPath(tab, graphTrees) {
    let graph = new Graph(graphTrees);
    let start = graph.grid[this.positionX][this.positionY];
    let end = graph.grid[this.goal[0]][this.goal[1]];
    let result = astar.search(graph, start, end);

    if (result.length > 0 && start != end) {
      if (this.checkCellDisponibility(tab, result[0].x, result[0].y)) {
        this.setXPosition(result[0].x);
        this.setYPosition(result[0].y);
      }
    }

    //Si on est arrivé au bout de l'algorithme la fonction renvoit true
    if (start == end) {
      return true;
    }
  }

  //Comportement de déplacement de l'oiseau
  moveBehavior(tab, area, graphTrees) {
    //Evolution des décès dans la population
    this.lifeCycle(area)
    //Déplacement différent en fonction de l'espèce de l'oiseau
    switch (this.species) {
      case 'migratory':
        this.migratoryMove(tab, area, graphTrees);
        break;
      case 'sedentary':
        this.oneColorMove(tab, area, 'green');
        break;
      default:
        console.log('error : Unknown bird species');
    }
  }

} //Fin de la classe
