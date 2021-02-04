//canvasMap et canvasContext sont donnés par config.js

//Ccréation d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation(canvasContext, canvasMap);
//Fait tourner la simulation toutes les 500 ms
setInterval(function() {
  simulation.move(canvasContext, canvasMap);
}, 500);

//A mettre lorsqu'on veut utilise le clavier (ou la souris)
//document.addEventListener("keydown", deplacement);
