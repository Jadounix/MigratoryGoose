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

const birdLlifeExpectancy = ((heightMap/cellSize)/3)*120;
const spentTimeOnWintering = ((heightMap/cellSize)/3) * 2; //Equivaut à 2 mois
const spentTimeOnNursering = ((heightMap/cellSize)/3) * 4; //Equivaut à 4 mois

//Modification de l'affichage du nombre d'oiseau
const nbMigratory = document.getElementById("nbMigratory");
const nbSedentary = document.getElementById("nbSedentary");
//Slider de vitesse
const speedSlider = document.getElementById("speedSlider");
