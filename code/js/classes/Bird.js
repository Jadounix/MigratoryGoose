class Bird {
  //Constructeur
  constructor(species, nbIndividuals, positionX, positionY, pictureSource) {
    this.species = species;
    this.nbIndividuals = nbIndividuals;
    this.positionX = positionX;
    this.positionY = positionY;
    this.age = 0;
    this.lifeExpectancy = 3600; //Un déplacement sur la map équivaut à 3 jours. Donc un oiseau vit environ 3600 "step"
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

  lifeCycle()
  {
    if(this.age > this.lifeExpectancy)
    {
      nbIndividuals -= (nbIndividuals - 0,1*nbIndividuals); //Perte de 10% des individus de la popualtion
    }
    this.age++;
  }


  checkCellElement(area) {
    switch (area.hasElement) {
      case 'food':
        console.log('Miam un burger vegan case ' + this.positionX, this.positionY);
        this.nbIndividuals++;
        break;
      case 'hurricane':
        console.log('ah une tempête ! ' + this.positionX, this.positionY);
        this.nbIndividuals--;
        break;
      case 'tree':
        console.log('vive la nature');
        break;
      case 'no':
        //console.log('Cette case est vide');
        break;
      default:
        ('error: area element');
    }
  }


  checkCellType(area) {
    switch (area.areaType) {
      case 'blue':
        //console.log('je suis sur bleu');
        break;
      case 'orange':
        //console.log('je suis sur orange');
        break;
      case 'purple':
        //console.log('je suis sur violet');
        break;
      case 'green':
        //console.log('je suis sur vert');
        break;
      default:
        ('error: area type/color');
    }
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

  //Comprtement de déplacement des oiseaux sédentaires
  sedentaryMove(tab, area) {
    let rdn = Math.floor(Math.random() * 4); //Retourne un nombre aléatoire entre 0 et 3
    switch (rdn) {
      case 0: //Déplacement vers le haut
        if (this.checkCellType(area[this.positionX][this.positionY - step]) == 'green' && this.checkCellDisponibility(tab, this.positionX, this.positionY - step)) {
          this.setYPosition(this.positionY - step);
        }
        break;
      case 1: //Déplacement vers la droite
        if (this.checkCellType(area[this.positionX + step][this.positionY]) == 'green' && this.checkCellDisponibility(tab, this.positionX + step, this.positionY)) {
          this.setXPosition(this.positionX + step);
        }
        break;
      case 2: //Déplacement vers la gauche
        if (this.checkCellType(area[this.positionX - step][this.positionY]) == 'green' && this.checkCellDisponibility(tab, this.positionX - step, this.positionY)) {
          this.setXPosition(this.positionX - step);
        }
        break;
      case 3: //Déplacement vers le bas
        if (this.checkCellType(area[this.positionX][this.positionY + step]) == 'green' && this.checkCellDisponibility(tab, this.positionX, this.positionY + step)) {
          this.setYPosition(this.positionY + step);
        }
        break;
      default:
        console.log('No move');
    }
    rdn = Math.floor(Math.random() * 3);
  }

  //Comprtement de déplacement des oiseaux migrateurs
  migratoryMove() {

  }

  //Comportement de déplacement de l'oiseau
  moveBehavior(tab, area) {
    //Evolution des décès dans la population
    this.lifeCycle()
    //Déplacement différent en fonction de l'espèce de l'oiseau
    switch (this.species) {
      case 'migratory':
        this.randomMove(tab);
        break;

      case 'sedentary':
        //this.randomMove(tab);
        this.sedentaryMove(tab, area);
        break;

      default:
        console.log('error : Unknown bird species');
    }
  }


} //Fin de la classe
