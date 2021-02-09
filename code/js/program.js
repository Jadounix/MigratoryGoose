//canvasMap et canvasContext sont donnés par config.js

//Ccréation d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation(canvasContext, canvasMap);

let time;

document.getElementById("buttonStart").addEventListener("click", function() {
  time = setInterval(function() {
    simulation.move(canvasContext, canvasMap);
  }, 500);
});

document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});

//Fait tourner la simulation toutes les 500 ms
// setInterval(function() {
//   simulation.move(canvasContext, canvasMap);
// }, 500);
