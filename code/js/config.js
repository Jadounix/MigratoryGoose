//Récupèration l'élément canvas
const canvasMap = document.getElementById("map");
//getContext conduit à la création d'un objet de représentation 2D
const canvasContext = canvasMap.getContext("2d");
//Les 0 correspondent aux coordonnées x et y du coin en haut à gauche du canvas à partir duquel on commence la copie
const canvasData = canvasContext.getImageData(0, 0, canvasMap.width, canvasMap.height);

//Constantes correspondant aux dimensions de la matrice
const padding = 10; //marge
const widthMap = 600; // Canvas width -> X
const heightMap = 600; // Canvas height -> Y
const cellSize = 20;
const nbCell = (widthMap / cellSize) * (heightMap / cellSize);
const step = 1;

const birdLlifeExpectancy = ((heightMap/cellSize)/3) * 120; //Euivaut à une dizaine d'années
const spentTimeOnWintering = ((heightMap/cellSize)/3) * 2; //Equivaut à 2 mois
const spentTimeOnNursering = ((heightMap/cellSize)/3) * 4; //Equivaut à 4


let parameters = {
  nbTrees: {default:200, value:200},
  nbBirds: {default:10, value:10},

  disasterRateOrange: {default:0.5, value:0.6},
  foodRateOrange: {default:0.5, value:0.6},
  reproRateOrange: {default:0.5, value:0.6},

  disasterRatePurple: {default:0.5, value:0.6},
  foodRatePurple: {default:0.5, value:0.6},
  reproRatePurple: {default:0.5, value:0.6},

  disasterRateGreen: {default:0.5, value:0.6},
  foodRateGreen: {default:0.5, value:0.6},
  reproRateGreen: {default:0.5, value:0.6},

  disasterRateBlue: {default:0.5, value:0.6},
  foodRateBlue: {default:0.5, value:0.6},
  reproRateBlue: {default:0.5, value:0.6},
}

//Modification de l'affichage du nombre d'oiseau
let nbMigratory = document.getElementById("nbMigratory");
let nbSedentary = document.getElementById("nbSedentary");
