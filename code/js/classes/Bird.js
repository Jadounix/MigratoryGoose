class Bird {
  //Constructeur
  constructor(species, nbIndividuals, positionX, positionY, pictureSource) {
    this.species = species;
    this.nbIndividuals = nbIndividuals;
    this.positionX = positionX;
    this.positionY = positionY;
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
  createBirdPicture(ctx, x, y) {
    this.birdPicture.src = this.pictureSource;
    this.birdPicture.onload = () => {
      ctx.drawImage(this.birdPicture, x, y);
    }
  }
  //Dessin de l'oiseau une fois que l'image est déjà crée. x et y représente les coodonées de position
  drawBirdPicture(ctx, x, y) {
    ctx.drawImage(this.birdPicture, x, y);
  }

  checkCellDisponibility(tab, x, y) {
    //console.log(tab[y][x]);
    if (tab[y][x] == false) //la case est innocupée
    {
      return true; //Je peux me déplacer sur cette case
    } else {
      return false;
    } //Je ne peux pas me déplacer sur cette case
  }

  checkIncreasePopulation(x, y) {
    if (this.positionX == x && this.positionY == y) {
      this.nbIndividuals++;
    }
  }

  checkCellElement(area) {
    switch (area.hasElement) {
      case 'food':
        console.log('Miam un burger vegan');
        this.nbIndividuals ++;
        break;
      case 'hurricane':
        console.log('ah une tempête !');
        this.nbIndividuals --;
        break;
      case 'no':
        console.log('Cette case est vide');
        break;
      default: ('error area element');
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
      default: ('error area type');
    }
  }

  randomMove(nbCell, step, tab) {
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

  //Comportement de déplacement de l'oiseau
  moveBehavior(nbCell, step, tab) {
    //Déplacement différent en fonction de l'espèce de l'oiseau
    switch (this.species) {
      case 'migratory':
        this.randomMove(nbCell, step, tab);
        break;

      case 'sedentary':
        this.randomMove(nbCell, step, tab);
        break;

      default:
        console.log('error : Unknown bird species');
    }
  }


} //Fin de la classe
