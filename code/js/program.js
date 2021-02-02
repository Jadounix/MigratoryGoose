//Récupèration l'élément canvas
let canvasMap = document.getElementById("map");
//getContext conduit à la création d'un objet de représentation 2D
let canvasContext = canvasMap.getContext("2d");
//Les 0 correspondent aux coordonnées x et y du coin en haut à gauche du canvas à partir duquel on commence la copie
let canvasData = canvasContext.getImageData(0, 0, canvasMap.width, canvasMap.height);

//réation d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation(canvasContext, canvasMap);
//Fait tourner la simulation toutes les 500 ms
setInterval(function() {
  simulation.move(canvasContext, canvasMap);
}, 500);

//A mettre lorsqu'on veut utilise le clavier (ou la souris)
//document.addEventListener("keydown", deplacement);
