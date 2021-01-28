class Bird {
  //Constructeur
  constructor(species,startPositionX, startPositionY, positionX, positionY, pictureSource, birdPicture)
  {
    this.species = species;
    this.startPositionX = startPositionX;
    this.startPositionY = startPositionY;
    this.positionX = positionX;
    this.positionY = positionY;
    this.pictureSource = pictureSource;
    this.birdPicture = new Image();
  }
  //Méthodes
  SetXPosition(newPosition)
  {
    this.positionX = newPosition;
  }
  SetYPosition(newPosition)
  {
    this.positionY = newPosition;
  }
  //Récupération de l'image à afficher et affichage la première fois dans le canvas
  CreateBirdPicture(ctx)
  {
    this.birdPicture.src = this.pictureSource;
    this.birdPicture.onload = () => {
    ctx.drawImage(this.birdPicture, this.startPositionX, this.startPositionY);
    }
  }
  //Dessin de l'oiseau une fois que l'image est déjà crée. x et y représente les coodonées de position
  DrawBirdPicture(ctx,x,y)
  {
    ctx.drawImage(this.birdPicture, x, y);
  }
}
