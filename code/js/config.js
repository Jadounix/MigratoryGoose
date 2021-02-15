//Récupèration l'élément canvas
const canvasMap = document.getElementById("map");
//getContext conduit à la création d'un objet de représentation 2D
const canvasContext = canvasMap.getContext("2d");
//Les 0 correspondent aux coordonnées x et y du coin en haut à gauche du canvas à partir duquel on commence la copie
const canvasData = canvasContext.getImageData(0, 0, canvasMap.width, canvasMap.height);

//Constantes correspondant aux dimensions de la matrice
const padding = 10; //marge
const widthMap = 800; // Canvas width -> X
const heightMap = 800; // Canvas height -> Y
const cellSize = 20;
const nbCell = (widthMap / cellSize) * (heightMap / cellSize);
const step = 1;

//Modification de l'affichage du nombre d'oiseau dans la checkIncreasePopulation
const nbMigratory = document.getElementById("nbMigratory");
const nbSedentary = document.getElementById("nbSedentary");
