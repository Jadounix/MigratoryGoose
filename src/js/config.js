/* ========================================================================== */
//Variables et constantes des éléments canvas
/* ========================================================================== */
//Récupèration l'élément canvas pour la simulation
const canvasMap = document.getElementById("map");
//getContext conduit à la création d'un objet de représentation 2D
const canvasContext = canvasMap.getContext("2d");
//Les 0 correspondent aux coordonnées x et y du coin en haut à gauche du canvas à partir duquel on commence la copie
const canvasData = canvasContext.getImageData(0, 0, canvasMap.width, canvasMap.height);

//Récupèration l'élément canvas pour les graphiques
const canvasGraph = document.getElementById("graph");
const canvasGraphContext = canvasGraph.getContext("2d");
const canvasGraphData = canvasGraphContext.getImageData(0, 0, canvasGraph.width, canvasGraph.height);

/* ========================================================================== */
//Constantes correspondant aux dimensions de la carte
/* ========================================================================== */
const padding = 10; //marge
const widthMap = 600; // Canvas width -> X
const heightMap = 600; // Canvas height -> Y
const cellSize = 20;
const nbCell = (widthMap / cellSize) * (heightMap / cellSize);
const step = 1;

/* ========================================================================== */
//Variables et constantes des éléments utilisés lors de la simulation
/* ========================================================================== */

//Etat de la simulation : vaut true si elle est en cours et false si elle est arrêtée.
let simulationState = false;

//Durée de vie des oiseaux
const birdLlifeExpectancy = ((heightMap / cellSize) / 3) * 120; //Euivaut à une dizaine d'années
//Temps que doit passer la poulation d'oiseaux dans une certaine zone
const spentTimeOnWintering = ((heightMap / cellSize) / 3) * 2; //Equivaut à 2 mois
const spentTimeOnNursering = ((heightMap / cellSize) / 3) * 4; //Equivaut à 4 mois

//Paramètres de la simulation
let parameters = {
  nbTrees: {
    default: 200,
    value: 200,
    scenario1Value: 200,
    scenario2Value: 200,
    scenario3Value: 200,
    max: 1000,
    min: 0
  },

  nbBirds: {
    default: 10,
    value: 10,
    scenario1Value: 20,
    scenario2Value: 20,
    scenario3Value: 20,
    max: 100,
    min: 1
  },

  disasterRateOrange: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.02,
    scenario2Value: 0.02,
    scenario3Value: 0.08,
    max: 1,
    min: 0
  },

  foodRateOrange: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.05,
    scenario2Value: 0.01,
    scenario3Value: 0.05,
    max: 1,
    min: 0
  },

  reproRateOrange: {
    default: 0.1,
    value: 0.1,
    scenario1Value: 0.01,
    scenario2Value: 0.01,
    scenario3Value: 0.01,
    max: 1,
    min: 0
  },

  disasterRatePurple: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.05,
    scenario2Value: 0.05,
    scenario3Value: 0.1,
    max: 1,
    min: 0
  },

  foodRatePurple: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.05,
    scenario2Value: 0.01,
    scenario3Value: 0.05,
    max: 1,
    min: 0
  },

  reproRatePurple: {
    default: 0.1,
    value: 0.1,
    scenario1Value: 0.2,
    scenario2Value: 0.2,
    scenario3Value: 0.2,
    max: 1,
    min: 0
  },

  disasterRateGreen: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.05,
    scenario2Value: 0.05,
    scenario3Value: 0.1,
    max: 1,
    min: 0
  },

  foodRateGreen: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.05,
    scenario2Value: 0.01,
    scenario3Value: 0.05,
    max: 1,
    min: 0
  },

  reproRateGreen: {
    default: 0.1,
    value: 0.1,
    scenario1Value: 0.2,
    scenario2Value: 0.2,
    scenario3Value: 0.2,
    max: 1,
    min: 0
  },

  disasterRateBlue: {
    default: 0.01,
    value: 0.01,
    scenario1Value: 0.08,
    scenario2Value: 0.08,
    scenario3Value: 0.16,
    max: 1,
    min: 0
  },

  foodRateBlue: {
    default: 0,
    value: 0,
    scenario1Value: 0,
    scenario2Value: 0,
    scenario3Value: 0,
    max: 1,
    min: 0
  },
}

//Modification de l'affichage du nombre d'oiseau
let nbMigratory = document.getElementById("nbMigratory");
let nbSedentary = document.getElementById("nbSedentary");

/* ========================================================================== */
//Variables et constantes utilisées pour l'affichage des courbes
/* ========================================================================== */
let nbMigratoryData = 0;
let nbSedentaryData = 0;

let iteration = 0;

//Tableaux servant à faire des statistiques descriptives
let sedentaryBirdsData = [];
let migratoryBirdsData = [];

/* ========================================================================== */
//Message d'erreur en cas de paramètres rentrés erronés
/* ========================================================================== */

let errorMsg = "Les paramètres entrés sont erronés. Les valeurs par défaut ont donc été saisies.\nPour plus d'informations consultez le paragraphes au dessus de la simulation :)";
