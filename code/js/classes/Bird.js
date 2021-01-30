class Bird {
  //Constructeur
  constructor(species, startPositionX, startPositionY, positionX, positionY, pictureSource, birdPicture) {
    this.species = species;
    this.startPositionX = startPositionX;
    this.startPositionY = startPositionY;
    this.positionX = positionX;
    this.positionY = positionY;
    this.pictureSource = pictureSource;
    this.birdPicture = new Image();
  }
  //Méthodes
  SetXPosition(newPosition) {
    this.positionX = newPosition;
  }
  SetYPosition(newPosition) {
    this.positionY = newPosition;
  }
  //Récupération de l'image à afficher et affichage la première fois dans le canvas
  CreateBirdPicture(ctx, x, y) {
    this.birdPicture.src = this.pictureSource;
    this.birdPicture.onload = () => {
      ctx.drawImage(this.birdPicture, x, y);
    }
  }
  //Dessin de l'oiseau une fois que l'image est déjà crée. x et y représente les coodonées de position
  DrawBirdPicture(ctx, x, y) {
    ctx.drawImage(this.birdPicture, x, y);
  }

  RandomMove(nbCell, step) {
    let rdn = Math.floor(Math.random() * 4); //Retourne un nombre aléatoire entre 0 et 3
    //let rdn = 2;
    switch (rdn) {
      case 0: //Déplacement vers le haut
        if (this.positionY > 0) {
          this.SetYPosition(this.positionY - step);
        }
        break;
      case 1: //Déplacement vers la droite
        if (this.positionX < nbCell - 1) {
          this.SetXPosition(this.positionX + step);
        }
        break;
      case 2: //Déplacement vers la gauche
        if (this.positionX > 0) {
          this.SetXPosition(this.positionX - step);
        }
        break;
      case 3: //Déplacement vers le bas
        if (this.positionY < nbCell - 1) {
          this.SetYPosition(this.positionY + step);
        }
        break;
      default:
        console.log('No move');
    }
    rdn = Math.floor(Math.random() * 3);
  }

  //Comportement de déplacement de l'oiseau
  MoveBehavior(nbCell, step) {
    //Déplacement différent en fonction de l'espèce de l'oiseau
    switch (this.species) {
      case 'bleu':
        this.RandomMove(nbCell, step);
        break;

      case 'rouge':
        this.RandomMove(nbCell, step);
        break;

      default:
        console.log('error : Unknown bird species');
    }
  }



} //Fin de la classe
